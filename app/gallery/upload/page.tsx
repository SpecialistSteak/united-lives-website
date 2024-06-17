"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, SetStateAction } from "react";
import "../../../styles/gallery-upload-page.css";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult[]>([]); // Change state for multiple blobs
  const [password, setPassword] = useState(""); // Add state for password
  const correctPassword = "your_correct_password"; // Define the correct password here

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Upload Your Images</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No files selected");
          }

          if (password !== correctPassword) {
            alert("Incorrect password");
            return;
          }

          for (const file of Array.from(inputFileRef.current.files)) {
            const response = await fetch(
              `/api/gallery/upload?filename=${file.name}`,
              {
                method: "POST",
                body: file,
              }
            );

            const newBlob = (await response.json()) as PutBlobResult;

            setBlob((prevBlobs) => [...prevBlobs, newBlob]);
          }
        }}
      >
        <input
          name="files"
          ref={inputFileRef}
          type="file"
          className="top-item"
          required
          multiple // Allow selecting multiple files
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="top-item"
          placeholder="Enter password..."
          required
        />{" "}
        <button type="submit">Upload</button>
      </form>
      <div className="blob-container">
        {blob.map((b) => (
          <div key={b.url} className="blob-url">
            Blob url: <a href={b.url}>{b.url}</a>
          </div>
        ))}
      </div>
    </>
  );
}
