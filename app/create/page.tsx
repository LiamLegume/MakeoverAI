"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  ListChecks,
  LoaderCircle,
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BudgetSelector } from "@/components/BudgetSelector";
import { Button } from "@/components/Button";
import { GoalSelector } from "@/components/GoalSelector";
import { RoomTypeSelector } from "@/components/RoomTypeSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { UploadDropzone } from "@/components/UploadDropzone";
import { generateRoomReport } from "@/lib/generateRoomReport";
import type {
  BudgetTier,
  ColourSwatch,
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

const defaultCustomPalette: ColourSwatch[] = [
  { name: "Warm white", hex: "#F7F1E8", usage: "walls and large surfaces" },
  { name: "Sage green", hex: "#71846B", usage: "towels, cushions, or small accents" },
  { name: "Soft clay", hex: "#C77B5A", usage: "art, ceramics, or decor" },
  { name: "Deep plum", hex: "#2F1236", usage: "one grounding detail" }
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
  const [customPalette, setCustomPalette] = useState<ColourSwatch[]>(defaultCustomPalette);
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
      content: (
        <ThemeSelector
          value={selectedTheme}
          onChange={setSelectedTheme}
          customPalette={customPalette}
          onCustomPaletteChange={setCustomPalette}
        />
      ),
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
  const completedSteps = steps.filter((step) => step.isComplete).length;
  const roomLabel =
    roomType === "other room" ? customRoomType.trim() || "Custom room" : roomType || "Not chosen";
  const selectedSummary = [
    ["Photos", uploadedImages.length ? `${uploadedImages.length} uploaded` : "Needed"],
    ["Room", roomLabel],
    ["Style", selectedTheme || "Not chosen"],
    ["Budget", budget || "Not chosen"],
    ["Goals", goals.length ? `${goals.length} selected` : "Needed"]
  ];
  const canMoveBack = currentStep > 0;
  const canJumpToStep = (stepIndex: number) =>
    stepIndex <= currentStep || steps.slice(0, stepIndex).every((step) => step.isComplete);
  const nextLoadingIndex = loadingStages.findIndex((stage) => loadingProgress <= stage.progress);
  const activeLoadingIndex = nextLoadingIndex === -1 ? loadingStages.length - 1 : nextLoadingIndex;

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
        customPalette: selectedTheme === "custom theme" ? customPalette : undefined,
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
      <section className="aurora-stage min-h-[calc(100vh-64px)] py-6 md:py-10">
        <div className="aurora-motion" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="page-shell relative z-10">
          <div className="grid min-h-[calc(100vh-150px)] gap-5 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-stretch">
            <div className="relative min-h-[560px] overflow-hidden rounded-soft border border-white/60 bg-plum shadow-soft">
              <div className="absolute inset-0">
                <img
                  src={uploadedImages[0]?.url || "/images/ai-before-bedroom-messy.png"}
                  alt="Room being analysed"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(47,18,54,0.92),rgba(47,18,54,0.38)_44%,rgba(255,112,72,0.10))]" />
                <div className="analysis-radar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="analysis-stream" aria-hidden="true">
                  <span>layout</span>
                  <span>lighting</span>
                  <span>storage</span>
                  <span>budget</span>
                  <span>palette</span>
                </div>

                <div className="absolute left-5 right-5 top-5 z-10 md:left-8 md:right-auto md:max-w-xl">
                  <p className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-plum">
                    <LoaderCircle aria-hidden="true" size={14} className="animate-spin" />
                    Analysis in progress
                  </p>
                  <h1 className="font-serif-display mt-5 text-5xl leading-none tracking-normal text-white md:text-7xl">
                    Turning your room into a plan.
                  </h1>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-white/80">
                    We are ranking the fixes by impact, budget, and how realistic they are
                    for the room you uploaded.
                  </p>
                </div>

                <div className="absolute inset-x-5 bottom-5 z-10 grid gap-3 md:inset-x-8 md:grid-cols-3">
                  {[
                    ["Room type", roomLabel],
                    ["Style", selectedTheme || "Pending"],
                    ["Budget", budget || "Pending"]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-soft border border-white/25 bg-white/20 p-4 text-white shadow-card backdrop-blur-2xl"
                    >
                      <p className="text-[11px] font-semibold uppercase text-white/70">{label}</p>
                      <p className="mt-1 text-sm font-semibold capitalize">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel flex flex-col rounded-soft p-5 md:p-6">
              <div>
                <p className="text-sm font-semibold uppercase text-sage">Finalising ideas</p>
                <h2 className="font-serif-display mt-3 text-4xl leading-none tracking-normal text-plum md:text-5xl">
                  Making the report useful.
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  The output is being shaped into a first-move list, layout notes, lighting
                  plan, palette, products, and a 3D preview area.
                </p>
              </div>

              <div className="mt-6 rounded-soft border border-white/65 bg-white/62 p-4 shadow-card backdrop-blur-xl">
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

              <div className="mt-5 grid gap-3">
                {[
                  ["First moves", "The few changes to do before spending money"],
                  ["Layout logic", "Where furniture, storage, and walking paths should go"],
                  ["Shopping filter", "What is worth buying for this budget"]
                ].map(([title, copy], index) => (
                  <div key={title} className="rounded-soft border border-white/62 bg-white/58 p-4 backdrop-blur-xl">
                    <div className="flex items-start gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-oat text-xs font-semibold text-plum">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-plum">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted">{copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2">
                {loadingStages.map((stage) => {
                  const isDone = loadingProgress >= stage.progress;
                  const isActive = loadingStages[activeLoadingIndex]?.label === stage.label;

                  return (
                    <div
                      key={stage.label}
                      className={`flex items-center gap-3 rounded-soft border px-4 py-3 backdrop-blur-xl ${
                        isActive
                          ? "border-coral/45 bg-white/82 shadow-card"
                          : "border-white/55 bg-white/48"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                          isDone ? "bg-coral text-white" : "bg-oat text-muted"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 aria-hidden="true" size={14} strokeWidth={2.5} />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </span>
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
    <section className="aurora-stage min-h-[calc(100vh-64px)] py-6 md:py-10">
      <div className="aurora-motion" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="page-shell relative z-10">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-plum">
              <ImagePlus aria-hidden="true" size={14} />
              Room makeover studio
            </p>
            <h1 className="font-serif-display mt-4 max-w-4xl text-5xl leading-none tracking-normal text-plum md:text-7xl">
              Build a practical room brief.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base md:leading-7">
              Upload the real room, choose the context, then we turn it into a report,
              pricing reveal, and navigable 3D preview area.
            </p>
          </div>

          <div className="glass-panel rounded-soft px-4 py-3">
            <p className="text-xs font-semibold uppercase text-sage">Brief progress</p>
            <p className="mt-1 font-serif-display text-3xl text-plum">
              {completedSteps}/{steps.length}
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <div className="glass-panel rounded-soft p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-sage">Step navigator</p>
                  <p className="mt-1 text-sm font-semibold text-plum">{progress}% complete</p>
                </div>
                <ListChecks aria-hidden="true" className="text-coral" size={24} />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-oat">
                <div
                  className="h-full rounded-full bg-coral transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-4 grid gap-2">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const canOpen = canJumpToStep(index);

                  return (
                    <button
                      key={step.id}
                      type="button"
                      disabled={!canOpen}
                      onClick={() => setCurrentStep(index)}
                      className={`focus-ring flex items-center gap-3 rounded-soft border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-coral bg-white text-plum shadow-card"
                          : "border-white/55 bg-white/48 text-muted hover:border-coral hover:text-plum"
                      } disabled:cursor-not-allowed disabled:opacity-45`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                          step.isComplete ? "bg-coral text-white" : "bg-oat text-plum"
                        }`}
                      >
                        {step.isComplete ? (
                          <CheckCircle2 aria-hidden="true" size={15} strokeWidth={2.5} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase">{step.eyebrow}</span>
                        <span className="block text-sm font-semibold">{step.title.replace(".", "")}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel rounded-soft p-4">
              <p className="text-xs font-semibold uppercase text-sage">Current brief</p>
              <div className="mt-3 divide-y divide-white/60 text-sm">
                {selectedSummary.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="font-semibold text-plum">{label}</span>
                    <span className="max-w-[150px] truncate text-right capitalize text-muted">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-soft border border-white/60 bg-white/62 shadow-card backdrop-blur-xl">
              {uploadedImages[0] ? (
                <img
                  src={uploadedImages[0].url}
                  alt="Uploaded room preview"
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="grid h-44 place-items-center bg-oat text-center text-sm text-muted">
                  Add a room photo to anchor the report.
                </div>
              )}
              <div className="p-4">
                <p className="text-xs font-semibold uppercase text-sage">Report output</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Teaser, pricing reveal, full report, and 3D preview all use this brief.
                </p>
              </div>
            </div>
          </aside>

          <form onSubmit={handleSubmit}>
            <div className="glass-panel overflow-hidden rounded-soft">
              <div className="border-b border-white/58 bg-white/48 px-5 py-4 backdrop-blur-xl md:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-sage">
                      {activeStep.eyebrow}
                    </p>
                    <p className="text-sm text-muted">Question {currentStep + 1} of {steps.length}</p>
                  </div>
                  <div className="hidden h-2 w-44 overflow-hidden rounded-full bg-oat sm:block">
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
                    disabled={!canMoveBack}
                  >
                    <ArrowLeft aria-hidden="true" size={16} />
                    Back
                  </Button>
                  {isLastStep ? (
                    <Button type="submit" className="orange-button">
                      <Sparkles aria-hidden="true" size={16} />
                      Analyze and see plans
                    </Button>
                  ) : (
                    <Button type="button" className="orange-button" onClick={goNext}>
                      Next question
                      <ArrowRight aria-hidden="true" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
