'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">Home</Link>
      <Link href="/create">Create</Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">Home</Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <button
        className="bg-emerald-800 p-1 rounded-lg cursor-pointer underline text-lg hover:bg-emerald-700"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link className="bg-emerald-700 p-1 rounded-2xl" href="/create">
          Create
        </Link>
      </div>
    );
    right = (
      <div className="flex items-center gap-2">
        <p>{session?.user?.name}</p>
        <button
          className="bg-rose-700 p-1 rounded-2xl"
          onClick={() => signOut()}
        >
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center py-2 px-3 md:px-10">
      {left}
      {right}
    </nav>
  );
};

export default Header;
