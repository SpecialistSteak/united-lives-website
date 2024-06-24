// app/blog/edit/[id]/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BlogEdit({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/blog/${params.id}`);
      if (response.ok) {
        const post = await response.json();
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags);
      } else {
        setMessage("Failed to fetch post");
      }
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const response = await fetch(`/api/blog/edit/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, tags, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Blog post updated successfully!");
      router.push("/blog");
    } else {
      setMessage(data.message || "An error occurred");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`/api/blog/edit/${params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog post deleted successfully!");
        router.push("/blog");
      } else {
        setMessage(data.message || "An error occurred");
      }
    }
  };

  const insertTag = (tag: string) => {
    if (contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const text =
        content.slice(0, start) +
        `<${tag}>` +
        content.slice(start, end) +
        `</${tag}>` +
        content.slice(end);
      setContent(text);
      contentRef.current.focus();
    }
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url && contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const text =
        content.slice(0, start) +
        `<a href="${url}">` +
        content.slice(start, end) +
        "</a>" +
        content.slice(end);
      setContent(text);
      contentRef.current.focus();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
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
          <label htmlFor="content" className="block mb-1">
            Content:
          </label>
          <div className="mb-2">
            <button
              type="button"
              onClick={() => insertTag("b")}
              className="mr-2 px-2 py-1 bg-gray-200 rounded"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => insertTag("i")}
              className="mr-2 px-2 py-1 bg-gray-200 rounded"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={insertLink}
              className="mr-2 px-2 py-1 bg-gray-200 rounded"
            >
              Link
            </button>
          </div>
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
          <label htmlFor="tags" className="block mb-1">
            Tags (comma-separated):
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Post
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
