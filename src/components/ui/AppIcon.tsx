'use client';

import React, { forwardRef } from 'react';
import * as OutlineIcons from '@heroicons/react/24/outline';
import * as SolidIcons from '@heroicons/react/24/solid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IconName = keyof typeof OutlineIcons;

interface AppIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName | string;
  variant?: 'outline' | 'solid';
  size?: number;
  disabled?: boolean;
}

const AppIcon = forwardRef<SVGSVGElement, AppIconProps>(
  ({ name, variant = 'outline', size = 24, className, disabled, onClick, ...props }, ref) => {
    const IconSet = variant === 'solid' ? SolidIcons : OutlineIcons;
    const IconComponent = IconSet[name as keyof typeof IconSet];

    if (!IconComponent) {
      return (
        <OutlineIcons.QuestionMarkCircleIcon
          ref={ref}
          width={size}
          height={size}
          className={cn("text-muted-foreground opacity-50", className)}
          aria-hidden="true"
          {...props}
        />
      );
    }

    return (
      <IconComponent
        ref={ref}
        width={size}
        height={size}
        aria-hidden="true"
        onClick={disabled ? undefined : onClick}
        className={cn(
          "transition-all duration-200",
          onClick && !disabled && "cursor-pointer hover:opacity-80 active:scale-95",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

AppIcon.displayName = 'AppIcon';
export default AppIcon;