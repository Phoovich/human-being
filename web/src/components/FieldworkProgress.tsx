const steps = ["ตั้งโจทย์", "แยกข้อมูล", "เลือกจุดสำคัญ", "ทำแผน"];

export function FieldworkProgress({ current }: { current: number }) {
  return (
    <div
      className="fieldwork-reveal mb-10 max-w-3xl"
      role="list"
      aria-label={`ขั้นตอนที่ ${current} จาก ${steps.length}`}
    >
      <div className="flex items-center gap-2">
        {steps.map((label, index) => {
          const complete = index < current - 1;
          const active = index === current - 1;

          return (
            <div key={label} className="flex min-w-0 flex-1 items-center gap-2" role="listitem">
              <span
                aria-current={active ? "step" : undefined}
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                  complete || active
                    ? "border-[#356448] bg-[#356448] text-white"
                    : "border-[#9db3a0] bg-white/55 text-[#6b836e]"
                }`}
              >
                {complete ? "✓" : String(index + 1).padStart(2, "0")}
              </span>
              {index < steps.length - 1 && (
                <span className={`h-px flex-1 transition-colors duration-500 ${complete ? "bg-[#6f9272]" : "bg-[#bfd0c0]"}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-4 text-[0.7rem] font-medium text-[#6b836e]">
        {steps.map((label, index) => (
          <span key={label} className={`text-center ${index === current - 1 ? "font-semibold text-[#315b43]" : ""}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
