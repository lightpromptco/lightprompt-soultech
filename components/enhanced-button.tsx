import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  glow?: boolean;
  pulse?: boolean;
}

export function EnhancedButton({ 
  className, 
  glow = false, 
  pulse = false, 
  children, 
  ...props 
}: EnhancedButtonProps) {
  return (
    <Button
      className={cn(
        "transition-all duration-300 transform hover:scale-105",
        glow && "hover:shadow-xl hover:shadow-teal-500/25",
        pulse && "animate-pulse",
        "hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-500",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}