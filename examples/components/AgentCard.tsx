'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const agentCardVariants = cva(
  'bg-surface-raised border border-default rounded-xl p-6 transition-all duration-200',
  {
    variants: {
      status: {
        online: 'hover:-translate-y-0.5 hover:shadow-card hover:border-strong',
        busy: 'hover:-translate-y-0.5 hover:shadow-card hover:border-strong opacity-90',
        offline: 'opacity-75 cursor-not-allowed',
      },
      selected: {
        true: 'border-primary shadow-[0_0_0_2px_var(--color-focus-ring)]',
        false: '',
      },
    },
    defaultVariants: {
      status: 'offline',
      selected: false,
    },
  }
);

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      status: {
        online: 'bg-green-500/15 text-green-600',
        busy: 'bg-amber-500/15 text-amber-600',
        offline: 'bg-surface-sunken text-muted',
      },
    },
    defaultVariants: {
      status: 'offline',
    },
  }
);

export interface AgentCardProps extends VariantProps<typeof agentCardVariants> {
  name: string;
  description: string;
  capabilities: string[];
  avatar?: string;
  model?: string;
  contextWindow?: number;
  avgResponseTime?: number;
  onSelect?: () => void;
}

export function AgentCard({
  name,
  description,
  capabilities,
  avatar,
  model,
  contextWindow,
  avgResponseTime,
  status,
  selected,
  onSelect,
}: AgentCardProps): React.ReactElement {
  return (
    <article
      className={cn(agentCardVariants({ status, selected }))}
      role="button"
      tabIndex={status === 'offline' ? -1 : 0}
      aria-pressed={selected || undefined}
      aria-label={`Select ${name}`}
      onClick={status !== 'offline' ? onSelect : undefined}
      onKeyDown={(e) => e.key === 'Enter' && status !== 'offline' && onSelect?.()}
    >
      <header className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center font-bold text-inverted">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            name[0]
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-default font-semibold text-lg truncate">{name}</h3>
          <span className={statusBadgeVariants({ status })}>
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                status === 'online' && 'bg-green-500',
                status === 'busy' && 'bg-amber-500',
                status === 'offline' && 'bg-gray-400'
              )}
              aria-hidden="true"
            />
            {status}
          </span>
        </div>
        
        {selected && (
          <svg
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </header>
      
      <p className="text-muted text-sm mb-4 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Capabilities">
        {capabilities.map((cap) => (
          <span
            key={cap}
            className="bg-surface-sunken border border-subtle rounded px-2 py-1 text-xs text-muted"
            role="listitem"
          >
            {cap}
          </span>
        ))}
      </div>
      
      {(model || contextWindow || avgResponseTime) && (
        <footer className="flex items-center justify-between pt-4 border-t border-default">
          <div className="flex gap-3 text-xs text-muted">
            {contextWindow && (
              <span title="Context window">{formatTokens(contextWindow)}</span>
            )}
            {avgResponseTime && (
              <span title="Response time">~{avgResponseTime}s</span>
            )}
          </div>
          
          {model && (
            <span className="text-xs text-muted font-mono">{model}</span>
          )}
        </footer>
      )}
    </article>
  );
}

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(0)}K`;
  return tokens.toString();
}

export function AgentCardSkeleton() {
  return (
    <div className="bg-surface-raised border border-default rounded-xl p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-surface-sunken" />
        <div className="flex-1">
          <div className="h-5 bg-surface-sunken rounded w-32 mb-2" />
          <div className="h-4 bg-surface-sunken rounded w-16" />
        </div>
      </div>
      <div className="h-4 bg-surface-sunken rounded w-full mb-2" />
      <div className="h-4 bg-surface-sunken rounded w-3/4 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 bg-surface-sunken rounded w-20" />
        <div className="h-6 bg-surface-sunken rounded w-24" />
        <div className="h-6 bg-surface-sunken rounded w-16" />
      </div>
    </div>
  );
}

export function AgentCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      role="radiogroup"
      aria-label="Select AI model"
    >
      {children}
    </div>
  );
}
