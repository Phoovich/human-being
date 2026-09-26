export type LayerId = "tip" | "beneath" | "base";

export type Layer = {
  id: LayerId;
  name: string;
  meaning: string;
  invitation: string;
};

export type Card = {
  id: string;
  layer: LayerId;
  /** Asked once per Option, so it always speaks of "ทางนี้". */
  question: string;
  /** A gentle aside under the question, from us rather than from an Informant. */
  note?: string;
  /** A reworded feeling an Informant shared. Never a choice or an outcome. */
  echo?: string;
  /** Where the card came from, for the write-up. Never rendered in the app. */
  sources: string[];
};

export const layers: Layer[] = [
  {
    id: "tip",
    name: "ยอดน้ำแข็ง",
    meaning: "สิ่งที่เห็น",
    invitation: "เริ่มจากสิ่งที่มองเห็นได้ก่อน ข้อเท็จจริง เวลา เงิน และคนรอบตัว",
  },
  {
    id: "beneath",
    name: "ใต้น้ำ",
    meaning: "สิ่งที่รู้สึก",
    invitation: "ลึกลงไปใต้น้ำ ความรู้สึก ความกลัว และเสียงของคนอื่นที่ปนอยู่ในใจ",
  },
  {
    id: "base",
    name: "ฐาน",
    meaning: "สิ่งที่ให้คุณค่า",
    invitation: "ฐานของภูเขาน้ำแข็ง สิ่งที่คุณให้คุณค่า เมื่อไม่มีเงินหรือสายตาใครมากดดัน",
  },
];

export const cards: Card[] = [
  {
    id: "tip-senior",
    layer: "tip",
    question: "ถ้าจะถามรุ่นพี่สักคนเรื่องทางนี้ จะถามใคร และอยากถามว่าอะไร?",
    note: "ถ้ายังนึกไม่ออกว่าจะถามใคร เขียนแค่คำถามก็พอ",
    sources: ["R1", "R2", "R5", "R6", "R7"],
  },
  {
    id: "tip-cost",
    layer: "tip",
    question: "ทางนี้ใช้เวลาและเงินเท่าไหร่? ส่วนไหนที่รู้จริง ส่วนไหนที่เดาเอา?",
    echo: "มีคนหนึ่งเคยรู้สึกว่า เงินเป็นตัวกำหนดว่าเราเลือกอะไรได้บ้าง",
    sources: ["R1", "R4", "R6", "R7"],
  },
  {
    id: "tip-day",
    layer: "tip",
    question: "ถ้าเลือกทางนี้ วันธรรมดาหนึ่งวันของคุณจะเป็นยังไง?",
    echo: "มีคนหนึ่งเคยรู้สึกผิดหวัง เมื่อได้ลองจริงแล้วไม่เหมือนที่คิดไว้",
    sources: ["R1", "R2", "R7"],
  },
  {
    id: "tip-unknown",
    layer: "tip",
    question: "เรื่องไหนของทางนี้ที่คุณยังไม่รู้ และจะหาคำตอบได้จากที่ไหน?",
    echo: "มีคนหนึ่งเคยรู้สึกว่า ข้อมูลมีเยอะแยะ แต่ไม่ใช่สิ่งที่อยากรู้จริง ๆ",
    sources: ["R1", "R2", "R4", "R7"],
  },
  {
    id: "tip-skill",
    layer: "tip",
    question: "ทางนี้ต้องใช้ทักษะอะไรที่คุณมีอยู่แล้ว และอะไรที่ยังต้องฝึก?",
    echo: "หลายคนที่เราคุยด้วยรู้สึกว่ายังขาดทักษะการสื่อสาร คุณไม่ได้เป็นคนเดียว",
    sources: ["R1", "R2", "R3", "R4", "R6", "R7"],
  },
  {
    id: "beneath-voice",
    layer: "beneath",
    question: "เสียงที่ดังที่สุดในทางนี้ เป็นเสียงของใคร ของคุณ พ่อแม่ หรือเพื่อน?",
    echo: "มีคนหนึ่งเคยรู้สึกว่า จะทำตามใจตัวเองได้จริง ก็ต่อเมื่อดูแลตัวเองได้แล้ว",
    sources: ["R3", "R4", "R5", "R7"],
  },
  {
    id: "beneath-compare",
    layer: "beneath",
    question: "ตอนนึกถึงทางนี้ คุณกำลังเทียบตัวเองกับใครอยู่หรือเปล่า?",
    echo: "มีคนหนึ่งเคยเสียความมั่นใจ เพราะรู้สึกว่าคนรอบตัวทำได้ แต่ตัวเองทำไม่ได้",
    sources: ["R2", "R3"],
  },
  {
    id: "beneath-fear",
    layer: "beneath",
    question: "ถ้าเลือกทางนี้แล้วไม่เป็นอย่างที่หวัง สิ่งที่คุณกลัวที่สุดคืออะไร?",
    echo: "มีคนหนึ่งเคยรู้สึกว่า โอกาสที่ผ่านไปแล้วจะไม่วนกลับมาอีก",
    sources: ["R2", "R3", "R4"],
  },
  {
    id: "beneath-body",
    layer: "beneath",
    question: "ลองนึกภาพว่าเลือกทางนี้ไปแล้ว ร่างกายรู้สึกยังไง โล่ง แน่น หรือเฉย ๆ?",
    echo: "มีคนหนึ่งบอกว่า ที่ที่รู้สึกปลอดภัยคือที่ที่เงียบ สงบ และไม่ได้อยู่คนเดียว",
    sources: ["R3", "R4"],
  },
  {
    id: "beneath-unsaid",
    layer: "beneath",
    question: "มีอะไรเกี่ยวกับทางนี้ที่คุณยังไม่เคยบอกใครไหม?",
    note: "ไม่ต้องเขียนละเอียดก็ได้ แค่รู้ว่ามีอยู่ก็พอ",
    sources: ["R4", "Non scenario"],
  },
  {
    id: "base-audience",
    layer: "base",
    question: "ถ้าไม่มีใครเห็นผลลัพธ์ของทางนี้เลย คุณยังอยากเดินทางนี้ไหม?",
    echo: "มีคนหนึ่งเคยรู้สึกว่า สิ่งที่เรียนอยู่ไม่ใช่ตัวเองเลย",
    sources: ["R2", "R3", "Non scenario"],
  },
  {
    id: "base-money",
    layer: "base",
    question: "ถ้าเงินไม่ใช่ปัญหา ทางนี้ยังน่าเลือกอยู่ไหม? เพราะอะไร?",
    sources: ["R1", "R4", "R5", "R6"],
  },
  {
    id: "base-future",
    layer: "base",
    question: "อีก 5 ปีมองย้อนกลับมา คุณจะดีใจไหมที่ได้ลองทางนี้?",
    sources: ["R1", "R2", "R4"],
  },
  {
    id: "base-liking",
    layer: "base",
    question: "ทางนี้ใกล้กับสิ่งที่คุณชอบจริง ๆ แค่ไหน ไม่ใช่สิ่งที่ควรจะชอบ?",
    echo: "มีคนหนึ่งรู้สึกว่า ความชอบคือสิ่งที่ทำให้เดินต่อได้",
    sources: ["R1", "R3", "R4", "R6"],
  },
  {
    id: "base-friend",
    layer: "base",
    question: "ถ้าเพื่อนสนิทยืนอยู่ตรงทางแยกเดียวกันนี้ คุณจะบอกอะไรเขาเกี่ยวกับทางนี้?",
    sources: ["R1", "R3", "R7", "Non scenario"],
  },
];

export function cardsIn(layer: LayerId): Card[] {
  return cards.filter((card) => card.layer === layer);
}

export function findCard(id: string): Card | undefined {
  return cards.find((card) => card.id === id);
}

export function findLayer(id: LayerId): Layer {
  const layer = layers.find((l) => l.id === id);
  if (!layer) throw new Error(`Unknown layer: ${id}`);
  return layer;
}
