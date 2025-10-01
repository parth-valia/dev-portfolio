import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type PolymorphicProps<E extends HTMLElement> = React.HTMLAttributes<E> & {
  asChild?: boolean;
};

// Card: defaults to <div>, supports asChild for polymorphism
const Card = React.forwardRef<HTMLDivElement, PolymorphicProps<HTMLDivElement>>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref as any}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// CardHeader: defaults to <div>
const CardHeader = React.forwardRef<HTMLDivElement, PolymorphicProps<HTMLDivElement>>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref as any} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    );
  }
);
CardHeader.displayName = "CardHeader";

// CardTitle: defaults to <h3>
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { asChild?: boolean }>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : ("h3" as any);
    return (
      <Comp ref={ref as any} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
    );
  }
);
CardTitle.displayName = "CardTitle";

// CardDescription: defaults to <p>
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : ("p" as any);
    return (
      <Comp ref={ref as any} className={cn("text-sm text-muted-foreground", className)} {...props} />
    );
  }
);
CardDescription.displayName = "CardDescription";

// CardContent: defaults to <div>
const CardContent = React.forwardRef<HTMLDivElement, PolymorphicProps<HTMLDivElement>>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref as any} className={cn("p-3", className)} {...props} />;
  }
);
CardContent.displayName = "CardContent";

// CardFooter: defaults to <div>
const CardFooter = React.forwardRef<HTMLDivElement, PolymorphicProps<HTMLDivElement>>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref as any} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
  }
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
