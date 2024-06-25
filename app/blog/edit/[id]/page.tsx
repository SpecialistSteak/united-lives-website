// app/blog/edit/[id]/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog-post';

export default function BlogEditPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/edit/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags.join(', '));
        } else {
          setMessage('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setMessage('An error occurred while fetching the post');
      }
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`/api/blog/edit/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, tags: tags.split(',').map(tag => tag.trim()), password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Blog post updated successfully!');
        router.push('/blog/edit');
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage('An error occurred while updating the post');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content:</label>
          <textarea
            id="content"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded h-40"
            required
          />
        </div>
        <div>
          <label htmlFor="tags" className="block mb-1">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}