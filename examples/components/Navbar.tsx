'use client';

import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const navbarVariants = cva(
  "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 motion-reduce:transition-none",
  {
    variants: {
      scrolled: {
        true: "bg-surface-raised shadow-card backdrop-blur-sm",
        false: "bg-transparent",
      },
      height: {
        default: "h-16",
        tall: "h-20",
      },
    },
    defaultVariants: {
      scrolled: false,
      height: "default",
    },
  }
);

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  threshold?: number;
  className?: string;
}

export function Navbar({
  logo,
  children,
  threshold = 50,
  height,
  className,
}: NavbarProps): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrolled = window.scrollY > threshold;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(navbarVariants({ scrolled, height }), className)}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {children}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-default hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px] min-w-[48px]"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-full bg-current transition-all duration-200",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-current transition-all duration-200",
                mobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-current transition-all duration-200",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </div>
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-surface-overlay/95 backdrop-blur-md z-40 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 motion-reduce:opacity-100"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-surface-raised h-full overflow-y-auto p-6 motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-300 motion-reduce:transform-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {children}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const navItemVariants = cva(
  "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px]",
  {
    variants: {
      active: {
        true: "text-primary border-b-2 border-primary rounded-b-none",
        false: "text-default hover:text-primary hover:bg-surface-raised/50",
      },
      variant: {
        default: "",
        mobile: "w-full justify-start text-lg py-3",
      },
    },
    defaultVariants: {
      active: false,
      variant: "default",
    },
  }
);

interface NavItemProps extends VariantProps<typeof navItemVariants> {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  href,
  children,
  active,
  variant,
  onClick,
  className,
}: NavItemProps): React.ReactElement {
  const isActive = active || (typeof window !== 'undefined' && window.location.pathname === href);

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(navItemVariants({ active: isActive, variant }), className)}
    >
      {children}
    </a>
  );
}

interface NavLogoProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLogo({
  href = '/',
  children,
  className,
}: NavLogoProps): React.ReactElement {
  return (
    <a
      href={href}
      className={cn(
        "text-xl font-semibold text-default hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-1",
        className
      )}
    >
      {children}
    </a>
  );
}

const navButtonVariants = cva(
  "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px] min-w-[48px]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm",
        secondary:
          "bg-transparent border-2 border-default text-default hover:bg-surface-raised hover:border-strong",
        ghost:
          "bg-transparent text-default hover:bg-surface-raised",
      },
      size: {
        default: "px-4 py-2 text-base",
        small: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface NavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navButtonVariants> {
  href?: string;
}

export function NavButton({
  children,
  variant,
  size,
  href,
  className,
  ...props
}: NavButtonProps): React.ReactElement {
  const classes = cn(navButtonVariants({ variant, size }), className);

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

interface NavActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function NavActions({
  children,
  className,
}: NavActionsProps): React.ReactElement {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

interface NavDropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function NavDropdown({
  label,
  children,
  className,
}: NavDropdownProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          navItemVariants({ active: open }),
          "inline-flex items-center gap-1"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 py-2 bg-surface-raised border border-default rounded-lg shadow-card min-w-[200px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200 motion-reduce:opacity-100"
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface NavDropdownItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavDropdownItem({
  href,
  children,
  onClick,
  className,
}: NavDropdownItemProps): React.ReactElement {
  return (
    <a
      href={href}
      onClick={onClick}
      role="menuitem"
      className={cn(
        "block px-4 py-2 text-default hover:bg-surface-sunken hover:text-primary transition-colors duration-150",
        className
      )}
    >
      {children}
    </a>
  );
}
