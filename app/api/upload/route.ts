import { authOptions } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    //Convert file to base64 because Cloudinary accepts base64 or URL
    //👉 Step-by-step from help of chatgpt

    // 🔹 file.arrayBuffer()
    // Converts file → raw binary data
    // 🔹 Buffer.from(bytes)
    // Converts binary → Node.js buffer
    // 🔹 .toString('base64')
    // Converts → base64 string
    // 🔹 dataURI

    // Final format:
    // data:image/png;base64,ABC123...

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'cms-posts',
      resource_type: 'auto',
    });

    return Response.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
