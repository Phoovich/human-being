import { useState } from "react";
import { type DecisionBrief } from "@/lib/decisionFieldwork";

type Props = {
  briefs: DecisionBrief[];
  onStart: () => void;
  onOpen: (brief: DecisionBrief) => void;
  onClear: () => void;
  onExit: () => void;
};

const dateFormat = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" });

export function DecisionFieldworkHome({ briefs, onStart, onOpen, onClear, onExit }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-12">
      <header className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full border border-[#173b2d]/15 bg-white/45 px-4 py-2 text-sm font-semibold text-[#315b43] transition hover:border-[#173b2d]/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]"
        >
          <span aria-hidden="true">←</span> กิจกรรมทั้งหมด
        </button>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52705d]">เช็กให้ชัด</span>
      </header>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="rise">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#52705d]">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#d2e4d1] text-[#275139]">⌕</span>
            Decision Fieldwork
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.08] text-[#173b2d] sm:text-7xl">
            ก่อนเลือก ลองเช็กให้ชัด
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#365846] sm:text-xl">
            ไม่บอกว่าควรเลือกทางไหน ช่วยหาว่าเรื่องอะไรที่ยังไม่รู้ และเปลี่ยนมันให้เป็นคำถามหรือก้าวเล็ก ๆ ที่ทำได้จริง
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-8 rounded-full bg-[#173b2d] px-7 py-3.5 text-lg font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]"
          >
            เริ่มเช็กการตัดสินใจ <span aria-hidden="true">→</span>
          </button>
          <p className="mt-4 text-sm text-[#52705d]">ใช้เวลาประมาณ 5–8 นาที · ไม่ให้คะแนน · ไม่เลือกแทนคุณ</p>
        </div>

        <div className="rise rounded-[2rem] border border-[#6f9276]/20 bg-[#dcebd9]/70 p-6 sm:p-8" style={{ animationDelay: "120ms" }}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52705d]">ตอนจบคุณจะได้</p>
          <ol className="mt-5 space-y-5">
            {[
              ["01", "เห็นช่องว่าง", "แยกสิ่งที่รู้แล้ว สิ่งที่เดาอยู่ และสิ่งที่ยังไม่รู้"],
              ["02", "ได้คำถามที่ดีขึ้น", "รู้ว่าจะถามใคร ดูอะไร หรือทดลองอะไร"],
              ["03", "มีหนึ่งก้าวถัดไป", "กำหนดสิ่งที่จะทำและวันที่จะกลับมาทบทวน"],
            ].map(([number, title, description]) => (
              <li key={number} className="flex gap-4">
                <span className="font-mono text-sm text-[#6d9072]">{number}</span>
                <span>
                  <strong className="font-semibold text-[#214b34]">{title}</strong>
                  <span className="mt-1 block leading-relaxed text-[#52705d]">{description}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t border-[#6f9276]/20 pt-5 text-sm leading-relaxed text-[#52705d]">
            ข้อมูลของคุณอยู่ในเครื่องนี้เท่านั้น คุณจะได้แผนไปหาคำตอบ ไม่ใช่คำตัดสินจากระบบ
          </p>
        </div>
      </section>

      {briefs.length > 0 && (
        <section className="mt-20 border-t border-[#173b2d]/12 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52705d]">บันทึกในเครื่องนี้</p>
              <h2 className="mt-2 font-serif text-3xl text-[#173b2d]">กลับไปดู Decision Brief</h2>
            </div>
            {confirming ? (
              <div className="flex items-center gap-3 text-sm text-[#52705d]">
                <span>ลบทั้งหมดไหม?</span>
                <button type="button" onClick={() => { onClear(); setConfirming(false); }} className="rounded-full bg-[#173b2d] px-4 py-2 font-semibold text-[#f2f5e9]">
                  ลบ
                </button>
                <button type="button" onClick={() => setConfirming(false)} className="underline underline-offset-4">
                  ยกเลิก
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirming(true)} className="text-sm text-[#52705d] underline underline-offset-4">
                ล้างบันทึกทั้งหมด
              </button>
            )}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {briefs.map((brief) => (
              <button
                type="button"
                key={brief.id}
                onClick={() => onOpen(brief)}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#173b2d]/10 bg-white/55 px-5 py-4 text-left transition hover:border-[#173b2d]/30 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2d]"
              >
                <span className="min-w-0">
                  <strong className="block truncate font-semibold text-[#214b34]">{brief.decision}</strong>
                  <span className="mt-1 block truncate text-sm text-[#6a806f]">{brief.options.map((option) => option.label).join(" · ")}</span>
                  <span className="mt-1 block text-xs text-[#7b9180]">{brief.checkIn ? "มีบันทึกหลังไปเช็กแล้ว" : dateFormat.format(new Date(brief.createdAt))}</span>
                </span>
                <span className="shrink-0 text-xl text-[#52705d]" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
