import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "relative inline-block rounded-full overflow-hidden",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarImage = ({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={cn("w-full h-full object-cover", className)} {...props} />
);

export const AvatarFallback = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-center bg-muted text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
