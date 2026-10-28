import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({ eyebrow, title, as: Tag = "h2", className, titleClassName }: Props) {
  return (
    <div className={className}>
      <span className="font-mono text-xs uppercase tracking-widest text-accent-fg">{eyebrow}</span>
      <Tag className={cn("mt-1 font-display font-bold text-fg", titleClassName ?? "text-2xl md:text-3xl")}>{title}</Tag>
    </div>
  );
}
