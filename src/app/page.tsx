import getPosts from './actions/getPosts';

export default async function Home() {
  // in this case i use React Suspanse creating a new file called loading.tsx
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-5 md:max-w-5xl mx-auto">
      <div className=" grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-5">
        {posts &&
          /* check if posts is not Null and than mapping it and show all the posts */
          posts.map((post) => (
            <div
              key={post.id}
              className="p-2 bg-white shadow-xl rounded-xl hover:bg-blue-100 transition-all duration-200"
            >
              <p>
                <span className="underline font-semibold text-lg">Title:</span>{' '}
                {post.title}
              </p>
              <p>
                <span className="underline font-semibold text-lg">
                  Content:
                </span>{' '}
                {post.body}
              </p>
              <p className="text-blue-600 font-semibold">id: {post.id}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
