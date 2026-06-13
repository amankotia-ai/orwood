import { cn } from "@/lib/cn";

/**
 * Seamless CSS marquee. The track holds two identical copies of the items
 * and translates -50%, so the loop is invisible. No JS. Kept slow and quiet.
 */
export function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const row = (key: string) => (
    <ul
      key={key}
      className="flex shrink-0 items-center"
      aria-hidden={key === "b"}
    >
      {items.map((item, i) => (
        <li key={`${key}-${i}`} className="flex items-center">
          <span className={cn("whitespace-nowrap", itemClassName)}>{item}</span>
          <span aria-hidden className="mx-10 text-stone/50 md:mx-14">
            &middot;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0",
          reverse ? "animate-marquee-rev" : "animate-marquee"
        )}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
