'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const bentoCardVariants = cva(
  "bg-surface-raised border border-default rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:hover:transform-none",
  {
    variants: {
      size: {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-1 md:col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-1 md:row-span-2",
        "2x2": "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
      },
      interactive: {
        true: "cursor-pointer hover:border-strong active:bg-surface-sunken",
        false: "",
      },
    },
    defaultVariants: {
      size: "1x1",
      interactive: false,
    },
  }
);

interface BentoCardProps extends VariantProps<typeof bentoCardVariants> {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function BentoCard({
  title,
  description,
  image,
  imageAlt,
  children,
  onClick,
  href,
  size,
  interactive,
  className,
}: BentoCardProps): React.ReactElement {
  const isInteractive = interactive || !!onClick || !!href;
  
  const content = (
    <>
      {image && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-surface-sunken">
          <img
            src={image}
            alt={imageAlt || title || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-xl font-semibold text-default">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          )}
        </div>
      )}
      
      {children}
    </>
  );

  const baseClasses = bentoCardVariants({ size, interactive: isInteractive });

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClasses, className)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClasses, "text-left w-full", className)}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={cn(baseClasses, className)}>
      {content}
    </article>
  );
}

interface BentoGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 2 | 4 | 6 | 8;
  className?: string;
}

export function BentoGrid({
  children,
  columns = 4,
  gap = 4,
  className,
}: BentoGridProps): React.ReactElement {
  const gridClasses = cn(
    "grid grid-cols-1 auto-rows-fr",
    {
      "md:grid-cols-2": columns === 2,
      "md:grid-cols-2 lg:grid-cols-3": columns === 3,
      "md:grid-cols-2 lg:grid-cols-4": columns === 4,
    },
    {
      "gap-2": gap === 2,
      "gap-4": gap === 4,
      "gap-6": gap === 6,
      "gap-8": gap === 8,
    },
    className
  );

  return <div className={gridClasses}>{children}</div>;
}

interface BentoFeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
  onClick?: () => void;
  className?: string;
}

export function BentoFeatureCard({
  icon,
  title,
  description,
  tag,
  size = "1x1",
  onClick,
  className,
}: BentoFeatureCardProps): React.ReactElement {
  return (
    <BentoCard
      size={size}
      interactive={!!onClick}
      onClick={onClick}
      className={className}
    >
      <div className="flex flex-col h-full">
        {tag && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary w-fit mb-4">
            {tag}
          </span>
        )}
        
        {icon && (
          <div className="mb-4 text-primary">
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-default mb-2">{title}</h3>
        <p className="text-sm text-muted leading-relaxed flex-1">{description}</p>
      </div>
    </BentoCard>
  );
}

interface BentoImageCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
  href?: string;
  className?: string;
}

export function BentoImageCard({
  image,
  imageAlt,
  title,
  subtitle,
  size = "1x1",
  href,
  className,
}: BentoImageCardProps): React.ReactElement {
  return (
    <BentoCard
      size={size}
      interactive={!!href}
      href={href}
      className={cn("p-0 overflow-hidden relative group", className)}
    >
      <div className="relative w-full h-full min-h-[200px]">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-white/80">{subtitle}</p>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
