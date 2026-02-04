'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const messageVariants = cva(
  "rounded-lg transition-all",
  {
    variants: {
      role: {
        user: "bg-primary text-inverted ml-auto rounded-br-sm",
        assistant: "bg-surface-raised border border-default rounded-bl-sm",
        system: "bg-status-warning-subtle border border-status-warning text-status-warning dark:text-status-warning",
      },
      size: {
        default: "max-w-[85%]",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      role: "assistant",
      size: "default",
    },
  }
);

interface ChatMessageProps extends VariantProps<typeof messageVariants> {
  role: 'user' | 'assistant' | 'system';
  content: string;
  avatar?: string;
  name?: string;
  timestamp?: Date;
  isStreaming?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
  className?: string;
}

export function ChatMessage({
  role,
  content,
  avatar,
  name,
  timestamp,
  isStreaming = false,
  onCopy,
  onRegenerate,
  onFeedback,
  size,
  className,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const displayName = name || (role === 'user' ? 'You' : 'Assistant');

  return (
    <article className={cn("flex flex-col gap-2 mb-4", className)}>
      <header className="flex items-center gap-2">
        {avatar && (
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-sunken flex items-center justify-center">
            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
          </div>
        )}
        <span className="text-sm font-medium text-default">{displayName}</span>
        {timestamp && (
          <time className="text-xs text-muted">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
        )}
      </header>

      <div className={messageVariants({ role, size })}>
        <div className="p-4">
          {isStreaming ? (
            <div className="flex items-center gap-2 text-muted italic">
              <span>Thinking</span>
              <span className="inline-flex gap-1">
                <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 rounded-full bg-current animate-bounce"></span>
              </span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {content.split('\n').map((line, i) => (
                <p key={`${i}-${line.substring(0, 20)}`} className={line.trim() ? '' : 'h-4'}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isStreaming && role === 'assistant' && (
        <footer className="flex items-center gap-2 ml-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
            aria-label="Copy message"
            title="Copy message"
          >
            {copied ? (
              <svg className="w-4 h-4 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
              aria-label="Regenerate response"
              title="Regenerate response"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}

          {onFeedback && (
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => onFeedback('positive')}
                className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
                aria-label="Thumbs up"
                title="Helpful response"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
              <button
                onClick={() => onFeedback('negative')}
                className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
                aria-label="Thumbs down"
                title="Not helpful"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
              </button>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Message Assistant...",
  className,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input, files);
      setInput('');
      setFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-surface-sunken border border-subtle rounded px-2 py-1 text-sm"
            >
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                className="text-muted hover:text-default"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 bg-surface-raised border border-default rounded-xl p-2 shadow-card focus-within:border-primary transition-colors">
        <button
          className="p-2 hover:bg-surface-sunken rounded transition-colors"
          aria-label="Attach file"
          disabled={disabled}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none text-default resize-none focus:outline-none min-h-[40px] max-h-[200px]"
          aria-label="Message input"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-2 bg-primary text-inverted rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {disabled ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

interface ChatInterfaceProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
  }>;
  onSend: (message: string) => void;
  isStreaming?: boolean;
  className?: string;
}

export function ChatInterface({
  messages,
  onSend,
  isStreaming = false,
  className,
}: ChatInterfaceProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <section
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-label="Chat conversation"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            isStreaming={isStreaming && msg.id === messages[messages.length - 1].id}
          />
        ))}
      </section>

      <div className="border-t border-default p-4">
        <ChatInput onSend={onSend} disabled={isStreaming} />
      </div>
    </div>
  );
}
