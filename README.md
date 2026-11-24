# aromeosayi.org: Concept "Voice"

An alternative direction for the Apostle's site: same content as V1, a completely different design.

**The idea:** Arome Osayi was born with facial palsy that impaired his speech. At thirteen his tongue
was loosened, and he was called to be God's mouthpiece to the nations. The whole site is built
around that voice:

- **The opening (home hero).** Bone paper and his name in huge type. Between "Arome" and "Osayi" a
  hairline draws across the page and opens into footage, like a mouth opening. Inside the band, a
  broadcast caption names the message on screen and runs its real source timecode. One tap plays that
  moment. Inner pages open the same way.
- **The mandate, spoken.** The mandate word for word, with small looping video "pills" set inside the
  sentence. They print in ink (black and white) and bloom into colour under the cursor.
- **Now showing.** Latest messages as a broadcast: a big screen, a programme listing, and his quotes
  crawling slowly along the bottom like a ticker.
- **The voice line.** His life as one line of sound: flat from 1977, then from "Age 13" it becomes
  a living waveform that grows with each mark (the mandate, the network, the nations).
- **Books, rolling.** All thirteen covers travel slowly around a 3D drum. Hover pauses it, drag spins
  it, arrows step through, and keyboard focus brings a book to the front.
- **Dispatches.** Testimonies one at a time, the place as a dateline, advanced by a hairline timer.

Motion is deliberately quiet: things open, roll and breathe once, and nothing scroll-jacks. Everything
is static for visitors who ask for reduced motion, and videos never load on data-saver.

Brand, taken from the current aromeosayi.org: **Poppins** for everything (name in uppercase SemiBold,
titles in Medium, nav and buttons uppercase), the **gold → copper gradient** `#E7C585 → #A35B56` as the
one accent (buttons, active link, rules, the monogram), near-black `#111` and grey `#D8D8D8` on the
night bands. What's new is the ground: bone paper `#ede8de`. On paper, accent text is solid copper,
because gold is unreadable on a light background; on night it is gold or the full gradient.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase · Resend · Vercel

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

## Shared with V1

Content, forms, data and SEO are V1's, unchanged: `content/*.ts`, `app/actions.ts`, `lib/*`,
`supabase/schema.sql`. Nothing is invented: every word, quote, testimony and date comes from the
Apostle's own channels, and items the office still has to confirm show a dashed **"To confirm"**
marker (`NEXT_PUBLIC_SHOW_PENDING=false` hides them). V1's README covers forms, Supabase, SEO and
redirects. All of that applies here as-is.

Display-only differences: YouTube titles are cleaned for the page by `displayTitle()` in
`lib/youtube.ts`. It drops the repeated "Apostle Arome Osayi" and date segments and fixes ALL CAPS.
It never changes words; JSON-LD keeps the full title.

## Footage

| File | What | Source |
|---|---|---|
| `hero*`, `invite*` | V1's reels, cut from the Apostle's own messages | "Spirit Migration", "Obeying God's Marching Orders" |
| `v-hall`, `v-choir`, `v-faces`, `v-light`, `v-petals` | 16:9 panel loops (page-header bands, the partner door) | Marching Orders Conference (YouTube `YrxzqftWxIg`) |
| `v-apostle` | 4:5 portrait of the Apostle | same |
| `p-*` | 400×160 pills that sit inside sentences | same |

**Preview only:** replace with original b-roll from Voice of One TV before launch (sharper, and
cleared for use). Put the source clips in `footage/` (gitignored), keep the filenames and run
`scripts/render-footage.sh` (needs ffmpeg). The crops in the script clear the conference logo and
banner burned into the source.

## Where to change things

- Links, socials, contact → `content/site.ts`
- Books → `content/books.ts`
- Bio, timeline, quotes, ministries, page copy → `content/words.ts`
- Playlists, testimonies, gallery, giving regions → `content/media.ts`
- Colours, type, motion → `app/globals.css`
- Which pill sits after which phrase in the mandate → `components/home/Mandate.tsx`
- Where each timeline mark sits on the voice line → `STOPS` in `components/home/VoiceLine.tsx`
