# Human Being

Two private activities for students making a decision.

## Activities

**ไพ่ส่องใจ** is the original card ritual. It moves through what a Student can see, what they feel, and what they value, then ends at the Mirror with their own words side by side. It never scores, ranks, recommends, or uses AI.

**เช็กให้ชัด** (Decision Fieldwork) helps a Student separate what they know from what they assume, choose one missing fact that could change their Decision, and turn it into a question, a small trial, and a date to revisit.

Both activities keep their data in browser storage. Neither tells a Student which Option to choose.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3100>. Port 3100 instead of 3000 because something else on the demo laptop already listens on 3000.

Everything a Student types stays in that browser's localStorage. Each activity has its own saved records and clear action.

## Where things live

- `src/lib/deck.ts`: the three layers and all 15 cards, with the informants each card came from (`sources`, never shown in the app).
- `src/lib/readings.ts`: saving readings in the browser.
- `src/lib/decisionFieldwork.ts`: evidence areas, fieldwork methods, and saved Decision Briefs.
- `src/components/Ritual.tsx`: the activity chooser and both flows.
- `../CONTEXT.md`: the words we use (Card, Layer, Echo, Mirror, and so on).
