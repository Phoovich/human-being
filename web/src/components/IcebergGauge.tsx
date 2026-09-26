const bands = [
  "50,8 63,34 37,34", // ยอดน้ำแข็ง: above the waterline
  "37,34 63,34 76,84 24,84", // ใต้น้ำ
  "24,84 76,84 88,132 12,132", // ฐาน
];

type Props = {
  /** Indexes of the Layers to light up. */
  lit?: number[];
  className?: string;
};

export function IcebergGauge({ lit = [], className }: Props) {
  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <path
        d="M0 34 Q 12.5 29 25 34 T 50 34 T 75 34 T 100 34"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      {bands.map((points, i) => {
        const on = lit.includes(i);
        return (
          <polygon
            key={points}
            points={points}
            fill={on ? "var(--color-moon)" : "none"}
            fillOpacity={on ? 0.85 : 0}
            stroke="currentColor"
            strokeOpacity={on ? 0.9 : 0.45}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
