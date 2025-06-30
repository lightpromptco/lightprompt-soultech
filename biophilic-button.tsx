import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BiophilicButtonProps extends ButtonProps {
  variant?: "default" | "secondary" | "ghost" | "aurora" | "nature";
  breathing?: boolean;
  glow?: boolean;
}

const BiophilicButton = React.forwardRef<HTMLButtonElement, BiophilicButtonProps>(
  ({ className, variant = "default", breathing, glow, children, ...props }, ref) => {
    const baseClasses = "soul-tech-button transition-all duration-300";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent/10 hover:text-accent",
      aurora: "aurora-gradient text-primary-foreground shadow-lg hover:shadow-xl",
      nature: "bg-accent text-accent-foreground hover:bg-accent/90"
    };

    const animationClasses = cn(
      breathing && "breathing-element",
      glow && "gentle-glow"
    );

    return (
      <Button
        className={cn(
          baseClasses,
          variantClasses[variant],
          animationClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

BiophilicButton.displayName = "BiophilicButton";

export { BiophilicButton };