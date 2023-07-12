'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface PostInput {
  title: string;
  body: string;
}

const CreatePage = () => {
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>();

  const onSubmitHandler = async (values: PostInput) => {
    // console.log('submitted');
    console.table(values);
    const data = {
      ...values,
      email: session?.data?.user?.email,
    };

    try {
      await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(() => router.push('/'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl font-semibold">Create Post</h1>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="p-3 flex flex-col md:max-w-4xl mx-auto"
      >
        <div className="flex flex-col space-y-3">
          <label className="" htmlFor="title">
            Title
          </label>
          <input
            {...register('title')}
            id="title"
            type="text"
            className="p-2 rounded-xl"
          />
          {errors.title && (
            <p className=" text-red-500 border-b-[1px] border-red-700">
              title is required
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-3 mt-2">
          <label htmlFor="body">Content</label>
          <textarea
            {...register('body')}
            id="body"
            className="p-2 rounded-xl"
          ></textarea>
          {errors.body && (
            <p className=" text-red-500 border-b-[1px] border-red-700">
              {errors.body.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-5 bg-emerald-600 font-semibold text-xl w-fit mx-auto p-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
