interface MediaPlaceholderProps {
  label: string;
  hint: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function MediaPlaceholder({
  label,
  hint,
  width,
  height,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder ${className}`}
      data-hint={hint}
      style={{ width: width || "100%", height: height || "300px" }}
    >
      <span>{label}</span>
    </div>
  );
}
