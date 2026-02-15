import { NextRequest } from 'next/server';
import Post from '@/models/Post';
import { connectToDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
  } catch (error) {}
}
