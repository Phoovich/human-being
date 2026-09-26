import { useEffect, useEffectEvent, useState } from "react";

const BREATHS = 3;
const PHASE_MS = 4000;
const SETTLE_MS = 700;

export function BreathPause({ onDone }: { onDone: () => void }) {
  // -1 while settling in; then even phases breathe in, odd phases breathe out.
  const [phase, setPhase] = useState(-1);
  const finish = useEffectEvent(onDone);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        if (phase + 1 >= BREATHS * 2) finish();
        else setPhase(phase + 1);
      },
      phase === -1 ? SETTLE_MS : PHASE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [phase]);

  const inhaling = phase >= 0 && phase % 2 === 0;
  const label = phase === -1 ? "ก่อนเปิดไพ่" : inhaling ? "หายใจเข้า…" : "หายใจออก…";

  return (
    <div className="rise mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-ink/70">ก่อนเปิดไพ่ ลองหายใจช้า ๆ ด้วยกัน {BREATHS} ครั้ง</p>

      <div className="relative mt-12 grid h-64 w-64 place-items-center">
        <div
          className="absolute inset-0 rounded-full bg-shallow/25 transition-transform ease-in-out motion-reduce:transition-none"
          style={{
            transform: `scale(${inhaling ? 1 : 0.55})`,
            transitionDuration: `${PHASE_MS}ms`,
          }}
        />
        <div
          className="absolute inset-10 rounded-full bg-shallow/30 transition-transform ease-in-out motion-reduce:transition-none"
          style={{
            transform: `scale(${inhaling ? 1 : 0.6})`,
            transitionDuration: `${PHASE_MS}ms`,
          }}
        />
        <p className="relative font-serif text-2xl" aria-live="polite">
          {label}
        </p>
      </div>

      <p className="mt-10 text-sm text-ink/60">
        {phase >= 0 ? `ครั้งที่ ${Math.floor(phase / 2) + 1} จาก ${BREATHS}` : " "}
      </p>

      <button
        type="button"
        onClick={onDone}
        className="mt-6 text-ink/70 underline underline-offset-4 hover:text-ink"
      >
        ข้าม
      </button>
    </div>
  );
}
