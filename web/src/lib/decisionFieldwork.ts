import { useSyncExternalStore } from "react";

export type EvidenceStatus = "known" | "assumed" | "unknown";

export type FactorId = "daily" | "cost" | "fit" | "skills" | "future" | "support";

export type Factor = {
  id: FactorId;
  label: string;
  description: string;
  question: string;
};

export const FACTORS: Factor[] = [
  {
    id: "daily",
    label: "วันธรรมดาและลักษณะชีวิต",
    description: "ในทางนี้ เวลา พลังงาน และงานจริงในแต่ละวันเป็นอย่างไร",
    question: "ถ้าเลือกทางนี้ วันธรรมดาจริง ๆ ต้องทำอะไรบ้าง และช่วงไหนที่กดดันที่สุด?",
  },
  {
    id: "cost",
    label: "ค่าใช้จ่าย เวลา และการเดินทาง",
    description: "ต้นทุนที่ต้องจ่ายจริง ไม่ใช่แค่สิ่งที่เดาไว้",
    question: "ถ้าเลือกทางนี้ ต้องใช้เงิน เวลา และการเดินทางจริงประมาณเท่าไหร่?",
  },
  {
    id: "fit",
    label: "ความชอบและความรู้สึกว่าเป็นตัวเอง",
    description: "สิ่งที่ทำให้รู้สึกอยากอยู่กับทางนี้ต่อในวันที่ไม่ง่าย",
    question: "อะไรในทางนี้ที่ทำให้รู้สึกว่าเป็นตัวเอง และอะไรที่อาจทำให้ฝืน?",
  },
  {
    id: "skills",
    label: "ทักษะและประสบการณ์",
    description: "สิ่งที่มีอยู่แล้ว และสิ่งที่ต้องฝึกก่อนเริ่ม",
    question: "คนที่เริ่มทางนี้ควรมีทักษะอะไร และเรายังขาดอะไรที่ฝึกได้บ้าง?",
  },
  {
    id: "future",
    label: "โอกาสและผลต่ออนาคต",
    description: "ทางเลือกนี้เปิดหรือปิดโอกาสอะไรต่อไป",
    question: "คนที่เลือกทางนี้ต่อไปมักได้ทำอะไร และโอกาสจริง ๆ มาจากไหน?",
  },
  {
    id: "support",
    label: "คนสนับสนุนและความคาดหวัง",
    description: "เสียงของตัวเอง ครอบครัว เพื่อน และคนที่ต้องเดินไปด้วยกัน",
    question: "ใครได้รับผลจากทางนี้ และเราจะคุยกันอย่างไรโดยไม่ให้คนอื่นตัดสินใจแทน?",
  },
];

export type FieldworkMethod = "person" | "source" | "trial" | "conversation";

export type FieldworkMethodInfo = {
  id: FieldworkMethod;
  label: string;
  description: string;
  action: string;
};

export const FIELDWORK_METHODS: FieldworkMethodInfo[] = [
  {
    id: "person",
    label: "ถามคนที่เคยทำจริง",
    description: "คุยกับรุ่นพี่ คนทำงาน หรือคนที่เดินทางนี้มาก่อน",
    action: "นัดคุย 15 นาที แล้วถามคำถามนี้กับคนที่เคยทำจริง",
  },
  {
    id: "source",
    label: "เช็กข้อมูลต้นทาง",
    description: "ดู syllabus, job description, ค่าใช้จ่ายจริง หรือเงื่อนไขจากแหล่งต้นทาง",
    action: "หาข้อมูลจากแหล่งต้นทาง 2 แหล่ง แล้วจดว่าส่วนไหนยืนยันได้",
  },
  {
    id: "trial",
    label: "ทดลองเล็ก ๆ ก่อน",
    description: "ลองทำงานหนึ่งชิ้น เข้าเรียน ทดลองเดินทาง หรือดูสถานที่จริง",
    action: "ออกแบบการทดลองเล็ก ๆ ที่ทำได้ภายในหนึ่งสัปดาห์",
  },
  {
    id: "conversation",
    label: "คุยกับคนที่ได้รับผลกระทบ",
    description: "ชวนครอบครัว เพื่อน หรือคนที่ต้องร่วมทางมาคุยอย่างตรงไปตรงมา",
    action: "นัดคุยโดยบอกก่อนว่าอยากฟังความกังวล ไม่ใช่ให้ใครเลือกแทน",
  },
];

export type FieldworkOption = {
  id: string;
  label: string;
};

export type EvidenceMap = Record<string, Partial<Record<FactorId, EvidenceStatus>>>;

export type BriefCheckIn = {
  learned: string;
  changedPerspective: string;
  nextStep: string;
  checkedAt: string;
};

export type DecisionBrief = {
  id: string;
  createdAt: string;
  decision: string;
  options: FieldworkOption[];
  evidence: EvidenceMap;
  focusArea: FactorId;
  focusOptionId: string;
  method: FieldworkMethod;
  source: string;
  question: string;
  nextAction: string;
  changeMindCondition: string;
  revisitDate: string;
  checkIn?: BriefCheckIn;
};

export function factorById(id: FactorId): Factor {
  const factor = FACTORS.find((item) => item.id === id);
  if (!factor) throw new Error(`Unknown factor: ${id}`);
  return factor;
}

export function methodById(id: FieldworkMethod): FieldworkMethodInfo {
  const method = FIELDWORK_METHODS.find((item) => item.id === id);
  if (!method) throw new Error(`Unknown fieldwork method: ${id}`);
  return method;
}

export function statusLabel(status: EvidenceStatus): string {
  if (status === "known") return "รู้แล้ว";
  if (status === "assumed") return "เดาอยู่";
  return "ยังไม่รู้";
}

const KEY = "human-being:decision-fieldwork:briefs";
const EMPTY: DecisionBrief[] = [];

let cache: DecisionBrief[] | undefined;
const listeners = new Set<() => void>();

function readStorage(): DecisionBrief[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as DecisionBrief[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: DecisionBrief[]) {
  cache = next;
  try {
    if (next.length === 0) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or blocked storage: the Brief remains available until the tab closes.
  }
  listeners.forEach((listener) => listener());
}

function getSnapshot(): DecisionBrief[] {
  if (cache === undefined) cache = readStorage();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useDecisionBriefs(): DecisionBrief[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function saveDecisionBrief(brief: DecisionBrief) {
  const current = getSnapshot();
  const exists = current.some((item) => item.id === brief.id);
  commit(exists ? current.map((item) => (item.id === brief.id ? brief : item)) : [brief, ...current]);
}

export function clearDecisionBriefs() {
  commit(EMPTY);
}
