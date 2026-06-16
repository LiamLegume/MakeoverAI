interface SocialShareCardProps {
  score: number;
  theme: string;
  topFix: string;
  beforeImage: string;
  afterImage: string;
}

export function SocialShareCard({
  score,
  theme,
  topFix,
  beforeImage,
  afterImage
}: SocialShareCardProps) {
  return (
    <div className="rounded-soft border border-line bg-[#FDFBF7] p-5 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold">RoomRevamp</p>
        <p className="rounded-soft bg-oat px-3 py-1 text-xs font-medium capitalize">{theme}</p>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-normal">
        My room got redesigned by AI
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <img
          src={beforeImage}
          alt="Before mini preview"
          className="h-32 rounded-soft border border-line object-cover"
        />
        <img
          src={afterImage}
          alt="After mini preview"
          className="h-32 rounded-soft border border-line object-cover"
        />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[120px_1fr]">
        <div className="rounded-soft border border-line bg-white p-3">
          <p className="text-xs text-muted">Room score</p>
          <p className="mt-1 text-3xl font-semibold">{score}</p>
        </div>
        <div className="rounded-soft border border-line bg-white p-3">
          <p className="text-xs text-muted">Top fix</p>
          <p className="mt-1 text-sm font-medium leading-5">{topFix}</p>
        </div>
      </div>
    </div>
  );
}
