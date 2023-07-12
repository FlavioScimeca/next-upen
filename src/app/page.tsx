import prisma from '@/app/lib/prisma';

export default async function Home() {
  const feed = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, id: true },
      },
    },
  });

  return (
    <main className="min-h-screen p-5 md:max-w-4xl mx-auto">
      <div className=" grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t-2 border-black pt-5">
        {feed.map((post) => (
          <div key={post.id} className="p-2 bg-zinc-700 rounded-xl">
            <p>Title: {post.title}</p>
            <p>Content: {post.body}</p>
            <p>
              Author: {post.author?.name} - N--id{post.author?.id}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
