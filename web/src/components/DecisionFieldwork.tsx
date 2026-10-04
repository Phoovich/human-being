"use client";

import { useState } from "react";
import {
  clearDecisionBriefs,
  FACTORS,
  saveDecisionBrief,
  useDecisionBriefs,
  type DecisionBrief,
  type EvidenceMap,
  type FactorId,
  type FieldworkMethod,
  type FieldworkOption,
} from "@/lib/decisionFieldwork";
import { DecisionFieldworkBrief } from "./DecisionFieldworkBrief";
import { DecisionFieldworkEvidence } from "./DecisionFieldworkEvidence";
import { DecisionFieldworkFocus } from "./DecisionFieldworkFocus";
import { DecisionFieldworkHome } from "./DecisionFieldworkHome";
import { DecisionFieldworkMethod } from "./DecisionFieldworkMethod";
import { DecisionFieldworkSetup } from "./DecisionFieldworkSetup";

type Stage = "home" | "setup" | "evidence" | "focus" | "method" | "brief";

type Draft = {
  id: string;
  createdAt: string;
  decision: string;
  options: FieldworkOption[];
  evidence: EvidenceMap;
  focusArea: FactorId | null;
  focusOptionId: string | null;
  method: FieldworkMethod | null;
  source: string;
  question: string;
  nextAction: string;
  changeMindCondition: string;
  revisitDate: string;
};

type Props = {
  onExit: () => void;
};

export function DecisionFieldwork({ onExit }: Props) {
  const briefs = useDecisionBriefs();
  const [stage, setStage] = useState<Stage>("home");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeBrief, setActiveBrief] = useState<DecisionBrief | null>(null);

  function go(next: Stage) {
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNew() {
    setDraft(null);
    setActiveBrief(null);
    go("setup");
  }

  function startDecision(decision: string, labels: string[]) {
    const options = labels.map((label) => ({ id: newId(), label }));
    setDraft({
      id: newId(),
      createdAt: new Date().toISOString(),
      decision,
      options,
      evidence: initialEvidence(options),
      focusArea: null,
      focusOptionId: null,
      method: null,
      source: "",
      question: "",
      nextAction: "",
      changeMindCondition: "",
      revisitDate: dateAfter(7),
    });
    go("evidence");
  }

  function finishFocus(focusArea: FactorId, focusOptionId: string) {
    if (!draft) return;
    const focusChanged = draft.focusArea !== focusArea || draft.focusOptionId !== focusOptionId;
    setDraft({
      ...draft,
      focusArea,
      focusOptionId,
      ...(focusChanged ? {
        method: null,
        source: "",
        question: "",
        nextAction: "",
        changeMindCondition: "",
      } : {}),
    });
    go("method");
  }

  function updateDraft(change: Partial<Draft>) {
    setDraft((current) => current ? { ...current, ...change } : current);
  }

  function finishBrief() {
    if (!draft || !draft.focusArea || !draft.focusOptionId || !draft.method || !draft.source.trim() || !draft.question.trim() || !draft.nextAction.trim() || !draft.changeMindCondition.trim() || !draft.revisitDate) return;
    const brief: DecisionBrief = {
      id: draft.id,
      createdAt: draft.createdAt,
      decision: draft.decision,
      options: draft.options,
      evidence: draft.evidence,
      focusArea: draft.focusArea,
      focusOptionId: draft.focusOptionId,
      method: draft.method,
      source: draft.source.trim(),
      question: draft.question.trim(),
      nextAction: draft.nextAction.trim(),
      changeMindCondition: draft.changeMindCondition.trim(),
      revisitDate: draft.revisitDate,
    };
    saveDecisionBrief(brief);
    setActiveBrief(brief);
    setDraft(null);
    go("brief");
  }

  function updateSavedBrief(next: DecisionBrief) {
    setActiveBrief(next);
    saveDecisionBrief(next);
  }

  function openBrief(brief: DecisionBrief) {
    setActiveBrief(brief);
    setDraft(null);
    go("brief");
  }

  return (
    <div className="min-h-full bg-[#f3f7ed] text-[#173b2d] [background-image:radial-gradient(circle_at_85%_0%,rgb(210_228_209_/_0.55),transparent_28rem)]">
      <div key={stage} className="fieldwork-stage">
        {stage === "home" && (
          <DecisionFieldworkHome
            briefs={briefs}
            onStart={startNew}
            onOpen={openBrief}
            onClear={clearDecisionBriefs}
            onExit={onExit}
          />
        )}
        {stage === "setup" && <DecisionFieldworkSetup onBack={() => go("home")} onDone={startDecision} />}
        {stage === "evidence" && draft && (
          <DecisionFieldworkEvidence
            key={draft.id}
            options={draft.options}
            evidence={draft.evidence}
            onChange={(evidence) => updateDraft({ evidence })}
            onBack={() => { setDraft(null); go("setup"); }}
            onDone={() => go("focus")}
          />
        )}
        {stage === "focus" && draft && (
          <DecisionFieldworkFocus
            key={draft.id}
            options={draft.options}
            evidence={draft.evidence}
            initialFactor={draft.focusArea}
            initialOptionId={draft.focusOptionId}
            onBack={() => go("evidence")}
            onDone={finishFocus}
          />
        )}
        {stage === "method" && draft && draft.focusArea && draft.focusOptionId && (
          <DecisionFieldworkMethod
            key={`${draft.id}-${draft.focusArea}-${draft.focusOptionId}`}
            factorId={draft.focusArea}
            option={draft.options.find((item) => item.id === draft.focusOptionId) ?? draft.options[0]!}
            method={draft.method}
            source={draft.source}
            question={draft.question}
            nextAction={draft.nextAction}
            changeMindCondition={draft.changeMindCondition}
            revisitDate={draft.revisitDate}
            onChange={updateDraft}
            onBack={() => go("focus")}
            onDone={finishBrief}
          />
        )}
        {stage === "brief" && activeBrief && (
          <DecisionFieldworkBrief
            brief={activeBrief}
            onChange={updateSavedBrief}
            onAgain={startNew}
            onHome={() => { setActiveBrief(null); go("home"); }}
          />
        )}
      </div>
    </div>
  );
}

function initialEvidence(options: FieldworkOption[]): EvidenceMap {
  return Object.fromEntries(options.map((option) => [option.id, Object.fromEntries(FACTORS.map((factor) => [factor.id, "unknown"]))])) as EvidenceMap;
}

function dateAfter(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
