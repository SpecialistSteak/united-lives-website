"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/types/blog-post";
import "@/styles/blog-home.css";
import LoadingComponent from "@/components/LoadingComponent";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getBlogPosts = useCallback(async (pageNumber: number) => {
    // Only set loading to true for the initial load
    if (initialLoad) {
      setLoading(true);
    }
    try {
      const response = await fetch(`/api/blog?page=${pageNumber}&limit=10`);
      const data = await response.json();

      const newPosts = data.map((post: any) => ({
        ...post,
        createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
      }));

      setBlogPosts(newPosts);
      setHasMore(newPosts.length === 10);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  useEffect(() => {
    getBlogPosts(page);
  }, [getBlogPosts, page]);

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