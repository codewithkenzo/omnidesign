'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const heroSectionVariants = cva(
  "relative w-full flex items-center justify-center overflow-hidden",
  {
    variants: {
      height: {
        full: "h-screen",
        tall: "h-[80vh]",
        medium: "min-h-[60vh]",
        auto: "py-24 md:py-32",
      },
      background: {
        gradient: "bg-gradient-to-br from-primary/5 via-surface-default to-secondary/5",
        dark: "bg-surface-sunken",
        light: "bg-surface-raised",
        image: "bg-cover bg-center bg-no-repeat",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      height: "full",
      background: "gradient",
      align: "center",
    },
  }
);

interface HeroSectionProps extends VariantProps<typeof heroSectionVariants> {
  children: React.ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: 40 | 50 | 60 | 70 | 80;
  className?: string;
}

export function HeroSection({
  children,
  height,
  background,
  align,
  backgroundImage,
  overlay = false,
  overlayOpacity = 60,
  className,
}: HeroSectionProps): React.ReactElement {
  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <section
      role="region"
      aria-label="Hero section"
      className={cn(heroSectionVariants({ height, background, align }), className)}
      style={style}
    >
      {overlay && backgroundImage && (
        <div
          className={cn(
            "absolute inset-0 bg-surface-default",
            {
              "opacity-40": overlayOpacity === 40,
              "opacity-50": overlayOpacity === 50,
              "opacity-60": overlayOpacity === 60,
              "opacity-70": overlayOpacity === 70,
              "opacity-80": overlayOpacity === 80,
            }
          )}
          aria-hidden="true"
        />
      )}
      
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12">
        {children}
      </div>
    </section>
  );
}

interface HeroContentProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function HeroContent({
  children,
  maxWidth = "lg",
  className,
}: HeroContentProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:gap-8",
        {
          "max-w-md": maxWidth === "sm",
          "max-w-2xl": maxWidth === "md",
          "max-w-4xl": maxWidth === "lg",
          "max-w-6xl": maxWidth === "xl",
        },
        "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface HeroHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export function HeroHeading({
  children,
  as: Component = "h1",
  className,
}: HeroHeadingProps): React.ReactElement {
  return (
    <Component
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold text-default leading-tight tracking-tight",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface HeroSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroSubtitle({
  children,
  className,
}: HeroSubtitleProps): React.ReactElement {
  return (
    <p
      className={cn(
        "text-lg md:text-xl lg:text-2xl text-muted leading-relaxed",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-150",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </p>
  );
}

interface HeroBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroBody({
  children,
  className,
}: HeroBodyProps): React.ReactElement {
  return (
    <p
      className={cn(
        "text-base md:text-lg text-muted/90 leading-relaxed max-w-2xl",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-300",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </p>
  );
}

const heroButtonVariants = cva(
  "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[48px] min-w-[48px]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-md motion-safe:hover:-translate-y-0.5",
        secondary:
          "bg-transparent border-2 border-default text-default hover:bg-surface-raised hover:border-strong active:bg-surface-sunken",
        ghost:
          "bg-transparent text-default hover:bg-surface-raised active:bg-surface-sunken",
      },
      size: {
        default: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface HeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  href?: string;
}

export function HeroButton({
  children,
  variant,
  size,
  href,
  className,
  ...props
}: HeroButtonProps): React.ReactElement {
  const classes = cn(
    heroButtonVariants({ variant, size }),
    "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-500",
    "motion-reduce:opacity-100 motion-reduce:hover:transform-none",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

interface HeroActionsProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function HeroActions({
  children,
  orientation = "horizontal",
  className,
}: HeroActionsProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex gap-4",
        {
          "flex-row flex-wrap": orientation === "horizontal",
          "flex-col": orientation === "vertical",
        },
        "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:delay-500",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}

interface HeroResponsiveProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroResponsive({
  children,
  className,
}: HeroResponsiveProps): React.ReactElement {
  return (
    <HeroSection
      height="medium"
      className={cn("h-[60vh] md:h-[80vh] lg:h-screen", className)}
    >
      {children}
    </HeroSection>
  );
}
