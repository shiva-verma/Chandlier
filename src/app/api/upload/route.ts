import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  PRODUCT_IMAGE_FOLDER,
  cloudinaryClient,
  isCloudinaryConfigured,
} from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file was provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are supported." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Images must be 8 MB or smaller." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const result = await cloudinaryClient().uploader.upload(dataUri, {
      folder: PRODUCT_IMAGE_FOLDER,
      resource_type: "image",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("[cloudinary] upload failed", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 },
    );
  }

  const { publicId } = (await request.json().catch(() => ({}))) as {
    publicId?: string;
  };
  if (!publicId) {
    return NextResponse.json({ error: "publicId is required." }, { status: 400 });
  }

  try {
    await cloudinaryClient().uploader.destroy(publicId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[cloudinary] delete failed", error);
    return NextResponse.json({ error: "Delete failed." }, { status: 502 });
  }
}
