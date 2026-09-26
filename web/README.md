# ไพ่ส่องใจ

ไม่ทำนาย ไม่ตัดสิน แค่ถาม

A card ritual for university students in the middle of a decision: draw one card from each layer of the iceberg (what you see, what you feel, what you value), answer it for each of your options, and end at the Mirror, which lays your own words side by side. It never scores, ranks, recommends or uses AI (see `../docs/adr/0001-mirror-not-recommender.md`).

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3100>. Port 3100 instead of 3000 because something else on the demo laptop already listens on 3000.

Everything a student types stays in that browser's localStorage. "ล้างทุกอย่างในเครื่องนี้" on the home page wipes it.

## Where things live

- `src/lib/deck.ts`: the three layers and all 15 cards, with the informants each card came from (`sources`, never shown in the app).
- `src/lib/readings.ts`: saving readings in the browser.
- `src/components/Ritual.tsx`: the flow, from home to the Mirror.
- `../CONTEXT.md`: the words we use (Card, Layer, Echo, Mirror, and so on).
