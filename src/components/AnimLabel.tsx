interface AnimLabelProps {
  text: string;
  className?: string;
}

export default function AnimLabel({ text, className = "" }: AnimLabelProps) {
  return (
    <span
      className={`inline-block font-mono text-[12px] text-[#C75A3A] tracking-wider uppercase ${className}`}
    >
      {text}
    </span>
  );
}
