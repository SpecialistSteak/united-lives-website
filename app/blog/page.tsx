"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/types/blog-post";
import "../../styles/blog-home.css";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getBlogPosts = useCallback(async (pageNumber: number) => {
    if (loading || (!hasMore && pageNumber !== 1)) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/blog?page=${pageNumber}&limit=10`);
      const data = await response.json();

      const newPosts = data.map((post: any) => ({
        ...post,
        createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
      }));

      setBlogPosts(prevPosts => {
        if (pageNumber === 1) {
          return newPosts;
        }
        const uniquePosts = [...prevPosts];
        newPosts.forEach((newPost: BlogPost) => {
          if (!uniquePosts.some(post => post.id === newPost.id)) {
            uniquePosts.push(newPost);
          }
        });
        return uniquePosts;
      });

      setHasMore(newPosts.length === 10);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    getBlogPosts(1);
  }, []); // Only run on mount

  const handleLoadMore = () => {
    getBlogPosts(page);
  };

  return (
    <div className="blog-outer-container">
      <h1>Blog</h1>
      <div className="blog-container">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            className="blog-post"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2>
              <a href={`/blog/${post.id}`}>{post.title}</a>
            </h2>
            <p className="blog-content">
              {post.content.split(" ").slice(0, 60).join(" ")}...
            </p>
            <div className="tags">
              {post.tags.map((tag: string) => (
                <span key={`${post.id}-${tag}`} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="created-at">
              Created At:{" "}
              {post.createdAt instanceof Date &&
              !isNaN(post.createdAt.valueOf())
                ? post.createdAt.toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className="load-more-button" disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}