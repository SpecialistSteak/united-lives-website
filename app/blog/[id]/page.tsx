"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog-post";
import "../../../styles/blog-id-page.css";

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

  // Function to parse and render allowed HTML tags
  const renderContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    const renderNode = (node: Node): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const children = Array.from(element.childNodes).map(renderNode);
        
        switch (element.tagName.toLowerCase()) {
          case 'b':
          case 'strong':
            return <strong key={Math.random()}>{children}</strong>;
          case 'i':
          case 'em':
            return <em key={Math.random()}>{children}</em>;
          case 'a':
            return <a key={Math.random()} href={element.getAttribute('href') || '#'} target="_blank" rel="noopener noreferrer">{children}</a>;
          default:
            return <>{children}</>;
        }
      }
      return null;
    };

    return <>{Array.from(doc.body.childNodes).map(renderNode)}</>;
  };

  if (loading)
    return (
      <div className="loading-container">
        <Image src="/images/loading.gif" alt="Loading..." width={50} height={50} />
        <p>Loading...</p>
      </div>
    );

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
      <div className="post-content">
        {renderContent(post.content)}
      </div>
    </div>
  );
}