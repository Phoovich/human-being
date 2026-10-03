import { useState } from "react";
import type { Reading } from "@/lib/readings";
import { IcebergGauge } from "./IcebergGauge";

type Props = {
  readings: Reading[];
  onStart: () => void;
  onOpen: (id: string) => void;
  onClear: () => void;
  onActivities: () => void;
};

const promises = [
  { word: "ไม่ทำนาย", line: "ไพ่ชุดนี้ไม่บอกอนาคต" },
  { word: "ไม่ตัดสิน", line: "ไม่มีคะแนน ไม่มีอันดับ ไม่มี “ทางที่ดีที่สุด”" },
  {
    word: "แค่ถาม",
    line: "คำถามทุกใบเขียนจากเรื่องเล่าของนิสิตจริง 7 คน แล้วให้คุณเห็นคำตอบของตัวเองวางเรียงกัน",
  },
];

const dateFormat = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" });

export function Home({ readings, onStart, onOpen, onClear, onActivities }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="rise mx-auto w-full max-w-2xl px-6 py-14 sm:py-20">
      <div className="flex items-start justify-between gap-5">
        <IcebergGauge className="h-20 w-14 text-ink/70" />
        <button
          type="button"
          onClick={onActivities}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70 transition hover:border-ink/35 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          กิจกรรมทั้งหมด
        </button>
      </div>
      <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">ไพ่ส่องใจ</h1>
      <p className="mt-3 font-serif text-xl text-ink/80 sm:text-2xl">ไม่ทำนาย ไม่ตัดสิน แค่ถาม</p>

      <dl className="mt-10 space-y-5">
        {promises.map((p) => (
          <div key={p.word} className="flex gap-4">
            <dt className="w-24 shrink-0 font-semibold">{p.word}</dt>
            <dd className="text-ink/80">{p.line}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onStart}
        className="mt-12 rounded-full bg-ink px-8 py-3.5 text-lg font-medium text-mist shadow-sm transition hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        เริ่มส่องใจ
      </button>
      <p className="mt-4 text-sm text-ink/65">
        ทุกอย่างที่คุณพิมพ์อยู่ในเครื่องนี้เท่านั้น ไม่ถูกส่งไปที่ไหน
      </p>

      {readings.length > 0 && (
        <section className="mt-16 border-t border-ink/15 pt-8">
          <h2 className="font-semibold">ครั้งก่อน ๆ</h2>
          <ul className="mt-4 space-y-2">
            {readings.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onOpen(r.id)}
                  className="flex w-full items-baseline justify-between gap-4 rounded-lg px-3 py-2 text-left transition hover:bg-ink/5"
                >
                  <span className="truncate">{r.decision}</span>
                  <span className="shrink-0 text-sm text-ink/60">
                    {dateFormat.format(new Date(r.createdAt))}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-sm">
            {confirming ? (
              <div className="flex flex-wrap items-center gap-3">
                <span>ลบการส่องใจทั้งหมดในเครื่องนี้? ย้อนกลับไม่ได้</span>
                <button
                  type="button"
                  onClick={() => {
                    onClear();
                    setConfirming(false);
                  }}
                  className="rounded-full bg-ink px-4 py-1.5 text-mist"
                >
                  ลบเลย
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="rounded-full px-4 py-1.5 underline underline-offset-4"
                >
                  ยกเลิก
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="text-ink/65 underline underline-offset-4 hover:text-ink"
              >
                ล้างทุกอย่างในเครื่องนี้
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
