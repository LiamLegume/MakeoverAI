import { Card } from "@/components/Card";

export default function PrivacyPage() {
  return (
    <div className="bg-linen py-14">
      <div className="page-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sage">Privacy</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-normal">Privacy policy</h1>
        <Card className="mt-8 space-y-5 p-6 text-base leading-8 text-muted">
          <p>
            For this MVP, uploaded room images are kept in the browser using local object
            URLs and are not uploaded to a permanent server. The latest generated report
            is saved locally in your browser so the results page can display it.
          </p>
          <p>
            Uploaded images are processed for generating the room report and are not sold.
            If real AI image generation, storage, or accounts are added later, this page
            should be updated before launch.
          </p>
          <p>
            Product recommendations are suggestions only. Some product links may be
            affiliate links.
          </p>
        </Card>
      </div>
    </div>
  );
}
