import Link from "next/link";
import { Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/Button";

const navItems = [
  { href: "/create", label: "Create" },
  { href: "/examples", label: "Examples" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="frosted-header sticky top-0 z-40">
      <div className="page-shell flex min-h-[74px] items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-soft">
          <span className="font-serif-display text-2xl font-semibold tracking-normal text-plum">
            RoomRevamp
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0e9] text-coral">
            <Sparkles aria-hidden="true" size={16} strokeWidth={2.4} />
          </span>
          <span className="hidden h-7 w-px bg-line md:block" />
          <span className="hidden text-sm text-plum/70 md:block">Better rooms, less guessing</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-soft px-3 py-2 text-sm text-muted transition hover:bg-white/70 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/create" size="sm" className="orange-button">
            Start makeover
          </Button>
          <div className="glass-pill hidden h-10 w-10 items-center justify-center text-plum md:flex">
            <UserRound aria-hidden="true" size={19} strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
}
