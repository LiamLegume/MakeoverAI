import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DisclosureNotice } from "@/components/DisclosureNotice";
import { HomeExampleShowcase } from "@/components/HomeExampleShowcase";
import { leaderboardRooms } from "@/lib/mockData";

const issues = [
  "The room needs layered light instead of relying on one overhead source.",
  "Warmer lamps would make the space feel calmer in the evening.",
  "The fastest improvement would be to reduce visible clutter.",
  "This room would look much better with one repeated material."
];

const fixes = [
  "Start with the lighting",
  "Create one clean focal point",
  "Add a repeated accent colour"
];

const deliverables = [
  "Practical advice",
  "Budget-conscious",
  "Beautiful results"
];

const testimonials = [
  {
    name: "Maya R.",
    room: "Small apartment",
    quote:
      "The report made it obvious what to fix first. I stopped buying random decor and cleaned up the lighting, storage, and layout.",
    beforeImage: "/images/ai-before-apartment.webp",
    afterImage: "/images/ai-after-apartment.webp",
    score: "82 -> 94"
  },
  {
    name: "Noah T.",
    room: "Bathroom",
    quote:
      "It gave me rental-friendly fixes that actually made sense: clear the counter, add a small shelf, and warm up the light.",
    beforeImage: "/images/ai-before-bathroom.webp",
    afterImage: "/images/ai-after-bathroom.webp",
    score: "69 -> 88"
  },
  {
    name: "Priya S.",
    room: "Student room",
    quote:
      "I liked that it gave a practical order of fixes. Desk zone first, storage second, then the softer styling details.",
    beforeImage: "/images/ai-before-student.png",
    afterImage: "/images/ai-after-student.png",
    score: "68 -> 91"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="aurora-stage min-h-[calc(100vh-74px)] pb-12 pt-8">
        <div className="page-shell relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase text-plum shadow-card">
                Room analysis
                <span className="text-coral">*</span>
              </p>
              <h1 className="font-serif-display mt-5 max-w-3xl text-6xl leading-[0.98] tracking-normal text-plum md:text-7xl lg:text-8xl">
                Upload a room. Get a{" "}
                <span className="italic text-coral">practical</span> makeover plan.
              </h1>
              <p className="mt-5 text-lg text-plum/70">
                AI-powered advice for layout, furniture, lighting, storage, style, and budget-friendly fixes.
              </p>
            </div>
            <div aria-hidden="true" className="aurora-art hidden lg:block" />
          </div>

          <HomeExampleShowcase />

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.68fr_0.9fr_1.1fr]">
            <Card className="premium-card glass-panel p-6">
              <p className="text-sm font-semibold text-plum/78">Room score</p>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-serif-display text-6xl text-plum">72</span>
                <span className="pb-2 text-xl text-muted">/100</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-[#e5dde3]">
                <div className="h-full w-[72%] rounded-full bg-coral" />
              </div>
              <p className="mt-4 text-sm text-muted">Good potential with the right changes.</p>
            </Card>

            <Card className="premium-card glass-panel p-6">
              <p className="text-sm font-semibold uppercase text-sage">Style diagnosis</p>
              <h2 className="mt-2 text-xl font-semibold text-plum">Warm natural works here.</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                A warm natural direction works well for this small apartment: softer
                lighting, calmer storage, and one repeated wood tone.
              </p>
            </Card>

            <Card className="premium-card glass-panel p-6">
              <p className="text-sm font-semibold uppercase text-sage">Main issues</p>
              <div className="mt-4 space-y-3">
                {issues.map((issue) => (
                  <div key={issue} className="rounded-soft border border-white/55 bg-white/58 p-3 text-sm text-muted backdrop-blur-xl">
                    {issue}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.75fr_1.1fr]">
            <Card className="premium-card glass-panel p-6">
              <p className="text-sm text-muted">Main problem detected</p>
              <h2 className="mt-3 text-2xl font-semibold text-plum">
                Lighting is too harsh or too flat
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Add one warm lamp at eye level before buying more decor.
              </p>
            </Card>
            <Card className="premium-card glass-panel p-6">
              <p className="text-sm font-semibold uppercase text-sage">Priority fixes</p>
              <div className="mt-4 divide-y divide-line">
                {fixes.map((fix) => (
                  <div key={fix} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-semibold text-plum">{fix}</span>
                    <span className="text-coral">-&gt;</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="glass-panel mt-6 flex flex-col items-center justify-center gap-4 rounded-soft px-5 py-4 text-sm text-plum sm:flex-row">
            {deliverables.map((item) => (
              <span key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-coral" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="dotted-parallax py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-sage">Trial flow</p>
            <h2 className="font-serif-display mt-2 text-5xl tracking-normal text-plum">
              One question at a time.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Upload room photos, describe what you want, watch the analysis finish,
              then choose a plan to unlock the full makeover.
            </p>
            <Button href="/create" className="orange-button mt-7" size="lg">
              Start makeover
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Upload photos", "Describe the dream", "Unlock results"].map((step, index) => (
              <Card key={step} className="premium-card glass-panel scan-shell p-5">
                <p className="text-xs font-semibold uppercase text-sage">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-plum">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {index === 0
                    ? "Show the real room."
                    : index === 1
                      ? "Tell us the direction."
                      : "Pick the report plan."}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-sage">Unlock preview</p>
              <h2 className="font-serif-display mt-2 text-5xl tracking-normal text-plum">
                A report that feels like a reveal.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                The teaser shows enough to prove the direction, then blurs the detailed
                fixes, layout notes, palette, and shopping list until a plan is chosen.
              </p>
              <Button href="/pricing" className="orange-button mt-7" size="lg">
                See pricing
              </Button>
            </div>
            <Card className="premium-card scan-shell overflow-hidden p-0">
              <img
                src="/images/ai-locked-report-preview.png"
                alt="Locked report preview"
                className="h-[360px] w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="dotted-parallax py-16">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-sage">Testimonials</p>
              <h2 className="font-serif-display mt-2 text-5xl tracking-normal text-plum">
                Real rooms, clearer decisions.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Each review includes an AI-generated before and after preview so the
                transformation feels grounded, not abstract.
              </p>
            </div>
            <Button href="/create" className="orange-button">
              Start your room
            </Button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="premium-card overflow-hidden p-0">
                <BeforeAfterSlider
                  beforeImage={testimonial.beforeImage}
                  afterImage={testimonial.afterImage}
                  beforeLabel="Before"
                  afterLabel="After"
                  imageClassName="h-[240px]"
                  className="rounded-none border-0 shadow-none"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-plum">{testimonial.name}</p>
                      <p className="mt-1 text-xs uppercase text-sage">{testimonial.room}</p>
                    </div>
                    <span className="rounded-soft bg-[#fff0e9] px-3 py-2 text-sm font-semibold text-coral">
                      {testimonial.score}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf6] py-16">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-sage">Leaderboard</p>
              <h2 className="font-serif-display mt-2 text-5xl tracking-normal text-plum">
                Best room scores this week.
              </h2>
            </div>
            <Button href="/leaderboard" variant="secondary">
              View leaderboard
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {leaderboardRooms.slice(0, 3).map((room) => (
              <Card key={room.rank} className="premium-card overflow-hidden">
                <img
                  src={room.afterImage}
                  alt={`${room.name} makeover preview`}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase text-sage">Rank #{room.rank}</p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-plum">{room.name}</h3>
                    <span className="rounded-soft bg-[#fff0e9] px-3 py-2 font-semibold text-coral">
                      {room.score}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <DisclosureNotice />
          </div>
        </div>
      </section>
    </>
  );
}
