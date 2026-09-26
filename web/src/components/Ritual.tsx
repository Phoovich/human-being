"use client";

import { useState } from "react";
import { cardsIn, layers } from "@/lib/deck";
import { clearReadings, saveReading, useReadings, type Draw, type Reading } from "@/lib/readings";
import { BreathPause } from "./BreathPause";
import { DecisionStep } from "./DecisionStep";
import { Home } from "./Home";
import { LayerStep } from "./LayerStep";
import { Mirror } from "./Mirror";

type Stage =
  | { kind: "home" }
  | { kind: "decision" }
  | { kind: "breath" }
  | { kind: "layer"; index: number; order: string[] }
  | { kind: "mirror"; readingId: string };

/** The deeper the Reading goes, the darker and quieter the water. */
const layerDepths = ["bg-shallow", "bg-deep", "bg-deeper"];

function depthOf(stage: Stage): string {
  switch (stage.kind) {
    case "layer":
      return `${layerDepths[stage.index]} text-foam`;
    case "mirror":
      return "bg-night text-foam";
    default:
      return "bg-mist text-ink";
  }
}

export function Ritual() {
  const readings = useReadings();
  const [stage, setStage] = useState<Stage>({ kind: "home" });
  const [draft, setDraft] = useState<Reading | null>(null);

  function go(next: Stage) {
    setStage(next);
    window.scrollTo({ top: 0 });
  }

  function diveInto(index: number) {
    const order = shuffle(cardsIn(layers[index].id).map((card) => card.id));
    go({ kind: "layer", index, order });
  }

  function begin(decision: string, options: string[]) {
    setDraft({
      id: newId(),
      createdAt: new Date().toISOString(),
      decision,
      options,
      draws: [],
      reflection: "",
    });
    go({ kind: "breath" });
  }

  function finishLayer(index: number, draw: Draw) {
    if (!draft) return;
    const next = { ...draft, draws: [...draft.draws, draw] };
    if (index < layers.length - 1) {
      setDraft(next);
      diveInto(index + 1);
    } else {
      saveReading(next);
      setDraft(null);
      go({ kind: "mirror", readingId: next.id });
    }
  }

  const mirrored =
    stage.kind === "mirror" ? readings.find((r) => r.id === stage.readingId) : undefined;

  return (
    <main className={`flex flex-1 flex-col transition-colors duration-700 ${depthOf(stage)}`}>
      {stage.kind === "home" && (
        <Home
          readings={readings}
          onStart={() => go({ kind: "decision" })}
          onOpen={(id) => go({ kind: "mirror", readingId: id })}
          onClear={clearReadings}
        />
      )}
      {stage.kind === "decision" && (
        <DecisionStep onBack={() => go({ kind: "home" })} onDone={begin} />
      )}
      {stage.kind === "breath" && <BreathPause onDone={() => diveInto(0)} />}
      {stage.kind === "layer" && draft && (
        <LayerStep
          key={stage.index}
          layerIndex={stage.index}
          order={stage.order}
          options={draft.options}
          onDone={(draw) => finishLayer(stage.index, draw)}
        />
      )}
      {stage.kind === "mirror" &&
        (mirrored ? (
          <Mirror
            reading={mirrored}
            onAgain={() => go({ kind: "decision" })}
            onHome={() => go({ kind: "home" })}
          />
        ) : (
          <div className="mx-auto max-w-xl px-6 py-20 text-center">
            <p>ไม่พบการส่องใจครั้งนี้ในเครื่องแล้ว</p>
            <button
              type="button"
              onClick={() => go({ kind: "home" })}
              className="mt-6 underline underline-offset-4"
            >
              กลับหน้าแรก
            </button>
          </div>
        ))}
    </main>
  );
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** crypto.randomUUID only exists on secure origins; the demo may be opened over a LAN IP. */
function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
