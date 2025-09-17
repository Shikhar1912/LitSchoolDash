import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = React.HTMLAttributes<HTMLDivElement> & { value?: number };

export const Progress = ({ className, value = 0, ...props }: Props) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div className="h-full bg-primary" style={{ width: `${clamped}%` }} />
    </div>
  );
};
