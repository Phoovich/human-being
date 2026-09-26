import { useState } from "react";
import { findCard, layers, type Card } from "@/lib/deck";
import type { Draw } from "@/lib/readings";
import { IcebergGauge } from "./IcebergGauge";

type Props = {
  layerIndex: number;
  /** Shuffled card ids for this Layer, face-down. */
  order: string[];
  options: string[];
  onDone: (draw: Draw) => void;
};

export function LayerStep({ layerIndex, order, options, onDone }: Props) {
  const layer = layers[layerIndex];
  const isLast = layerIndex === layers.length - 1;
  const [putBack, setPutBack] = useState<string[]>([]);
  const [drawn, setDrawn] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(() => options.map(() => ""));

  const faceDown = order.filter((id) => id !== drawn && !putBack.includes(id));
  const card = drawn ? findCard(drawn) : undefined;
  const nextLabel = isLast ? "ไปที่กระจก" : "ดำลงไปอีกชั้น";

  function returnCard() {
    if (!drawn) return;
    setPutBack([...putBack, drawn]);
    setDrawn(null);
    setAnswers(options.map(() => ""));
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
      <header className="rise flex items-start gap-4" style={{ animationDelay: "300ms" }}>
        <IcebergGauge lit={[layerIndex]} className="h-16 w-11 shrink-0 text-foam/80" />
        <div>
          <p className="text-sm tracking-wide text-foam/70">
            ชั้นที่ {layerIndex + 1} จาก {layers.length}
          </p>
          <h1 className="mt-1 font-serif text-3xl leading-normal sm:text-4xl sm:leading-normal">
            {layer.name} <span className="text-foam/70">· {layer.meaning}</span>
          </h1>
          <p className="mt-2 text-foam/80">{layer.invitation}</p>
        </div>
      </header>

      {card ? (
        <div className="mt-10">
          <DrawnCard card={card} tag={`${layer.name} · ${layer.meaning}`} />

          <div className="rise mt-8 space-y-4" style={{ animationDelay: "500ms" }}>
            {options.map((option, i) => (
              <label key={option + i} className="block">
                <span className="text-sm text-foam/75">ทาง: {option}</span>
                <textarea
                  value={answers[i]}
                  onChange={(e) =>
                    setAnswers(answers.map((a, j) => (j === i ? e.target.value : a)))
                  }
                  rows={2}
                  className="mt-1.5 w-full resize-none rounded-xl border border-foam/20 bg-night/30 px-4 py-3 text-foam placeholder:text-foam/40 focus:border-foam/50 focus:outline-none"
                  placeholder="ตอบสั้น ๆ ก็ได้ หรือเว้นไว้ก็ได้"
                />
              </label>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => onDone({ layer: layer.id, cardId: card.id, answers })}
              className="rounded-full bg-moon px-7 py-3 font-medium text-night shadow-sm transition hover:bg-paper"
            >
              {nextLabel}
            </button>
            <button
              type="button"
              onClick={returnCard}
              className="text-foam/80 underline underline-offset-4 hover:text-foam"
            >
              วางคืน
            </button>
            <span className="text-sm text-foam/60">วางคืนได้เสมอ ไม่ต้องบอกเหตุผล</span>
          </div>
        </div>
      ) : faceDown.length > 0 ? (
        <div className="rise mt-12" style={{ animationDelay: "450ms" }}>
          <p className="text-center text-foam/80">เลือกไพ่หนึ่งใบ ตามที่ใจบอก</p>
          <div className="mt-8 flex justify-center">
            {faceDown.map((id, i) => {
              const offset = i - (faceDown.length - 1) / 2;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDrawn(id)}
                  aria-label={`ไพ่คว่ำใบที่ ${i + 1}`}
                  className="card-back-pattern -mx-2 h-32 w-20 rounded-2xl border border-moon/30 shadow-lg shadow-night/40 transition duration-300 hover:-translate-y-3 hover:border-moon/70 focus-visible:-translate-y-3 focus-visible:outline-2 focus-visible:outline-moon sm:-mx-1 sm:h-48 sm:w-32"
                  style={{
                    transform: `translateY(${Math.abs(offset) * 8}px) rotate(${offset * 6}deg)`,
                  }}
                >
                  <CardEmblem />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rise mt-12 rounded-2xl border border-foam/20 p-6 text-center">
          <p className="font-serif text-xl">คุณวางไพ่ชั้นนี้คืนทั้งหมด ไม่เป็นไรเลย</p>
          <p className="mt-2 text-foam/75">บางชั้นอาจยังไม่ใช่เวลาที่จะมอง</p>
          <button
            type="button"
            onClick={() => onDone({ layer: layer.id, cardId: null, answers: [] })}
            className="mt-6 rounded-full bg-moon px-7 py-3 font-medium text-night"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function DrawnCard({ card, tag }: { card: Card; tag: string }) {
  return (
    <div className="card-stage mx-auto max-w-xl">
      <div className="card-flip grid">
        <article className="card-face rounded-3xl bg-paper px-7 py-9 text-paper-ink shadow-2xl shadow-night/50 [grid-area:1/1] sm:px-10 sm:py-12">
          <p className="text-sm tracking-wide text-paper-muted">{tag}</p>
          <h2 className="mt-4 font-serif text-2xl leading-relaxed sm:text-3xl sm:leading-relaxed">
            {card.question}
          </h2>
          {card.note && <p className="mt-4 text-paper-muted">{card.note}</p>}
          {card.echo && (
            <p className="mt-6 border-t border-paper-ink/10 pt-4 text-paper-muted">
              <span className="mr-2 text-xs tracking-wide">เสียงสะท้อน</span>
              {card.echo}
            </p>
          )}
        </article>
        <div
          className="card-face card-face-back card-back-pattern rounded-3xl border border-moon/30 [grid-area:1/1]"
          aria-hidden="true"
        >
          <CardEmblem />
        </div>
      </div>
    </div>
  );
}

function CardEmblem() {
  return (
    <svg viewBox="0 0 40 40" className="mx-auto h-10 w-10 text-moon/70" aria-hidden="true">
      <path d="M4 17 Q 9 15 14 17 T 24 17 T 36 17" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="20,5 25,17 15,17" fill="currentColor" fillOpacity="0.8" />
      <polygon
        points="15,17 25,17 31,35 9,35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
