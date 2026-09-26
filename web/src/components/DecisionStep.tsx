import { useState } from "react";

type Props = {
  onBack: () => void;
  onDone: (decision: string, options: string[]) => void;
};

const MAX_OPTIONS = 3;

const field =
  "w-full rounded-xl border border-ink/20 bg-white/70 px-4 py-3 text-ink placeholder:text-ink/40 focus:border-ink/50 focus:outline-none";

export function DecisionStep({ onBack, onDone }: Props) {
  const [decision, setDecision] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const filled = options.map((o) => o.trim()).filter(Boolean);
  const ready = decision.trim() !== "" && filled.length >= 2;

  return (
    <form
      className="rise mx-auto w-full max-w-2xl px-6 py-14 sm:py-20"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onDone(decision.trim(), filled);
      }}
    >
      <label htmlFor="decision" className="block font-serif text-2xl sm:text-3xl">
        ตอนนี้คุณกำลังตัดสินใจเรื่องอะไร?
      </label>
      <textarea
        id="decision"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
        rows={2}
        placeholder="เช่น จะย้ายคณะดีไหม จะฝึกงานที่ไหน หรือจะลงวิชาเลือกตัวไหน"
        className={`${field} mt-5 resize-none text-lg`}
      />

      <fieldset className="mt-10">
        <legend className="font-serif text-2xl sm:text-3xl">ทางที่คุณกำลังชั่งใจอยู่</legend>
        <p className="mt-2 text-ink/70">ใส่ 2 หรือ 3 ทาง ไพ่แต่ละใบจะถามถึงทุกทางที่คุณใส่</p>
        <div className="mt-5 space-y-3">
          {options.map((option, i) => (
            <input
              key={i}
              value={option}
              onChange={(e) => setOptions(options.map((o, j) => (j === i ? e.target.value : o)))}
              placeholder={`ทางที่ ${i + 1}`}
              aria-label={`ทางที่ ${i + 1}`}
              className={field}
            />
          ))}
        </div>
        {options.length < MAX_OPTIONS ? (
          <button
            type="button"
            onClick={() => setOptions([...options, ""])}
            className="mt-3 text-ink/70 underline underline-offset-4 hover:text-ink"
          >
            + เพิ่มอีกทาง
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setOptions(options.slice(0, 2))}
            className="mt-3 text-ink/70 underline underline-offset-4 hover:text-ink"
          >
            เอาทางที่ 3 ออก
          </button>
        )}
      </fieldset>

      <div className="mt-12 flex items-center gap-6">
        <button
          type="submit"
          disabled={!ready}
          className="rounded-full bg-ink px-8 py-3.5 text-lg font-medium text-mist shadow-sm transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          ไปต่อ
        </button>
        <button type="button" onClick={onBack} className="text-ink/70 underline underline-offset-4">
          กลับ
        </button>
      </div>
    </form>
  );
}
