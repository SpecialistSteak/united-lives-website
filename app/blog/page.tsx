"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog-post";
import "@/styles/blog-home.css";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  async function getBlogPosts() {
    const response = await fetch("/api/blog");
    const data = await response.json();
    setBlogPosts(data.map((post: any) => ({
      ...post,
      createdAt: post.createdAt ? new Date(post.createdAt) : new Date()  // Handle invalid or missing dates
    })));
  }

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <>
      <h1>Blog</h1>
      <div className="blog-container">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            className="blog-post"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <h2>
              <a href={`/blog/${post.id}`}>
                {post.title}
              </a>
            </h2>
            <div className="tags">
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="created-at">
              Created At:{" "}
              {post.createdAt instanceof Date && !isNaN(post.createdAt.valueOf()) ? post.createdAt.toLocaleDateString() : "Unknown"}
            </p>
            <div className="blog-content">
              <p>
                {post.content.split(" ").slice(0, 60).join(" ")}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
