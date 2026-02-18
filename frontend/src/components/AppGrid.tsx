import { AppCardModel } from "@/lib/types";
import { AppCard } from "./AppCard";

interface AppGridProps {
  apps: AppCardModel[];
  currentVersion: string;
  onPremOnlyMode: boolean;
}

export function AppGrid({ apps, currentVersion, onPremOnlyMode }: AppGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => {
        const disabled = onPremOnlyMode && !app.supportedHosting?.includes("on-prem");
        return (
          <AppCard
            key={app.key}
            app={app}
            currentVersion={currentVersion}
            disabled={disabled}
            disabledLabel={disabled ? "Not available for On-Premise" : undefined}
          />
        );
      })}
    </div>
  );
}
