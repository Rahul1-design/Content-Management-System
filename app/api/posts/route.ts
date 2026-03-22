import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    const query: any = {};

    const session = await getServerSession(authOptions);
    if (!session) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    if (slug) {
      query.slug = slug;
    }

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    const posts = await Post.find(query).populate('author', 'name email').sort({ createdAt: -1 });

    return Response.json({ success: true, posts });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const post = await Post.create({
      ...body,
      slug,
      author: session.user.id,
    });

    return Response.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to create' }, { status: 500 });
  }
}
