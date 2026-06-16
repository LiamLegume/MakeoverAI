import { BeforeAfterPreview } from "@/components/BeforeAfterPreview";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { leaderboardRooms } from "@/lib/mockData";

export default function LeaderboardPage() {
  const topRoom = leaderboardRooms[0];

  return (
    <div className="aurora-stage py-10 md:py-14">
      <div className="page-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-white/75 px-4 py-2 text-sm font-semibold uppercase text-sage shadow-card">
              Leaderboard
            </p>
            <h1 className="font-serif-display mt-4 text-5xl tracking-normal text-plum md:text-7xl">
              Best room scores this week.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              See the highest-scoring room makeovers, the photos behind them, and the
              top fix that pushed each room higher. Demo entries use local mock rooms
              for the MVP.
            </p>
            <Button href="/create" className="orange-button mt-6">
              Try to beat the leaderboard
            </Button>
          </div>
          <Card className="premium-card p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-sage">
                  Rank #{topRoom.rank}
                </p>
                <h2 className="font-serif-display text-4xl text-plum">{topRoom.name}</h2>
              </div>
              <div className="metric-pulse rounded-soft bg-[#fff0e9] px-4 py-2 text-xl font-semibold text-coral">
                {topRoom.score}
              </div>
            </div>
            <BeforeAfterPreview
              beforeImage={topRoom.beforeImage}
              afterImage={topRoom.afterImage}
              theme={topRoom.theme}
              budget={topRoom.roomType}
            />
          </Card>
        </div>

        <div className="mt-10 grid gap-5">
          {leaderboardRooms.map((room) => (
            <Card key={room.rank} className="premium-card overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                <div className="grid grid-cols-2 bg-oat lg:grid-cols-1">
                  <img
                    src={room.beforeImage}
                    alt={`${room.name} before makeover`}
                    className="h-44 w-full object-cover transition duration-300 hover:scale-105 lg:h-36"
                  />
                  <img
                    src={room.afterImage}
                    alt={`${room.name} after makeover`}
                    className="h-44 w-full object-cover transition duration-300 hover:scale-105 lg:h-36"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase text-sage">
                        Rank #{room.rank} - {room.roomType}
                      </p>
                      <h2 className="font-serif-display mt-1 text-3xl tracking-normal text-plum">
                        {room.name}
                      </h2>
                      <p className="mt-2 text-sm capitalize text-muted">{room.theme}</p>
                    </div>
                    <div className="w-fit rounded-soft border border-line bg-[#fff0e9] px-4 py-2">
                      <p className="text-xs text-muted">Room score</p>
                      <p className="text-3xl font-semibold text-coral">{room.score}</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-soft border border-line bg-[#FDFBF7] p-4">
                    <p className="text-xs font-semibold uppercase text-sage">Top fix</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{room.topFix}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
