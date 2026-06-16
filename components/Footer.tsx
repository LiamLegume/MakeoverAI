import Link from "next/link";

const footerLinks = [
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-lg font-semibold">RoomRevamp</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Practical AI-assisted makeover plans for real rooms, real budgets, and
            real measurements. Recommendations are suggestions only.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-3 text-sm text-muted">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-soft px-2 py-1 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
