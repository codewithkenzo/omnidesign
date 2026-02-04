'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const codeBlockVariants = cva(
  "overflow-hidden font-mono text-sm rounded-lg border",
  {
    variants: {
      variant: {
        default: "bg-surface-sunken border-default",
        terminal: "bg-[#0D1117] border-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const actionButtonVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs border transition-all",
  {
    variants: {
      state: {
        default: "bg-transparent border-default text-muted hover:bg-surface-raised hover:border-strong hover:text-default",
        success: "bg-green-500/15 border-green-500/30 text-green-600",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

interface CodeBlockProps extends VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  onCopy?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  showLineNumbers = false,
  onCopy,
  onDownload,
  variant,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${language}`;
    a.click();
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  const lines = code.split('\n');

  return (
    <figure
      className={cn(codeBlockVariants({ variant }), className)}
      role="region"
      aria-label={filename ? `Code example: ${filename}` : 'Code example'}
    >
      <figcaption className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-default">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-primary/15 text-primary text-xs font-medium uppercase tracking-wide">
            {language}
          </span>
          {filename && (
            <span className="text-xs text-muted font-mono">{filename}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            className={actionButtonVariants({ state: copied ? 'success' : 'default' })}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code to clipboard'}
            type="button"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>

          {filename && (
            <button
              className={actionButtonVariants({ state: 'default' })}
              onClick={handleDownload}
              aria-label="Download file"
              type="button"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>
          )}
        </div>
      </figcaption>

      <div className="overflow-x-auto">
        {showLineNumbers ? (
          <div className="flex">
            <div
              className="flex flex-col text-xs text-muted text-right select-none border-r border-default pr-3 py-4 pl-4 bg-black/10"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <span key={i} className="leading-relaxed">
                  {i + 1}
                </span>
              ))}
            </div>
            <pre className="flex-1 p-4 bg-transparent">
              <code className="text-default leading-relaxed">{code}</code>
            </pre>
          </div>
        ) : (
          <pre className="p-4 bg-transparent">
            <code className="text-default leading-relaxed">{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}

interface TerminalBlockProps {
  command: string;
  output: string;
  workingDir?: string;
  className?: string;
}

export function TerminalBlock({
  command,
  output,
  workingDir = '~',
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn("rounded-lg overflow-hidden bg-[#0D1117] font-mono text-sm", className)}
      role="region"
      aria-label="Terminal output"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F]"></span>
        </div>
        <span className="text-xs text-gray-400">Terminal</span>
      </div>

      <div className="p-4 text-[#E6EDF3]">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[#7EE787]">➜</span>
          <span className="text-[#7EE787]">{workingDir}</span>
          <span>{command}</span>
        </div>

        <div className="text-[#8B949E] whitespace-pre-wrap">
          {output.split('\n').map((line, i) => (
            <div key={i}>{line || '\u00A0'}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
