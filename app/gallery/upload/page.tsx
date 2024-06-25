"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, SetStateAction } from "react";
import "../../../styles/gallery-upload-page.css";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult[]>([]);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No files selected");
    }

    // Password check is now handled by the API
    for (const file of Array.from(inputFileRef.current.files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const response = await fetch(
        `/api/gallery/upload?filename=${file.name}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const newBlob = (await response.json()) as PutBlobResult;
        setBlob((prevBlobs) => [...prevBlobs, newBlob]);
      } else {
        const error = await response.text();
        alert(error);
        return;
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Upload Your Images</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="files"
            ref={inputFileRef}
            type="file"
            className="input"
            required
            multiple
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
            placeholder="Enter password..."
            required
          />
          <button type="submit" className="button">
            Upload
          </button>
        </form>

        {blob.length > 0 && (
          <div className="blob-container">
            {blob.map((b) => (
              <div key={b.url} className="blob-url">
                Blob url:{" "}
                <a href={b.url} className="link">
                  {b.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
