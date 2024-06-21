"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog-post";

export default function BlogPostPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const postId = params.id;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/blog/${postId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setPost({
            ...data,
            createdAt: new Date(data.createdAt)  // Convert back to Date object
          });
          setError(null);
        } catch (err) {
          setError((err as Error).message);
          setPost(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <strong>Tags:</strong>
        {post.tags.map((tag) => (
          <span key={tag}> {tag}</span>
        ))}
      </div>
      <div>
        <strong>Published:</strong>{" "}
        {post.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}