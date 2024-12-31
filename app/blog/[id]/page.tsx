"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog-post";
import "../../../styles/blog-id-page.css";
import LoadingComponent from "@/components/LoadingComponent";

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
            createdAt: new Date(data.createdAt),
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

  // Function to process the content and preserve formatting
const renderContent = (content: string) => {
  const formattedContent = content
    .replace(/<b>(.*?)<\/b>/g, "<strong>$1</strong>") // Replace <b> with <strong>
    .replace(/<i>(.*?)<\/i>/g, "<em>$1</em>") // Replace <i> with <em>
    .split("\n")
    .map((line, index) => {
      if (line.trim() === "") {
        return <br key={`empty-${index}`} />; // Preserve empty lines with <br>
      }

      // Process each line to handle HTML tags
      const lineWithTags = line.replace(/<\/?(strong|em|a)(?:\s[^>]*)?>/g, (match) => {
        if (match.startsWith("</")) {
          // Closing tag
          return match;
        } else {
          // Opening tag, extract attributes
          const tag = match.slice(1, -1); // Remove < and >
          const tagName = tag.split(" ")[0];
          if (tagName === "a") {
            const hrefMatch = tag.match(/href="([^"]+)"/);
            const href = hrefMatch ? hrefMatch[1] : "#";
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">`;
          } else {
            return `<${tagName}>`;
          }
        }
      });

      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: lineWithTags }} />
      );
    });

  return <>{formattedContent}</>;
};

  if (loading) return <LoadingComponent />;

  if (error)
    return (
      <div className="error-container">
        <Image src="/images/error.gif" alt="Error" width={50} height={50} />
        <p>Error loading post: {error}</p>
      </div>
    );

  if (!post)
    return (
      <div className="no-post-container">
        <Image src="/images/no-post.gif" alt="No Post" width={50} height={50} />
        <p>No post found.</p>
      </div>
    );

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <div className="info-container">
        <div className="tags-container">
          <strong className="tags-label">Tags:</strong>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="published-container">
          <strong className="published-label">Published:</strong>{" "}
          {post.createdAt.toLocaleDateString()}
        </div>
      </div>
      <hr className="separator" />
      <div className="post-content">{renderContent(post.content)}</div>
    </div>
  );
}