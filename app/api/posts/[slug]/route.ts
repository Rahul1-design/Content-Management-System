import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const post = await Post.findById(params.id).populate('author', 'name');
    if (!post) {
      return Response.json({ error: 'Not Found' }, { status: 404 });
    }
    return Response.json({ success: true, post }, { status: 500 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
    if (!post) return Response.json({ error: 'Not Found' }, { status: 404 });
    return Response.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) return Response.json({ error: 'Not Found' }, { status: 404 });
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
