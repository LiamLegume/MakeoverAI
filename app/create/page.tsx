"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { BudgetSelector } from "@/components/BudgetSelector";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { GoalSelector } from "@/components/GoalSelector";
import { RoomTypeSelector } from "@/components/RoomTypeSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { UploadDropzone } from "@/components/UploadDropzone";
import { generateRoomReport } from "@/lib/generateRoomReport";
import type {
  BudgetTier,
  DecorTheme,
  ImprovementGoal,
  RoomType,
  UploadedImage
} from "@/lib/types";

const reportStorageKey = "roomrevamp.latestReport";
const planStorageKey = "roomrevamp.selectedPlan";

const loadingStages = [
  { label: "Reading room photos", progress: 12 },
  { label: "Detecting clutter and visual noise", progress: 24 },
  { label: "Studying light quality and shadows", progress: 37 },
  { label: "Testing layout improvements", progress: 51 },
  { label: "Building your colour direction", progress: 64 },
  { label: "Matching budget-friendly product ideas", progress: 77 },
  { label: "Blurring locked report sections", progress: 88 },
  { label: "Finalising makeover ideas", progress: 96 }
];

type StepId = "photos" | "room" | "theme" | "budget" | "goals" | "dream";

interface StepDefinition {
  id: StepId;
  eyebrow: string;
  title: string;
  help: string;
  content: ReactNode;
  isComplete: boolean;
}

export default function CreatePage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [roomType, setRoomType] = useState<RoomType | "">("");
  const [customRoomType, setCustomRoomType] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<DecorTheme | "">("");
  const [budget, setBudget] = useState<BudgetTier | "">("");
  const [goals, setGoals] = useState<ImprovementGoal[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<"quiz" | "generating">("quiz");
  const [loadingLabel, setLoadingLabel] = useState(loadingStages[0].label);
  const [loadingProgress, setLoadingProgress] = useState(8);

  const steps: StepDefinition[] = [
    {
      id: "photos",
      eyebrow: "Step 1",
      title: "Upload photos of your actual room.",
      help: "Add one to five room photos. Phone photos are perfect.",
      content: <UploadDropzone images={uploadedImages} onImagesChange={setUploadedImages} />,
      isComplete: uploadedImages.length > 0
    },
    {
      id: "room",
      eyebrow: "Step 2",
      title: "What kind of room is this?",
      help: "This changes the advice, product recommendations, and layout priorities.",
      content: (
        <RoomTypeSelector
          value={roomType}
          onChange={setRoomType}
          customValue={customRoomType}
          onCustomChange={setCustomRoomType}
        />
      ),
      isComplete: Boolean(roomType) && (roomType !== "other room" || customRoomType.trim().length > 1)
    },
    {
      id: "theme",
      eyebrow: "Step 3",
      title: "What should it feel like after the makeover?",
      help: "Pick the direction closest to what you want. You can add your own details later.",
      content: <ThemeSelector value={selectedTheme} onChange={setSelectedTheme} />,
      isComplete: Boolean(selectedTheme)
    },
    {
      id: "budget",
      eyebrow: "Step 4",
      title: "What budget should RoomRevamp respect?",
      help: "The mock report will prioritize fixes that make sense for this spend.",
      content: <BudgetSelector value={budget} onChange={setBudget} />,
      isComplete: Boolean(budget)
    },
    {
      id: "goals",
      eyebrow: "Step 5",
      title: "What do you most want improved?",
      help: "Choose at least one. Select a few if the room needs a bigger reset.",
      content: <GoalSelector values={goals} onChange={setGoals} />,
      isComplete: goals.length > 0
    },
    {
      id: "dream",
      eyebrow: "Final step",
      title: "Describe the room you actually want.",
      help: "Tell us the vibe, storage needs, lighting mood, or setup you have in mind.",
      content: (
        <div>
          <label htmlFor="customPrompt" className="text-sm font-semibold text-ink">
            Your makeover brief
          </label>
          <textarea
            id="customPrompt"
            value={customPrompt}
            onChange={(event) => setCustomPrompt(event.target.value)}
            rows={7}
            placeholder="Example: warm hotel-style room with hidden storage, soft lighting, neutral bedding, and a cleaner desk setup."
            className="focus-ring mt-3 w-full rounded-soft border border-line bg-white/90 p-4 text-base leading-7 text-ink placeholder:text-muted"
          />
        </div>
      ),
      isComplete: true
    }
  ];

  const activeStep = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  function goNext() {
    setError("");
    if (!activeStep.isComplete) {
      setError("Finish this step before moving on.");
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !uploadedImages.length ||
      !roomType ||
      (roomType === "other room" && customRoomType.trim().length < 2) ||
      !selectedTheme ||
      !budget ||
      !goals.length
    ) {
      setError("Complete each question before analysis starts.");
      return;
    }

    setPhase("generating");
    setLoadingProgress(8);
    setLoadingLabel("Preparing room analysis");

    try {
      for (const stage of loadingStages) {
        setLoadingLabel(stage.label);
        setLoadingProgress(stage.progress);
        await new Promise((resolve) => setTimeout(resolve, 1350));
      }

      const report = await generateRoomReport({
        uploadedImages,
        roomType,
        customRoomType: roomType === "other room" ? customRoomType.trim() : undefined,
        selectedTheme,
        budget,
        goals,
        customPrompt
      });

      setLoadingLabel("Opening pricing options");
      setLoadingProgress(100);
      localStorage.setItem(reportStorageKey, JSON.stringify(report));
      localStorage.removeItem(planStorageKey);
      await new Promise((resolve) => setTimeout(resolve, 650));
      router.push("/pricing");
    } catch {
      setPhase("quiz");
      setError("The demo report could not be generated. Try again.");
    }
  }

  if (phase === "generating") {
    return (
      <section className="aurora-stage min-h-[calc(100vh-64px)] py-8 md:py-12">
        <div className="aurora-motion" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="page-shell relative z-10">
          <div className="grid min-h-[calc(100vh-170px)] gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Card className="premium-card glass-panel scan-shell overflow-hidden p-0">
              <div className="relative min-h-[520px] overflow-hidden bg-plum">
                <img
                  src={uploadedImages[0]?.url || "/images/ai-before-bedroom-messy.png"}
                  alt="Room being analysed"
                  className="absolute inset-0 h-full w-full object-cover opacity-76"
                />
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(47,18,54,0.82),rgba(47,18,54,0.26)_46%,rgba(255,112,72,0.12))]" />
                <div className="analysis-radar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="analysis-stream" aria-hidden="true">
                  <span>layout</span>
                  <span>lighting</span>
                  <span>storage</span>
                  <span>furniture</span>
                  <span>budget</span>
                </div>

                <div className="absolute left-6 top-6 z-10 max-w-sm">
                  <p className="glass-pill inline-flex px-4 py-2 text-xs font-semibold uppercase text-plum">
                    Live room read
                  </p>
                  <h1 className="font-serif-display mt-4 text-5xl leading-none tracking-normal text-white md:text-6xl">
                    Building the practical version.
                  </h1>
                </div>

                <div className="absolute inset-x-6 bottom-6 z-10 grid gap-3 sm:grid-cols-3">
                  {["Lighting map", "Storage zones", "Layout flow"].map((item) => (
                    <div
                      key={item}
                      className="analysis-chip rounded-soft border border-white/28 bg-white/22 p-4 text-sm font-semibold text-white shadow-card backdrop-blur-xl"
                    >
                      <p>{item}</p>
                      <p className="mt-2 text-xs font-medium text-white/72">In progress</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="glass-panel rounded-soft p-6 md:p-8">
              <p className="text-sm font-semibold uppercase text-sage">Finalising your plan</p>
              <h2 className="font-serif-display mt-3 text-5xl leading-none tracking-normal text-plum md:text-7xl">
                Making the ideas usable.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                We are turning the photo, room type, style direction, budget, and goals into
                a locked preview with practical next steps.
              </p>

              <div className="mt-8 rounded-soft border border-white/65 bg-white/58 p-4 shadow-card backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 text-sm font-semibold text-plum">
                  <span>{loadingLabel}</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="mt-4 h-4 overflow-hidden rounded-full bg-oat">
                  <div
                    className="loading-sheen h-full rounded-full bg-[linear-gradient(90deg,#ffb28f,#ff7048,#f35b35)] transition-all duration-1000"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Layout", "What moves first"],
                  ["Lighting", "What changes mood"],
                  ["Shopping", "What is worth buying"]
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-soft border border-white/62 bg-white/58 p-4 backdrop-blur-xl">
                    <p className="text-sm font-semibold text-plum">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-muted">{copy}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-2">
                {loadingStages.map((stage) => {
                  const isDone = loadingProgress >= stage.progress;

                  return (
                    <div key={stage.label} className="flex items-center gap-3 rounded-soft border border-white/55 bg-white/50 px-4 py-3 backdrop-blur-xl">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          isDone ? "bg-coral" : "bg-line"
                        }`}
                      />
                      <span className={`text-xs font-semibold ${isDone ? "text-plum" : "text-muted"}`}>
                        {stage.label}
                      </span>
                      <span className="ml-auto text-xs text-muted">{stage.progress}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="aurora-stage min-h-[calc(100vh-64px)] py-8 md:py-12">
      <div className="page-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase text-plum shadow-card">
              Room makeover trial
            </p>
            <h1 className="font-serif-display mt-5 max-w-xl text-5xl tracking-normal text-plum md:text-7xl">
              Show us the room. Tell us the dream.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted">
              One question at a time, then a cinematic analysis screen. Your full
              results unlock after you choose a plan.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {["Upload", "Analyze", "Unlock"].map((item, index) => (
                <div key={item} className="glass-panel rounded-soft p-4">
                  <p className="text-xs font-semibold uppercase text-sage">0{index + 1}</p>
                  <p className="mt-1 font-semibold text-plum">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="premium-card glass-panel overflow-hidden p-0">
              <div className="border-b border-white/58 bg-white/48 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-sage">
                      {activeStep.eyebrow}
                    </p>
                    <p className="text-sm text-muted">Question {currentStep + 1} of {steps.length}</p>
                  </div>
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-oat">
                    <div
                      className="h-full rounded-full bg-coral transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div key={activeStep.id} className="step-enter p-6 md:p-8">
                <h2 className="font-serif-display text-4xl tracking-normal text-plum md:text-5xl">
                  {activeStep.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{activeStep.help}</p>
                <div className="mt-7">{activeStep.content}</div>
              </div>

              <div className="border-t border-white/58 bg-white/48 px-6 py-5 backdrop-blur-xl">
                {error ? <p className="mb-3 text-sm text-[#9A3F2C]">{error}</p> : null}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                  {isLastStep ? (
                    <Button type="submit" className="orange-button">
                      Analyze and see plans
                    </Button>
                  ) : (
                    <Button type="button" className="orange-button" onClick={goNext}>
                      Next question
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
