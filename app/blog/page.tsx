"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/types/blog-post";
import "@/styles/blog-home.css";
import LoadingComponent from "@/components/LoadingComponent";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Still true initially
  const [hasMore, setHasMore] = useState(true);

  const getBlogPosts = useCallback(async (pageNumber: number) => {
    setLoading(true); // Set loading true at the start of every fetch
    try {
      const response = await fetch(`/api/blog?page=${pageNumber}&limit=10`);
      const data = await response.json();

      const newPosts = data.map((post: any) => ({
        ...post,
        createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
      }));

      // If page is 1, replace posts; otherwise, append (or handle as needed)
      // For now, we'll stick to replacing as per original logic for pagination
      setBlogPosts(newPosts);
      setHasMore(newPosts.length === 10);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setHasMore(false); // Assume no more data on error
    } finally {
      setLoading(false); // Set loading false when fetch ends (success or error)
    }
  }, []); // Remove initialLoad dependency

  useEffect(() => {
    getBlogPosts(page);
  }, [getBlogPosts, page]); // getBlogPosts reference is now stable

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div className="blog-outer-container">
      <h1>Blog</h1>
      {loading ? (
        <LoadingComponent />
      ) : (
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
          {blogPosts.length === 0 && <p>No blog posts found.</p>} {/* Add this line */}
        </div>
      )}
      <div className="pagination-container">
        <div className="pagination-buttons">
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={handleNext} disabled={!hasMore}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}