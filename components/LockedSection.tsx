import type { ReactNode } from "react";
import { Button } from "@/components/Button";

interface LockedSectionProps {
  children: ReactNode;
  isLocked: boolean;
  title: string;
  description: string;
  buttonLabel?: string;
  onUnlock?: () => void;
}

export function LockedSection({
  children,
  isLocked,
  title,
  description,
  buttonLabel = "Unlock demo report",
  onUnlock
}: LockedSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-soft border border-white/62 bg-white/42 backdrop-blur-xl">
      <div className={isLocked ? "locked-blur" : ""}>{children}</div>
      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/42 p-6 backdrop-blur-md">
          <div className="glass-panel max-w-sm rounded-soft p-5 text-center">
            <p className="text-lg font-semibold text-plum">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            {onUnlock ? (
              <Button className="orange-button mt-4" onClick={onUnlock}>
                {buttonLabel}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
