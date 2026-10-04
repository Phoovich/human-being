import { useState } from "react";
import { factorById, methodById, statusLabel, type BriefCheckIn, type DecisionBrief } from "@/lib/decisionFieldwork";

type Props = {
  brief: DecisionBrief;
  onChange: (brief: DecisionBrief) => void;
  onAgain: () => void;
  onHome: () => void;
};

const field = "fieldwork-input w-full rounded-xl border border-[#173b2d]/15 bg-white/70 px-4 py-3 text-[#315b43] placeholder:text-[#6b836e]/60 focus:border-[#4e8660] focus:outline-none";
const dateFormat = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" });

export function DecisionFieldworkBrief({ brief, onChange, onAgain, onHome }: Props) {
  const factor = factorById(brief.focusArea);
  const method = methodById(brief.method);
  const focusedStatus = brief.evidence[brief.focusOptionId]?.[brief.focusArea] ?? "unknown";
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [editingCheckIn, setEditingCheckIn] = useState(!brief.checkIn);
  const [learned, setLearned] = useState(brief.checkIn?.learned ?? "");
  const [changedPerspective, setChangedPerspective] = useState(brief.checkIn?.changedPerspective ?? "");
  const [nextStep, setNextStep] = useState(brief.checkIn?.nextStep ?? "");

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(toText(brief));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 2500);
  }

  function saveCheckIn() {
    const checkIn: BriefCheckIn = {
      learned: learned.trim(),
      changedPerspective: changedPerspective.trim(),
      nextStep: nextStep.trim(),
      checkedAt: new Date().toISOString(),
    };
    onChange({ ...brief, checkIn });
    setEditingCheckIn(false);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-9 sm:py-14">
      <header className="fieldwork-reveal flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#52705d]">
            <span className="h-px w-8 bg-[#6f9272]" /> Decision Brief
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-[#173b2d] sm:text-6xl">หนึ่งเรื่องที่คุณจะไปเช็กให้ชัด</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#52705d]">นี่ไม่ใช่คำตอบสุดท้าย แต่เป็นแผนที่จะพาคุณออกจากการเดา ไปเจอข้อมูลหรือประสบการณ์จริง</p>
        </div>
        <span className="rounded-full border border-[#173b2d]/12 bg-white/55 px-4 py-2 text-sm text-[#52705d]">บันทึกในเครื่องนี้แล้ว</span>
      </header>

      <section className="fieldwork-reveal fieldwork-stagger-1 mt-9 rounded-3xl border border-[#173b2d]/10 bg-white/60 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">การตัดสินใจ</p>
        <h2 className="mt-2 font-serif text-3xl text-[#173b2d]">{brief.decision}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {brief.options.map((option) => <span key={option.id} className="rounded-full bg-[#dcebd9] px-3 py-1.5 text-sm font-semibold text-[#315b43]">{option.label}</span>)}
        </div>
      </section>

      <section className="fieldwork-reveal fieldwork-stagger-2 mt-5 grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
        <div className="fieldwork-hover rounded-3xl border border-[#4e8660]/25 bg-[#e5efe1]/80 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">สิ่งที่ยังต้องเช็ก</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#6b836e]">{brief.options.find((option) => option.id === brief.focusOptionId)?.label}</p>
          <h2 className="mt-2 font-serif text-3xl leading-relaxed text-[#315b43]">{factor.label}</h2>
          <p className="mt-4 leading-relaxed text-[#52705d]">สถานะตอนเริ่ม: <span className="font-semibold text-[#365276]">{statusLabel(focusedStatus)}</span></p>
        </div>
        <div className="fieldwork-hover rounded-3xl border border-[#173b2d]/10 bg-white/60 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">วิธีไปหาคำตอบ</p>
          <h2 className="mt-3 font-serif text-2xl text-[#315b43]">{method.label}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#52705d]">{brief.source}</p>
          <p className="mt-5 border-t border-[#173b2d]/10 pt-4 text-sm leading-relaxed text-[#52705d]">กลับมาทบทวนวันที่ <strong className="text-[#315b43]">{formatDate(brief.revisitDate)}</strong></p>
        </div>
      </section>

      <section className="fieldwork-reveal fieldwork-stagger-3 mt-5 rounded-3xl border border-[#173b2d]/10 bg-white/60 p-6 sm:p-8">
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">คำถามหรือสิ่งที่จะสังเกต</p>
            <p className="mt-3 whitespace-pre-wrap text-lg leading-relaxed text-[#315b43]">{brief.question}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">ก้าวเล็ก ๆ ที่จะทำ</p>
            <p className="mt-3 whitespace-pre-wrap text-lg leading-relaxed text-[#315b43]">{brief.nextAction}</p>
          </div>
        </div>
        <div className="mt-7 border-t border-[#173b2d]/10 pt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">คำตอบแบบไหนที่จะทำให้กลับมาทบทวน</p>
          <p className="mt-3 whitespace-pre-wrap text-lg leading-relaxed text-[#71472e]">{brief.changeMindCondition}</p>
        </div>
      </section>

      <section className="fieldwork-reveal mt-10 rounded-3xl border border-[#6880ab]/25 bg-[#e6edf5] p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52708a]">หลังจากไปเช็กมาแล้ว</p>
            <h2 className="mt-2 font-serif text-3xl text-[#26435f]">ข้อมูลจริงทำให้มุมมองเปลี่ยนอย่างไร?</h2>
          </div>
          {brief.checkIn && <span className="rounded-full bg-white/55 px-3 py-1.5 text-sm font-semibold text-[#365276]">เช็กแล้ว</span>}
        </div>
        {editingCheckIn ? (
          <div className="mt-6 space-y-5">
            <label className="block"><span className="text-sm font-semibold text-[#365276]">ได้รู้อะไร</span><textarea value={learned} onChange={(event) => setLearned(event.target.value)} rows={3} placeholder="ข้อมูลหรือประสบการณ์ที่ได้พบจริง…" className={`${field} mt-2`} /></label>
            <label className="block"><span className="text-sm font-semibold text-[#365276]">มุมมองเปลี่ยนไหม</span><textarea value={changedPerspective} onChange={(event) => setChangedPerspective(event.target.value)} rows={2} placeholder="ยังเหมือนเดิม / เปลี่ยนไปเพราะ…" className={`${field} mt-2`} /></label>
            <label className="block"><span className="text-sm font-semibold text-[#365276]">ก้าวต่อไป</span><textarea value={nextStep} onChange={(event) => setNextStep(event.target.value)} rows={2} placeholder="หลังจากรู้นี้ ฉันจะ…" className={`${field} mt-2`} /></label>
            <button type="button" onClick={saveCheckIn} disabled={!learned.trim() || !changedPerspective.trim() || !nextStep.trim()} className="rounded-full bg-[#26435f] px-6 py-3 font-semibold text-[#f4f7fb] shadow-sm transition hover:bg-[#355a7c] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-35">บันทึกสิ่งที่ได้รู้</button>
          </div>
        ) : (
          <div className="mt-6 space-y-5 text-[#52708a]">
            <CheckInAnswer label="สิ่งที่ได้รู้" value={brief.checkIn?.learned ?? ""} />
            <CheckInAnswer label="มุมมองที่เปลี่ยน" value={brief.checkIn?.changedPerspective ?? ""} />
            <CheckInAnswer label="ก้าวต่อไป" value={brief.checkIn?.nextStep ?? ""} />
            <button type="button" onClick={() => setEditingCheckIn(true)} className="text-sm underline underline-offset-4">แก้ไขบันทึกนี้</button>
          </div>
        )}
      </section>

      <div className="fieldwork-reveal mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pb-4">
        <button type="button" onClick={copyBrief} className="rounded-full bg-[#173b2d] px-6 py-3 font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] hover:shadow-lg">{copyState === "copied" ? "คัดลอกแล้ว" : copyState === "failed" ? "คัดลอกไม่ได้" : "คัดลอก Decision Brief"}</button>
        <button type="button" onClick={onAgain} className="text-[#52705d] underline underline-offset-4 transition hover:text-[#173b2d]">เช็กการตัดสินใจเรื่องใหม่</button>
        <button type="button" onClick={onHome} className="text-[#52705d] underline underline-offset-4 transition hover:text-[#173b2d]">กลับหน้าเช็กให้ชัด</button>
      </div>
      <p className="text-center text-sm text-[#6b836e]">การตัดสินใจยังเป็นของคุณ แผนนี้มีไว้ช่วยให้คุณไม่ต้องเดาอยู่คนเดียว</p>
    </div>
  );
}

function CheckInAnswer({ label, value }: { label: string; value: string }) {
  return <div><p className="text-sm font-semibold text-[#365276]">{label}</p><p className="mt-1 whitespace-pre-wrap leading-relaxed">{value}</p></div>;
}

function formatDate(value: string): string {
  if (!value) return "ยังไม่ได้กำหนด";
  return dateFormat.format(new Date(`${value}T12:00:00`));
}

function toText(brief: DecisionBrief): string {
  const factor = factorById(brief.focusArea);
  const method = methodById(brief.method);
  return [
    "Decision Brief · เช็กให้ชัด",
    `การตัดสินใจ: ${brief.decision}`,
    `ทางเลือก: ${brief.options.map((option) => option.label).join(" / ")}`,
    "",
    `สิ่งที่ยังต้องเช็ก: ${factor.label}`,
    `วิธี: ${method.label}`,
    `ไปเช็กกับ/ที่: ${brief.source}`,
    `คำถาม: ${brief.question}`,
    `ก้าวเล็ก ๆ: ${brief.nextAction}`,
    `สิ่งที่จะทำให้กลับมาทบทวน: ${brief.changeMindCondition}`,
    `วันที่ทบทวน: ${formatDate(brief.revisitDate)}`,
  ].join("\n");
}
