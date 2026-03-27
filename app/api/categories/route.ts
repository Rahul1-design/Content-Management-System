import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 });
    return Response.json({ sucess: true, categories });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { name, description } = await request.json();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const category = await Category.create({ name, slug, description });

    return Response.json({ success: true, category }, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
