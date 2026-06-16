interface ScoreCardProps {
  score: number;
  label?: string;
}

export function ScoreCard({ score, label = "Room score" }: ScoreCardProps) {
  return (
    <div className="premium-card glass-panel rounded-soft p-5">
      <p className="text-sm font-medium text-plum/75">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-serif-display text-6xl font-semibold tracking-normal text-plum">
          {score}
        </span>
        <span className="pb-1 text-lg text-muted">/100</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-oat" aria-hidden="true">
        <div
          className="h-full rounded-full bg-coral"
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
}
