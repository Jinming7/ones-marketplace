'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type DebugBorderProps = {
  enabled: boolean;
  componentName: string;
  filePath: string;
  className?: string;
  children: ReactNode;
};

export function DebugBorder({ enabled, componentName, filePath, className, children }: DebugBorderProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative rounded-md border border-dashed border-brand/60', className)}>
      <span className="pointer-events-none absolute left-2 top-0 z-20 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-white">
        {componentName} | {filePath}
      </span>
      {children}
    </div>
  );
}
