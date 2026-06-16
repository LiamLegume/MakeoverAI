import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

interface BeforeAfterPreviewProps {
  beforeImage: string;
  afterImage: string;
  theme: string;
  budget: string;
}

export function BeforeAfterPreview({
  beforeImage,
  afterImage,
  theme,
  budget
}: BeforeAfterPreviewProps) {
  return (
    <section className="relative">
      <BeforeAfterSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel="Before"
        afterLabel="AI makeover"
        imageClassName="h-[300px] md:h-[420px]"
      />
      <div className="pointer-events-none absolute right-4 top-16 z-30 flex flex-wrap justify-end gap-2">
        <span className="rounded-soft bg-white px-3 py-1 text-xs font-medium capitalize text-plum shadow-card">
          {theme}
        </span>
        <span className="rounded-soft bg-white px-3 py-1 text-xs font-medium text-plum shadow-card">
          {budget}
        </span>
      </div>
    </section>
  );
}
