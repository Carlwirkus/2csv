export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
      <svg
        className="h-1.5 w-1.5 fill-blue-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      <span className="line-clamp-1">coming soon</span>
    </span>
  );
}
