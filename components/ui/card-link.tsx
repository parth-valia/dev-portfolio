import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

interface CardLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardLink = React.forwardRef<HTMLDivElement, CardLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);
CardLink.displayName = 'CardLink';

export { CardLink };
