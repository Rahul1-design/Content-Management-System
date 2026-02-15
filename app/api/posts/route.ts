import { NextRequest } from 'next/server';
import Post from '@/models/Post';
import { connectToDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return Response.json({ success: true, posts }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const post = await Post.create({ ...body, slug });
    return Response.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
