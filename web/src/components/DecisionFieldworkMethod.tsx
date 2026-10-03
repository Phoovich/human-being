import { FIELDWORK_METHODS, factorById, methodById, type FactorId, type FieldworkMethod, type FieldworkOption } from "@/lib/decisionFieldwork";
import { StepLabel } from "./DecisionFieldworkSetup";

type Props = {
  factorId: FactorId;
  option: FieldworkOption;
  method: FieldworkMethod | null;
  source: string;
  question: string;
  nextAction: string;
  changeMindCondition: string;
  revisitDate: string;
  onChange: (change: Partial<{ method: FieldworkMethod | null; source: string; question: string; nextAction: string; changeMindCondition: string; revisitDate: string }>) => void;
  onBack: () => void;
  onDone: () => void;
};

const field = "w-full rounded-xl border border-[#173b2d]/15 bg-white/70 px-4 py-3 text-[#315b43] placeholder:text-[#6b836e]/60 focus:border-[#4e8660] focus:outline-none";

export function DecisionFieldworkMethod({ factorId, option, method, source, question, nextAction, changeMindCondition, revisitDate, onChange, onBack, onDone }: Props) {
  const factor = factorById(factorId);
  const selectedMethod = method ? methodById(method) : undefined;
  const ready = Boolean(method && source.trim() && question.trim() && nextAction.trim() && changeMindCondition.trim() && revisitDate);

  function chooseMethod(nextMethod: FieldworkMethod) {
    const methodInfo = methodById(nextMethod);
    onChange({
      method: nextMethod,
      question: question.trim() ? question : factor.question,
      nextAction: methodInfo.action,
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-16">
      <StepLabel>เช็กให้ชัด · 04 / 04</StepLabel>
      <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-[#173b2d] sm:text-6xl">จะไปหาคำตอบนี้จากที่ไหน?</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#52705d]">คุณกำลังเช็กเรื่อง “{factor.label}” ของทางเลือก “{option.label}” เลือกวิธีที่ทำได้จริงที่สุดสำหรับคุณ</p>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {FIELDWORK_METHODS.map((methodInfo) => {
          const active = method === methodInfo.id;
          return (
            <button
              type="button"
              key={methodInfo.id}
              onClick={() => chooseMethod(methodInfo.id)}
              className={`rounded-2xl border p-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2d] ${active ? "border-[#356448] bg-[#d2e4d1] shadow-sm" : "border-[#173b2d]/12 bg-white/60 hover:border-[#4e8660]/45 hover:bg-white/80"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <strong className="font-semibold text-[#315b43]">{methodInfo.label}</strong>
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-xs ${active ? "border-[#356448] bg-[#356448] text-white" : "border-[#7e9a82] text-transparent"}`}>✓</span>
              </div>
              <span className="mt-2 block text-sm leading-relaxed text-[#52705d]">{methodInfo.description}</span>
            </button>
          );
        })}
      </div>

      {selectedMethod && (
        <section className="mt-7 rounded-3xl border border-[#173b2d]/10 bg-white/60 p-5 shadow-sm sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#52705d]">ทำให้แผนนี้ชัดขึ้น</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#315b43]">จะไปเช็กกับใครหรือที่ไหน?</span>
              <input value={source} onChange={(event) => onChange({ source: event.target.value })} placeholder={sourcePlaceholder(method)} className={`${field} mt-2`} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#315b43]">จะกลับมาทบทวนวันที่</span>
              <input type="date" value={revisitDate} onChange={(event) => onChange({ revisitDate: event.target.value })} className={`${field} mt-2`} />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#315b43]">คำถามที่คุณจะถามหรือสิ่งที่จะสังเกต</span>
            <textarea value={question} onChange={(event) => onChange({ question: event.target.value })} rows={3} className={`${field} mt-2 resize-y`} />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#315b43]">ก้าวเล็ก ๆ ที่จะทำ</span>
            <textarea value={nextAction} onChange={(event) => onChange({ nextAction: event.target.value })} rows={2} className={`${field} mt-2 resize-y`} />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#315b43]">คำตอบแบบไหนที่จะทำให้คุณเปลี่ยนใจ?</span>
            <textarea value={changeMindCondition} onChange={(event) => onChange({ changeMindCondition: event.target.value })} rows={2} placeholder="ถ้าพบว่า… ฉันจะกลับมาทบทวนทางเลือกนี้อีกครั้ง" className={`${field} mt-2 resize-y`} />
          </label>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="text-[#52705d] underline underline-offset-4">กลับ</button>
        <button type="button" disabled={!ready} onClick={onDone} className="rounded-full bg-[#173b2d] px-7 py-3.5 font-semibold text-[#f2f5e9] shadow-sm transition hover:bg-[#28553d] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d]">
          สร้าง Decision Brief <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

function method(value: FieldworkMethod | null): FieldworkMethod {
  return value ?? "person";
}

function sourcePlaceholder(value: FieldworkMethod | null): string {
  if (method(value) === "person") return "เช่น รุ่นพี่ที่เคยฝึกงานสายนี้ / คนทำงานจริง";
  if (method(value) === "source") return "เช่น เว็บไซต์บริษัท / syllabus / เอกสารค่าใช้จ่าย";
  if (method(value) === "trial") return "เช่น งานทดลองหนึ่งชิ้น / สถานที่จริง / วิชาทดลอง";
  return "เช่น พ่อแม่ / เพื่อน / คนที่ต้องร่วมทางกับคุณ";
}
