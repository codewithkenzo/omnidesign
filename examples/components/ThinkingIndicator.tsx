'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const thinkingVariants = cva(
  "flex items-center gap-2",
  {
    variants: {
      variant: {
        dots: "",
        wave: "",
        pulse: "",
        shimmer: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "dots",
      size: "md",
    },
  }
);

interface ThinkingIndicatorProps extends VariantProps<typeof thinkingVariants> {
  text?: string;
  showText?: boolean;
  className?: string;
}

export function ThinkingIndicator({
  variant = "dots",
  size = "md",
  text = "Thinking",
  showText = true,
  className,
}: ThinkingIndicatorProps) {
  return (
    <div className={cn(thinkingVariants({ variant, size }), "text-muted", className)} role="status" aria-live="polite">
      {variant === 'dots' && <DotsAnimation />}
      {variant === 'wave' && <WaveAnimation />}
      {variant === 'pulse' && <PulseAnimation />}
      {variant === 'shimmer' && <ShimmerAnimation />}
      
      {showText && <span className="italic">{text}...</span>}
      
      <span className="sr-only">{text}</span>
    </div>
  );
}

function DotsAnimation() {
  return (
    <div className="inline-flex gap-1" aria-hidden="true">
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
    </div>
  );
}

function WaveAnimation() {
  return (
    <div className="inline-flex items-center gap-0.5 h-5" aria-hidden="true">
      <span className="w-0.5 h-2 bg-primary rounded-full animate-wave [animation-delay:-0.4s]"></span>
      <span className="w-0.5 h-3 bg-primary rounded-full animate-wave [animation-delay:-0.3s]"></span>
      <span className="w-0.5 h-4 bg-primary rounded-full animate-wave [animation-delay:-0.2s]"></span>
      <span className="w-0.5 h-3 bg-primary rounded-full animate-wave [animation-delay:-0.1s]"></span>
      <span className="w-0.5 h-2 bg-primary rounded-full animate-wave"></span>
    </div>
  );
}

function PulseAnimation() {
  return (
    <div className="relative w-10 h-10" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping"></div>
      <div className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping [animation-delay:1s]"></div>
      <div className="absolute inset-0 rounded-full bg-primary flex items-center justify-center">
        <svg className="w-5 h-5 text-inverted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    </div>
  );
}

function ShimmerAnimation() {
  return (
    <div 
      className="w-32 h-4 rounded bg-gradient-to-r from-surface-sunken via-surface-raised to-surface-sunken bg-[length:200%_100%] animate-shimmer"
      aria-hidden="true"
    ></div>
  );
}

interface ThinkingBubbleProps {
  variant?: 'dots' | 'wave' | 'pulse' | 'shimmer';
  text?: string;
  showText?: boolean;
  className?: string;
}

export function ThinkingBubble({
  variant = "dots",
  text = "Thinking",
  showText = true,
  className,
}: ThinkingBubbleProps) {
  return (
    <div
      className={cn(
        "bg-surface-raised border border-default rounded-lg rounded-bl-sm p-4 max-w-[85%]",
        className
      )}
    >
      <ThinkingIndicator variant={variant} text={text} showText={showText} />
    </div>
  );
}

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} role="progressbar" aria-valuenow={currentStep} aria-valuemin={0} aria-valuemax={steps.length - 1}>
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={index} className="flex items-center gap-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                isComplete && "bg-green-500 text-white",
                isCurrent && "bg-primary text-inverted animate-pulse",
                isPending && "bg-surface-sunken text-muted border border-subtle"
              )}
            >
              {isComplete ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={cn("text-sm", isCurrent && "text-default font-medium", isPending && "text-muted")}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
