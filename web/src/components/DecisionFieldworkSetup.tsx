import { useState, type ReactNode } from "react";

type Props = {
  onBack: () => void;
  onDone: (decision: string, options: string[]) => void;
};

const field = "w-full rounded-xl border border-[#173b2d]/15 bg-white/70 px-4 py-3 text-[#315b43] placeholder:text-[#6b836e]/60 focus:border-[#4e8660] focus:outline-none";

export function DecisionFieldworkSetup({ onBack, onDone }: Props) {
  const [decision, setDecision] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const filled = options.map((option) => option.trim()).filter(Boolean);
  const ready = decision.trim().length > 0 && filled.length >= 2;

  return (
    <form
      className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-16"
      onSubmit={(event) => {
        event.preventDefault();
        if (ready) onDone(decision.trim(), filled);
      }}
    >
      <StepLabel>เช็กให้ชัด · 01 / 04</StepLabel>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-[#173b2d] sm:text-6xl">ตอนนี้คุณกำลังตัดสินใจเรื่องอะไร?</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#52705d]">เขียนเรื่องจริงหรือเรื่องที่กำลังจะต้องเลือก ไม่ต้องทำให้เป็นคำถามที่สมบูรณ์ก็ได้</p>
      <textarea
        autoFocus
        value={decision}
        onChange={(event) => setDecision(event.target.value)}
        rows={2}
        placeholder="เช่น จะฝึกงานที่ไหนดี จะย้ายคณะไหม หรือจะเลือกวิชาอะไร"
        className={`${field} mt-7 resize-none text-lg`}
      />

      <fieldset className="mt-10">
        <legend className="font-serif text-3xl text-[#173b2d]">ทางเลือกที่กำลังชั่งใจ</legend>
        <p className="mt-2 text-[#52705d]">ใส่ 2 ทางก่อน ถ้ามีทางที่สามค่อยเพิ่มได้</p>
        <div className="mt-5 space-y-3">
          {options.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(event) => setOptions(options.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
              placeholder={`ทางเลือกที่ ${index + 1}`}
              aria-label={`ทางเลือกที่ ${index + 1}`}
              className={field}
            />
          ))}
        </div>
        {options.length < 3 ? (
          <button type="button" onClick={() => setOptions([...options, ""])} className="mt-3 text-sm text-[#52705d] underline underline-offset-4">
            + เพิ่มทางเลือกที่ 3
          </button>
        ) : (
          <button type="button" onClick={() => setOptions(options.slice(0, 2))} className="mt-3 text-sm text-[#52705d] underline underline-offset-4">
            เอาทางเลือกที่ 3 ออก
          </button>
        )}
      </fieldset>

      <div className="mt-12 flex flex-wrap items-center gap-5">
        <button type="submit" disabled={!ready} className="rounded-full bg-[#173b2d] px-7 py-3.5 font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]">
          ดูสิ่งที่รู้และยังไม่รู้ <span aria-hidden="true">→</span>
        </button>
        <button type="button" onClick={onBack} className="text-[#52705d] underline underline-offset-4">กลับ</button>
      </div>
    </form>
  );
}

export function StepLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#52705d]">
      <span className="h-px w-8 bg-[#6f9272]" /> {children}
    </div>
  );
}
