'use client';

import React, { forwardRef } from 'react';
import { cn } from './lib/utils';

interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps): React.ReactElement {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-default">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className="text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref): React.ReactElement => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 bg-surface-sunken border rounded-lg text-default placeholder:text-muted transition-all",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-red-600 focus:ring-red-600 focus:border-red-600"
            : "border-default",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref): React.ReactElement => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2 bg-surface-sunken border rounded-lg text-default placeholder:text-muted transition-all resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-red-600 focus:ring-red-600 focus:border-red-600"
            : "border-default",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref): React.ReactElement => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 bg-surface-sunken border rounded-lg text-default transition-all appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-red-600 focus:ring-red-600 focus:border-red-600"
            : "border-default",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref): React.ReactElement => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "w-4 h-4 bg-surface-sunken border border-default rounded transition-all cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "checked:bg-primary checked:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {label && <span className="text-sm text-default">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref): React.ReactElement => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="radio"
          className={cn(
            "w-4 h-4 bg-surface-sunken border border-default rounded-full transition-all cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "checked:bg-primary checked:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {label && <span className="text-sm text-default">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, className, ...props }: FormProps): React.ReactElement {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  );
}

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function FormActions({ children, className }: FormActionsProps): React.ReactElement {
  return (
    <div className={cn("flex items-center gap-3 pt-4", className)}>
      {children}
    </div>
  );
}
