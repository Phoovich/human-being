import { IcebergGauge } from "./IcebergGauge";

type Props = {
  onOriginal: () => void;
  onFieldwork: () => void;
};

export function ActivityPicker({ onOriginal, onFieldwork }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
      <header className="rise max-w-3xl">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
          <span className="h-px w-8 bg-ink/30" /> Human Being <span className="text-ink/30">/</span> กิจกรรมส่วนตัว
        </div>
        <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.12] text-ink sm:text-6xl">
          เลือกวิธีที่จะช่วยให้มองชัดขึ้น
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
          กิจกรรมส่วนตัวสองแบบ สำหรับเวลาที่การตัดสินใจต้องการมากกว่าคำตอบเร็ว ๆ ไม่มีแบบไหนวินิจฉัยหรือบอกว่าคุณควรทำอะไร
        </p>
      </header>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
        <button
          type="button"
          onClick={onOriginal}
          className="group rise flex min-h-[27rem] flex-col rounded-[2rem] border border-ink/10 bg-[#dfeef0] p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:p-9"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-20 w-14 place-items-center rounded-2xl border border-deep/15 bg-white/35">
              <IcebergGauge className="h-16 w-11 text-deep/75 transition-transform duration-500 group-hover:-translate-y-1" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-[0.16em] text-deep/40">01</span>
          </div>
          <p className="mt-9 text-sm font-semibold uppercase tracking-[0.15em] text-deep/65">ไพ่ส่องใจ</p>
          <h2 className="mt-2 font-serif text-3xl text-deep sm:text-4xl">ไม่ทำนาย ไม่ตัดสิน แค่ถาม</h2>
          <p className="mt-4 max-w-md leading-relaxed text-deep/75">
            เปิดคำถามเกี่ยวกับสิ่งที่เห็น สิ่งที่รู้สึก และสิ่งที่ให้คุณค่า แล้ววางคำตอบของตัวเองเคียงกันในกระจก
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-deep">
            เปิดไพ่ส่องใจ <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onFieldwork}
          className="group rise flex min-h-[27rem] flex-col rounded-[2rem] border border-[#173b2d]/10 bg-[#e8f0e5] p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#173b2d]/25 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d] sm:p-9"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-20 w-14 place-items-center rounded-2xl border border-[#557b63]/40 bg-[#d2e4d1] text-3xl text-[#275139] shadow-inner">
              <span aria-hidden="true">✦</span>
            </div>
            <span className="font-mono text-sm font-semibold tracking-[0.16em] text-[#356448]/50">02</span>
          </div>
          <p className="mt-9 text-sm font-semibold uppercase tracking-[0.15em] text-[#356448]">เช็กให้ชัด</p>
          <h2 className="mt-2 font-serif text-3xl text-[#173b2d] sm:text-4xl">ก่อนเลือก ลองเช็กให้ชัด</h2>
          <p className="mt-4 max-w-md leading-relaxed text-[#365846]">
            แยกสิ่งที่รู้ สิ่งที่เดา และสิ่งที่ยังไม่รู้ แล้วเปลี่ยนหนึ่งช่องว่างให้เป็นคำถามหรือก้าวเล็ก ๆ ที่ทำได้จริง
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#356448]">
            <span className="rounded-full bg-white/60 px-3 py-1.5">5–8 นาที</span>
            <span className="rounded-full bg-white/60 px-3 py-1.5">หนึ่งก้าวถัดไป</span>
            <span className="rounded-full bg-white/60 px-3 py-1.5">ไม่เลือกแทน</span>
          </div>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-[#173b2d]">
            เริ่มเช็กให้ชัด <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>

      <div className="mt-10 flex items-start gap-3 border-t border-ink/10 pt-5 text-sm text-ink/55">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ink/20 text-xs" aria-hidden="true">✓</span>
        <p>สิ่งที่คุณเขียนอยู่ในเบราว์เซอร์นี้เท่านั้น และสลับกิจกรรมได้ทุกเมื่อ</p>
      </div>
    </div>
  );
}
