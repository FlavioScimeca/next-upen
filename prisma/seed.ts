import { PrismaClient, StaticPost } from '@prisma/client';

// Start the DB connection
const prisma = new PrismaClient();

async function seedStaticPost() {
  // Get all the posts
  const staticPost: StaticPost[] = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'GET',
    }
  ).then((res) => res.json());

  // after get all posts, start seeding the StaticPost table
  await prisma.staticPost.createMany({
    data: staticPost,
  });
}

// Invoke the function --> look the package.json to see the command to start this file
seedStaticPost()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
