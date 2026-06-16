interface ImagePreviewProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

export function ImagePreview({ src, alt, label, className = "" }: ImagePreviewProps) {
  return (
    <figure className={`overflow-hidden rounded-soft border border-line bg-oat ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {label ? (
        <figcaption className="border-t border-line bg-white px-3 py-2 text-xs font-medium text-muted">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
