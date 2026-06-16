"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/Button";
import type { UploadedImage } from "@/lib/types";

interface UploadDropzoneProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImages = 5;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function UploadDropzone({ images, onImagesChange }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setError("");

    const incoming = Array.from(fileList);
    if (images.length + incoming.length > maxImages) {
      setError("Upload up to 5 room photos for this MVP.");
      return;
    }

    const invalid = incoming.find((file) => !allowedTypes.includes(file.type));
    if (invalid) {
      setError("Use JPG, PNG, or WebP images.");
      return;
    }

    try {
      const nextImages = await Promise.all(incoming.map(async (file) => ({
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          url: await readFileAsDataUrl(file)
        })));
      onImagesChange([...images, ...nextImages]);
    } catch {
      setError("One image could not be loaded. Try another file.");
    }
  }

  function removeImage(id: string) {
    onImagesChange(images.filter((item) => item.id !== id));
  }

  return (
    <div>
      <label className="text-sm font-semibold text-ink">Room photos</label>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          void handleFiles(event.dataTransfer.files);
        }}
        className={`mt-3 rounded-soft border border-dashed p-6 text-center transition ${
          isDragging ? "border-clay bg-oat" : "border-line bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => void handleFiles(event.target.files)}
        />
        <p className="text-base font-semibold">Upload JPG, PNG, or WebP photos</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          Add one to five photos. They stay in your browser for this MVP and are used
          to create the mock report.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => inputRef.current?.click()}
        >
          Choose photos
        </Button>
      </div>
      {error ? <p className="mt-2 text-sm text-[#9A3F2C]">{error}</p> : null}
      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {images.map((image) => (
            <div key={image.id} className="rounded-soft border border-line bg-white p-2">
              <img
                src={image.url}
                alt={`Uploaded room photo ${image.name}`}
                className="h-24 w-full rounded-soft object-cover"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-muted">{image.name}</span>
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="focus-ring rounded-soft px-2 py-1 text-xs text-clay hover:bg-oat"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
