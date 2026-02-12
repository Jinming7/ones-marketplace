'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export function useDebugUI() {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const envEnabled = process.env.NEXT_PUBLIC_DEBUG_UI === '1';
    const debugValue = searchParams.get('debug');
    const queryEnabled = debugValue === '1' || debugValue === 'true';
    return envEnabled || queryEnabled;
  }, [searchParams]);
}
