import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function AboutPage() {
  return (
    <div className="bg-linen py-14">
      <div className="page-shell max-w-4xl">
        <p className="text-sm font-semibold uppercase text-sage">About</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-normal md:text-5xl">
          RoomRevamp is a practical room planning assistant.
        </h1>
        <div className="mt-8 grid gap-5">
          <Card className="p-6">
            <p className="text-base leading-8 text-muted">
              RoomRevamp helps people make better decisions before buying decor. The MVP
              creates a mock room score, style diagnosis, layout plan, lighting advice,
              and product suggestions from user choices and uploaded room photos.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">What it is not</h2>
            <p className="mt-3 text-base leading-8 text-muted">
              It is not a certified interior design service, it does not guarantee
              results, and Amazon does not endorse this app. Recommendations are
              suggestions only, and users should check measurements before buying.
            </p>
          </Card>
        </div>
        <Button href="/create" className="mt-8">
          Start your room makeover
        </Button>
      </div>
    </div>
  );
}
