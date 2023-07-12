import prisma from '@/app/lib/prisma';
import { Post } from '@prisma/client';
import { NextResponse } from 'next/server';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

interface ResponseData {
  status: number;
  message: string;
  feed: Post;
}

export async function POST(req: Request): Promise<NextResponse<ResponseData>> {
  const { title, body, email } = await req.json();

  const result = await prisma.post.create({
    data: {
      title: title,
      body: body,
      author: { connect: { email: email } },
    },
  });

  return NextResponse.json({
    status: 201,
    message: 'Created succesfully :)',
    feed: result,
  });
}
