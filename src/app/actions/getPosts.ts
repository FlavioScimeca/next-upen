// try to get all StaticPosts from our DB to the client

import prisma from '@/app/lib/prisma';
import { StaticPost } from '@prisma/client';

const getPosts = async () => {
  try {
    const posts: StaticPost[] = await prisma.staticPost.findMany();

    return posts;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
export default getPosts;
