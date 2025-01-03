interface SourceBadgeProps {
  source: string;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
      {source}
    </span>
  );
}