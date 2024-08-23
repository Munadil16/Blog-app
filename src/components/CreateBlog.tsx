"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Tiptap from "./Tiptap";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const FileUploaderRegular = dynamic(
  () =>
    import("@uploadcare/react-uploader").then((mod) => mod.FileUploaderRegular),
  { ssr: false }
);
import "@uploadcare/react-uploader/core.css";

export default function CreateBlogComponent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [content, setContent] = useState("Your blog content...");

  const handleCreateBlogSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !imageUrl || !content) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post("/api/blog", {
        title,
        imageUrl,
        content,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/explore");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl mt-6">Create a Blog</h1>

      <form
        className="w-[90vw] sm:w-[70vw]"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleCreateBlogSubmit}
      >
        <Label className="text-base" htmlFor="title">
          Title
        </Label>
        <Input
          className="mb-3"
          type="text"
          id="title"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Label className="text-base block">Image</Label>
        <FileUploaderRegular
          pubkey="2f306dede3690b7ab6ff"
          maxLocalFileSizeBytes={10000000}
          multiple={false}
          imgOnly={true}
          sourceList="local, camera, gdrive"
          classNameUploader="my-config"
          className="mb-3 inline-block mr-3"
          onFileUploadSuccess={(event) => {
            setImageUrl(event.cdnUrl);
            setImageName(event.name);
          }}
        />
        <span>{imageName}</span>

        <Label className="text-base block">Content</Label>
        <Tiptap content={content} setContent={setContent} />

        <Button type="submit" className="text-base mb-4">
          Publish blog
        </Button>
      </form>
    </main>
  );
}
