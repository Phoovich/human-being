import { IcebergGauge } from "./IcebergGauge";

type Props = {
  onOriginal: () => void;
  onFieldwork: () => void;
};

export function ActivityPicker({ onOriginal, onFieldwork }: Props) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:py-20">
      <header className="rise max-w-2xl">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
          <span className="h-px w-8 bg-ink/30" /> Human Being · เลือกกิจกรรม
        </div>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-6xl">
          เลือกวิธีที่จะช่วยให้มองชัดขึ้น
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
          กิจกรรมส่วนตัวสองแบบ สำหรับเวลาที่การตัดสินใจต้องการมากกว่าคำตอบเร็ว ๆ ไม่มีแบบไหนวินิจฉัยหรือบอกว่าคุณควรทำอะไร
        </p>
      </header>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <button
          type="button"
          onClick={onOriginal}
          className="group rise rounded-[2rem] border border-ink/10 bg-[#dfeef0] p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:p-9"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-start justify-between gap-5">
            <IcebergGauge className="h-20 w-14 text-deep/75 transition-transform duration-500 group-hover:-translate-y-1" />
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-deep/70">
              กิจกรรมเดิม
            </span>
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-deep/65">กิจกรรมเดิม · ไพ่ส่องใจ</p>
          <h2 className="mt-2 font-serif text-3xl text-deep sm:text-4xl">ไม่ทำนาย ไม่ตัดสิน แค่ถาม</h2>
          <p className="mt-4 max-w-md leading-relaxed text-deep/75">
            เปิดคำถามเกี่ยวกับสิ่งที่เห็น สิ่งที่รู้สึก และสิ่งที่ให้คุณค่า แล้ววางคำตอบของตัวเองเคียงกันในกระจก
          </p>
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-deep">
            เปิดไพ่ส่องใจ <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onFieldwork}
          className="group rise rounded-[2rem] border border-[#173b2d]/10 bg-[#e8f0e5] p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#173b2d]/25 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2d] sm:p-9"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-20 w-14 place-items-center rounded-2xl border border-[#557b63]/40 bg-[#d2e4d1] text-3xl text-[#275139] shadow-inner">
              <span aria-hidden="true">✦</span>
            </div>
            <span className="rounded-full bg-[#d2e4d1]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#275139]">
              กิจกรรมใหม่
            </span>
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-[#356448]">กิจกรรมใหม่ · Decision Fieldwork</p>
          <h2 className="mt-2 font-serif text-3xl text-[#173b2d] sm:text-4xl">ก่อนเลือก ลองเช็กให้ชัด</h2>
          <p className="mt-4 max-w-md leading-relaxed text-[#365846]">
            แยกสิ่งที่รู้ สิ่งที่เดา และสิ่งที่ยังไม่รู้ แล้วเปลี่ยนหนึ่งช่องว่างให้เป็นคำถามหรือก้าวเล็ก ๆ ที่ทำได้จริง
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#356448]">
            <span className="rounded-full bg-white/60 px-3 py-1.5">5–8 นาที</span>
            <span className="rounded-full bg-white/60 px-3 py-1.5">หนึ่งก้าวถัดไป</span>
            <span className="rounded-full bg-white/60 px-3 py-1.5">ไม่เลือกแทน</span>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-[#173b2d]">
            เริ่มเช็กให้ชัด <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>

      <p className="mt-10 text-sm text-ink/55">สิ่งที่คุณเขียนอยู่ในเบราว์เซอร์นี้เท่านั้น และสลับกิจกรรมได้ทุกเมื่อ</p>
    </div>
  );
}
