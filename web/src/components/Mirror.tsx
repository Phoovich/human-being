import { Fragment, useState } from "react";
import { findCard, findLayer } from "@/lib/deck";
import { saveReading, type Reading } from "@/lib/readings";
import { IcebergGauge } from "./IcebergGauge";

type Props = {
  reading: Reading;
  onAgain: () => void;
  onHome: () => void;
};

const LEFT_BLANK = "เว้นไว้";

export function Mirror({ reading, onAgain, onHome }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const rows = reading.draws.map((draw) => {
    const layer = findLayer(draw.layer);
    return {
      draw,
      tag: `${layer.name} · ${layer.meaning}`,
      question: draw.cardId ? findCard(draw.cardId)?.question : undefined,
    };
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(toText(reading));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 2500);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:py-16">
      <header className="rise flex items-start gap-4">
        <IcebergGauge lit={[0, 1, 2]} className="h-16 w-11 shrink-0 text-foam/80" />
        <div>
          <p className="text-sm tracking-wide text-foam/70">กระจก</p>
          <h1 className="mt-1 font-serif text-3xl leading-normal sm:text-4xl sm:leading-normal">{reading.decision}</h1>
          <p className="mt-2 text-foam/75">
            นี่คือคำตอบของคุณเอง วางเรียงกันไว้ให้เห็น ไม่มีคะแนน และไม่มีทางไหนถูกเน้นกว่าทางอื่น
          </p>
        </div>
      </header>

      {/* Wide screens: Options side by side. */}
      <div
        className="rise mt-10 hidden gap-px overflow-hidden rounded-2xl border border-foam/15 bg-foam/15 md:grid"
        style={{
          gridTemplateColumns: `minmax(13rem, 1.1fr) repeat(${reading.options.length}, minmax(0, 1fr))`,
        }}
      >
        <div className="bg-night p-4" />
        {reading.options.map((option, i) => (
          <div key={option + i} className="bg-night p-4 font-serif text-xl">
            {option}
          </div>
        ))}
        {rows.map((row) => (
          <Fragment key={row.draw.layer}>
            <div className="bg-night p-4">
              <p className="text-xs tracking-wide text-foam/60">{row.tag}</p>
              <p className="mt-1 leading-relaxed">
                {row.question ?? <span className="text-foam/60">ชั้นนี้คุณวางไพ่คืนทั้งหมด</span>}
              </p>
            </div>
            {reading.options.map((option, i) => (
              <Answer key={option + i} text={row.question ? row.draw.answers[i] : undefined} />
            ))}
          </Fragment>
        ))}
      </div>

      {/* Narrow screens: one block per Card. */}
      <div className="rise mt-10 space-y-5 md:hidden">
        {rows.map((row) => (
          <section key={row.draw.layer} className="rounded-2xl border border-foam/15 p-5">
            <p className="text-xs tracking-wide text-foam/60">{row.tag}</p>
            <p className="mt-1 leading-relaxed">
              {row.question ?? <span className="text-foam/60">ชั้นนี้คุณวางไพ่คืนทั้งหมด</span>}
            </p>
            {row.question && (
              <dl className="mt-4 space-y-3">
                {reading.options.map((option, i) => (
                  <div key={option + i}>
                    <dt className="text-sm text-foam/70">{option}</dt>
                    <dd className="mt-0.5 whitespace-pre-wrap">
                      {row.draw.answers[i]?.trim() || (
                        <span className="text-foam/45">{LEFT_BLANK}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </div>

      <label className="rise mt-12 block">
        <span className="font-serif text-2xl">เห็นอะไรในกระจกบ้าง?</span>
        <textarea
          value={reading.reflection}
          onChange={(e) => saveReading({ ...reading, reflection: e.target.value })}
          rows={3}
          placeholder="เขียนสั้น ๆ ก็ได้ หรือไม่เขียนเลยก็ได้"
          className="mt-3 w-full resize-none rounded-xl border border-foam/20 bg-deeper/40 px-4 py-3 text-foam placeholder:text-foam/40 focus:border-foam/50 focus:outline-none"
        />
      </label>

      <div className="rise mt-14 text-center">
        <p className="font-serif text-3xl text-moon sm:text-4xl">การตัดสินใจเป็นของคุณ</p>
        <p className="mt-3 text-foam/75">ไพ่ไม่รู้ว่าทางไหนดีกว่า มีแค่คุณที่รู้ กลับมาส่องใหม่ได้เสมอ</p>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-moon px-6 py-3 font-medium text-night shadow-sm transition hover:bg-paper"
        >
          {copyState === "copied"
            ? "คัดลอกแล้ว"
            : copyState === "failed"
              ? "คัดลอกไม่ได้ ลองอีกครั้ง"
              : "คัดลอกไว้คุยกับใครสักคน"}
        </button>
        <button type="button" onClick={onAgain} className="text-foam/80 underline underline-offset-4">
          ส่องใจอีกครั้ง
        </button>
        <button type="button" onClick={onHome} className="text-foam/80 underline underline-offset-4">
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}

function Answer({ text }: { text: string | undefined }) {
  return (
    <div className="whitespace-pre-wrap bg-night p-4 leading-relaxed">
      {text?.trim() || <span className="text-foam/45">{text === undefined ? "" : LEFT_BLANK}</span>}
    </div>
  );
}

function toText(reading: Reading): string {
  const blocks = reading.draws.map((draw) => {
    const layer = findLayer(draw.layer);
    const question = draw.cardId ? findCard(draw.cardId)?.question : undefined;
    if (!question) return `[${layer.name} · ${layer.meaning}] วางไพ่คืนทั้งหมด`;
    const lines = reading.options.map(
      (option, i) => `- ${option}: ${draw.answers[i]?.trim() || LEFT_BLANK}`,
    );
    return [`[${layer.name} · ${layer.meaning}] ${question}`, ...lines].join("\n");
  });
  return [
    "ไพ่ส่องใจ",
    `เรื่องที่กำลังตัดสินใจ: ${reading.decision}`,
    "",
    blocks.join("\n\n"),
    "",
    `สิ่งที่เห็นในกระจก: ${reading.reflection.trim() || LEFT_BLANK}`,
    "การตัดสินใจเป็นของคุณ",
  ].join("\n");
}
