import { useState } from "react";
import { FACTORS, type EvidenceMap, type FactorId, type FieldworkOption } from "@/lib/decisionFieldwork";
import { StepLabel } from "./DecisionFieldworkSetup";

type Props = {
  options: FieldworkOption[];
  evidence: EvidenceMap;
  initialFactor: FactorId | null;
  initialOptionId: string | null;
  onBack: () => void;
  onDone: (factorId: FactorId, optionId: string) => void;
};

export function DecisionFieldworkFocus({ options, evidence, initialFactor, initialOptionId, onBack, onDone }: Props) {
  const candidates = FACTORS.flatMap((factor) => options.filter((option) => evidence[option.id]?.[factor.id] === "unknown").map((option) => ({ factor, option })));
  const fallback = FACTORS.flatMap((factor) => options.map((option) => ({ factor, option })));
  const choices = candidates.length > 0 ? candidates : fallback;
  const initialKey = initialFactor && initialOptionId ? `${initialOptionId}:${initialFactor}` : "";
  const [selectedKey, setSelectedKey] = useState(initialKey);
  const selected = choices.find(({ factor, option }) => `${option.id}:${factor.id}` === selectedKey);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-16">
      <StepLabel>เช็กให้ชัด · 03 / 04</StepLabel>
      <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-[#173b2d] sm:text-6xl">เรื่องไหนถ้ารู้เพิ่มแล้ว อาจทำให้คุณเปลี่ยนใจ?</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#52705d]">เลือกเพียงหนึ่งเรื่องที่คุ้มค่ากับการไปหาคำตอบก่อน ไม่ต้องแก้ทุกความไม่แน่ใจพร้อมกัน</p>

      {candidates.length === 0 && (
        <div className="mt-7 rounded-2xl border border-[#bd8255]/25 bg-[#f7ead9] p-5 text-sm leading-relaxed text-[#71472e]">
          คุณทำเครื่องหมายทุกเรื่องว่า “รู้แล้ว” หรือ “เดาอยู่” แล้ว ลองเลือกหนึ่งเรื่องที่ควรยืนยันกับความเป็นจริงอีกครั้งก็ได้
        </div>
      )}

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {choices.map(({ factor, option }) => {
          const key = `${option.id}:${factor.id}`;
          const active = key === selectedKey;
          return (
            <button
              type="button"
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`rounded-2xl border p-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2d] ${active ? "border-[#356448] bg-[#d2e4d1] shadow-sm" : "border-[#173b2d]/12 bg-white/60 hover:border-[#4e8660]/45 hover:bg-white/80"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#6b836e]">{option.label}</p>
                  <h2 className="mt-2 font-serif text-2xl leading-snug text-[#315b43]">{factor.label}</h2>
                </div>
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-xs ${active ? "border-[#356448] bg-[#356448] text-white" : "border-[#7e9a82] text-transparent"}`}>✓</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#52705d]">{factor.question}</p>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-7 rounded-2xl border border-[#4e8660]/25 bg-[#e5efe1]/75 p-5 text-[#315b43]">
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-[#52705d]">สิ่งที่คุณจะไปเช็ก</p>
          <p className="mt-2 font-serif text-2xl">{selected.factor.question}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="text-[#52705d] underline underline-offset-4">กลับ</button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && onDone(selected.factor.id, selected.option.id)}
          className="rounded-full bg-[#173b2d] px-7 py-3.5 font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]"
        >
          เปลี่ยนความไม่รู้ให้เป็นแผน <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
