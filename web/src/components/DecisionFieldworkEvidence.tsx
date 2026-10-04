import { useState } from "react";
import { FACTORS, statusLabel, type EvidenceMap, type EvidenceStatus, type FactorId, type FieldworkOption } from "@/lib/decisionFieldwork";
import { FieldworkProgress } from "./FieldworkProgress";
import { StepLabel } from "./DecisionFieldworkSetup";

type Props = {
  options: FieldworkOption[];
  evidence: EvidenceMap;
  onChange: (evidence: EvidenceMap) => void;
  onBack: () => void;
  onDone: () => void;
};

const statuses: EvidenceStatus[] = ["known", "assumed", "unknown"];

export function DecisionFieldworkEvidence({ options, evidence, onChange, onBack, onDone }: Props) {
  const [activeOptionId, setActiveOptionId] = useState(options[0]?.id ?? "");
  const activeOption = options.find((option) => option.id === activeOptionId) ?? options[0];

  function setStatus(optionId: string, factorId: FactorId, status: EvidenceStatus) {
    onChange({
      ...evidence,
      [optionId]: {
        ...evidence[optionId],
        [factorId]: status,
      },
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-16">
      <StepLabel>เช็กให้ชัด · 02 / 04</StepLabel>
      <FieldworkProgress current={2} />
      <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-[#173b2d] sm:text-6xl">ตอนนี้อะไรคือข้อมูลจริง อะไรคือการคาดเดา?</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#52705d]">เลือกสถานะให้แต่ละเรื่อง ไม่ต้องเขียนทุกอย่างให้ครบ แค่ทำให้เห็นว่าตรงไหนยังต้องไปเช็กต่อ</p>

      <div className="fieldwork-reveal fieldwork-stagger-1 mt-9 flex flex-wrap gap-2" role="tablist" aria-label="ทางเลือก">
        {options.map((option) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeOption?.id === option.id}
            key={option.id}
            onClick={() => setActiveOptionId(option.id)}
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2d] ${activeOption?.id === option.id ? "border-[#356448] bg-[#356448] text-white" : "border-[#173b2d]/15 bg-white/60 text-[#52705d] hover:border-[#4e8660]/50"}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {activeOption && (
        <section key={activeOption.id} className="fieldwork-reveal fieldwork-stagger-2 mt-5 rounded-3xl border border-[#173b2d]/10 bg-white/60 p-5 shadow-sm sm:p-7" role="tabpanel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">กำลังดูข้อมูลของ</p>
              <h2 className="mt-1 font-serif text-3xl text-[#214b34]">{activeOption.label}</h2>
            </div>
            <p className="text-sm text-[#6b836e]">เริ่มต้นทุกช่องที่ “ยังไม่รู้” เพื่อไม่ให้ต้องแกล้งมั่นใจ</p>
          </div>

          <div className="mt-7 space-y-3">
            {FACTORS.map((factor, index) => {
              const current = evidence[activeOption.id]?.[factor.id] ?? "unknown";
              return (
                <div key={factor.id} className="fieldwork-hover rounded-2xl border border-[#173b2d]/10 bg-[#f8faf5] p-4 sm:p-5" style={{ transitionDelay: `${index * 25}ms` }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-xl">
                      <h3 className="font-semibold text-[#315b43]">{factor.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6b836e]">{factor.description}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-1.5" aria-label={`สถานะของ ${factor.label}`}>
                      {statuses.map((status) => (
                        <button
                          type="button"
                          key={status}
                          aria-pressed={current === status}
                          onClick={() => setStatus(activeOption.id, factor.id, status)}
                          className={`rounded-full border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2d] ${current === status ? statusClass(status) : "border-[#173b2d]/10 bg-white/65 text-[#7a9180] hover:border-[#4e8660]/40"}`}
                        >
                          {statusLabel(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="text-[#52705d] underline underline-offset-4 transition hover:text-[#173b2d]">กลับ</button>
        <button type="button" onClick={onDone} className="group rounded-full bg-[#173b2d] px-7 py-3.5 font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]">
          เลือกสิ่งที่ควรเช็กก่อน <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

function statusClass(status: EvidenceStatus): string {
  if (status === "known") return "border-[#4e8660] bg-[#dcebd9] text-[#315b43]";
  if (status === "assumed") return "border-[#bd8255] bg-[#f7ead9] text-[#71472e]";
  return "border-[#6880ab] bg-[#e6edf5] text-[#365276]";
}
