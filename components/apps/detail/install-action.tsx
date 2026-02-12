'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

type InstallActionProps = {
  appName: string;
};

export function InstallAction({ appName }: InstallActionProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function handleInstall() {
    setOpen(true);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setOpen(false);
      timerRef.current = null;
    }, 2200);
  }

  return (
    <>
      <Button className="bg-brand text-white hover:bg-brand-hover" onClick={handleInstall}>
        Install App
      </Button>
      {open ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-soft">
          <p className="text-sm font-medium text-gray-900">{appName} added to install queue.</p>
          <p className="mt-1 text-xs text-gray-600">Setup can be configured in workspace settings.</p>
        </div>
      ) : null}
    </>
  );
}
