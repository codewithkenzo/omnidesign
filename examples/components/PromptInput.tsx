'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

// Token counter variants
const tokenCounterVariants = cva(
  "font-mono text-xs",
  {
    variants: {
      status: {
        normal: "text-muted",
        warning: "text-status-warning",
        error: "text-red-600",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

// Modifier tag variants
const modifierTagVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-sunken border border-default hover:bg-primary hover:text-inverted hover:border-primary",
        active: "bg-primary text-inverted border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Modifier {
  label: string;
  desc: string;
}

interface PromptInputProps {
  onGenerate?: (prompt: string) => void;
  maxTokens?: number;
  placeholder?: string;
  modifiers?: Modifier[];
  examplePrompts?: string[];
  className?: string;
}

export function PromptInput({
  onGenerate,
  maxTokens = 1000,
  placeholder = "Describe what you want to create...",
  modifiers = [
    { label: '--ar 16:9', desc: 'Aspect ratio 16:9' },
    { label: '--v 6', desc: 'Version 6' },
    { label: '--style raw', desc: 'Raw style mode' },
    { label: '--s 750', desc: 'Stylize level 750' },
  ],
  examplePrompts = [
    "A futuristic city at sunset, cyberpunk style...",
    "A serene Japanese garden with cherry blossoms...",
    "Abstract geometric patterns in vibrant colors...",
  ],
  className,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [tokens, setTokens] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 320)}px`;
    }
  }, [prompt]);

  // Calculate tokens (rough estimate: ~4 chars per token)
  useEffect(() => {
    setTokens(Math.ceil(prompt.length / 4));
  }, [prompt]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const appendModifier = (modifier: string) => {
    setPrompt((prev) => `${prev} ${modifier}`.trim());
    textareaRef.current?.focus();
  };

  const handleGenerate = () => {
    if (prompt.trim() && tokens <= maxTokens && onGenerate) {
      onGenerate(prompt);
    }
  };

  const tokenPercentage = (tokens / maxTokens) * 100;
  const tokenStatus = tokenPercentage > 90 ? 'error' : tokenPercentage > 70 ? 'warning' : 'normal';

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Input Container */}
      <div
        className="bg-surface-raised border-2 border-default rounded-xl p-4 transition-all duration-200 focus-within:border-primary focus-within:shadow-focus cursor-text"
        onClick={() => textareaRef.current?.focus()}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent border-none text-default font-sans text-base leading-relaxed resize-none focus:outline-none min-h-[3rem] max-h-[20rem]"
          aria-label="Prompt input"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-subtle">
          {/* Modifier Chips */}
          <div className="flex flex-wrap gap-2">
            {modifiers.map((mod) => (
              <button
                key={mod.label}
                className={modifierTagVariants({ variant: "default" })}
                onClick={() => appendModifier(mod.label)}
                title={mod.desc}
                type="button"
              >
                {mod.label}
              </button>
            ))}
          </div>

          {/* Token Counter */}
          <div className={tokenCounterVariants({ status: tokenStatus })} aria-live="polite">
            {tokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens
            {tokenStatus === 'error' && ' (Limit exceeded)'}
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="bg-surface-raised border border-default rounded-lg shadow-dropdown max-h-[300px] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted font-semibold px-2 py-1">Recent prompts</div>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-surface-sunken transition-colors text-sm"
              onClick={() => setPrompt('A futuristic cityscape at night')}
              type="button"
            >
              A futuristic cityscape at night
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-surface-sunken transition-colors text-sm"
              onClick={() => setPrompt('Portrait of a cyberpunk character')}
              type="button"
            >
              Portrait of a cyberpunk character
            </button>
          </div>
        </div>
      )}

      {/* Example Prompts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted font-medium">Try:</span>
        {examplePrompts.map((example, idx) => (
          <button
            key={idx}
            className="text-xs px-2 py-1 bg-surface-sunken border border-subtle rounded hover:bg-surface-raised transition-colors"
            onClick={() => setPrompt(example)}
            type="button"
          >
            {example.slice(0, 40)}...
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <button
        className="w-full btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!prompt.trim() || tokens > maxTokens}
        onClick={handleGenerate}
        type="button"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Generate Image
      </button>
    </div>
  );
}

// Standalone Token Counter component
interface TokenCounterProps extends VariantProps<typeof tokenCounterVariants> {
  current: number;
  max: number;
  className?: string;
}

export function TokenCounter({ current, max, status, className }: TokenCounterProps) {
  const percentage = (current / max) * 100;
  const calculatedStatus = status || (percentage > 90 ? 'error' : percentage > 70 ? 'warning' : 'normal');

  return (
    <div className={cn(tokenCounterVariants({ status: calculatedStatus }), className)} aria-live="polite">
      {current.toLocaleString()} / {max.toLocaleString()} tokens
      {calculatedStatus === 'error' && ' (Limit exceeded)'}
    </div>
  );
}

// Standalone Modifier Tag component
interface ModifierTagProps extends VariantProps<typeof modifierTagVariants> {
  label: string;
  desc?: string;
  onClick?: () => void;
  className?: string;
}

export function ModifierTag({ label, desc, onClick, variant, className }: ModifierTagProps) {
  return (
    <button
      className={cn(modifierTagVariants({ variant }), className)}
      onClick={onClick}
      title={desc}
      type="button"
    >
      {label}
    </button>
  );
}
