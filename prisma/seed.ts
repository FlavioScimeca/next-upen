import { PrismaClient, StaticPost } from '@prisma/client';

const prisma = new PrismaClient();

async function seedStaticPost() {
  const staticPost: StaticPost[] = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'GET',
    }
  ).then((res) => res.json());

  await prisma.staticPost.createMany({
    data: staticPost,
  });
}
seedStaticPost()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
