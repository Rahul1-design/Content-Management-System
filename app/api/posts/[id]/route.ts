import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const post = await Post.findById(params.id).populate('author', 'name email');
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const post = await Post.findById(params.id);

    if (!post) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { new: true });

    return Response.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const post = await Post.findById(params.id);
    if (!post) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Post.findByIdAndDelete(params.id);

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
