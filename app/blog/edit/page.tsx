// app/blog/edit/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog-post';

const POSTS_PER_PAGE = 10;

export default function BlogEdit() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/blog/edit?page=${page}&limit=${POSTS_PER_PAGE}`);
    if (response.ok) {
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE));
    } else {
      setMessage('Failed to fetch posts');
    }
  };

  const handleDelete = async (id: number) => {
    const password = prompt('Enter admin password to delete:');
    if (!password) return;

    const response = await fetch(`/api/blog/edit/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Blog post deleted successfully!');
      fetchPosts();
    } else {
      setMessage(data.message || 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Posts</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">Tags: {post.tags.join(', ')}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/blog/edit/${post.id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}