// Hero reel (public/video/hero*.{webm,mp4}, 16.9s loop). Each shot is cut from a sermon on the
// Apostle's channel; `until` is where the shot ends in the loop, `start` is the second in the
// source video, so "Watch this moment" opens the message exactly where the footage came from.
// Preview footage — replace with original b-roll from Voice of One TV before launch.
const SPIRIT_MIGRATION = { id: "KKWNt5E49xo", title: "Spirit Migration" };
const MARCHING_ORDERS = { id: "km5HWqG5U_s", title: "Obeying God's Marching Orders" };
export const heroScenes = [
  { until: 2.65, ...SPIRIT_MIGRATION, start: 445 },
  { until: 5.35, ...MARCHING_ORDERS, start: 7023 },
  { until: 8.15, ...MARCHING_ORDERS, start: 4488 },
  { until: 11.05, ...SPIRIT_MIGRATION, start: 6143 },
  { until: 13.85, ...MARCHING_ORDERS, start: 7007 },
  { until: 99, ...MARCHING_ORDERS, start: 7028 },
];

// Curated series from the YouTube channel (playlist IDs verified Nov 2026).
// Order is a proposal — the Apostle's team confirms which 6–8 to feature (PRD §6.3).

export type Series = { id: string; title: string; note?: string };

export const featuredSeries: Series[] = [
  { id: "PLIV3hlanNdQY", title: "Marching Orders Conference" },
  { id: "PL5LRQf8qfkyuSNoLlRmWBvo6rNhAt-O7N", title: "IEC 2026: Prophets and Prophecies" },
  { id: "PLCAG25ig2Zmc", title: "The Chadash Experience" },
  { id: "PL5LRQf8qfkyuifpsZTGWCoB7074DXONXm", title: "Behold the Man" },
  { id: "PL5LRQf8qfkyvZQrVW595ZWmlTkt6B4u4K", title: "Gifts of Prophecy" },
  {
    id: "PL5LRQf8qfkysufP22CTMLSEfMYqG_XFIf",
    title: "40 Days Fasting and Prayer 2026",
    note: "Combating Witchcraft",
  },
  { id: "PL5LRQf8qfkystOS4tiynxFhOEdUwQ40IV", title: "The Call" },
  { id: "PLIqg1u-DdC_M", title: "Spiritual Capital" },
];

export const conferenceSeries: Series[] = [
  { id: "PL5LRQf8qfkyuZO3uwty-gCvYK1gTJO47V", title: "USA Apostolic Invasion 2025" },
  { id: "PL5LRQf8qfkytSx93qyE_yeGTcIbPrNFEO", title: "Minnesota Apostolic Conference" },
  { id: "PLMofpWxp-WYM", title: "Chadash Midwest Experience" },
  { id: "PLG4IJzIrXYRU", title: "Divine Visitation Series, Houston" },
  { id: "PL5LRQf8qfkytW4gNaFq_X2UyXg-hvw1X_", title: "Sokoto Great Gospel Crusade" },
  { id: "PLDu1fj2UVpZM", title: "CMFI Maryland" },
];

// Real photographs from past meetings (current aromeosayi.org itinerary gallery).
const galleryDims: Record<number, [number, number]> = { 5: [1024, 684], 12: [1359, 1284], 13: [1440, 958], 14: [1440, 958], 15: [1600, 1184], 16: [1440, 960] };
export const gallery = Array.from({ length: 16 }, (_, i) => {
  const [width, height] = galleryDims[i + 1] ?? [1600, 1066];
  return {
    src: `/images/gallery/meeting-${i + 1}.jpg`,
    alt: "Photograph from a past meeting with Apostle Arome Osayi",
    width,
    height,
  };
});

export const testimonies = [
  {
    name: "Emmanuel",
    location: "Midlands",
    body: "I was owing over £30,000, that's two separate debts. So last year during the fast on the 30th January, 2023, Day 22, Apostle prayed for a woman and people who were in debt and I joined my less than mustard seed-sized faith. To my amazement I had a text the next week that my debt has been wiped off. The other one too was cancelled by the grace of God. I give glory and honour to Jesus Christ my Lord and Saviour, Amen.",
  },
  {
    name: "Ntokozo Rivombo",
    location: "Johannesburg, South Africa",
    body: "During this fast, I saw Apostle in my dream asking me what the Lord had done for me. I told him I had been delivered from the altar of my father's house that doesn't allow anyone to marry. He said it was big, and I heard it was permanent. Since then I have never been molested in my dreams, completely free. I have started seeing dreams signifying breakthrough and complete possibility of marrying since then.",
  },
  {
    name: "Monica",
    location: "West Yorkshire, UK",
    body: "I was feeling sick yesterday morning, I just managed it and continued with fasting. When the program started, I joined in the opening prayer and I told God that I can't be fasting and falling sick at the same time, so I rejected the symptoms of sickness. After the prayer session and worship, I began to feel better; before Apostle finished teaching I became completely well. I woke up this morning like nothing of such happened yesterday. I have come to say thank you Lord and I ask for great grace throughout this season and beyond.",
  },
  {
    name: "Andrea",
    location: "South Africa",
    body: "God answered by earthquake. After Apostle Osayi taught on how God answers, I prayed for God to answer by earthquake and uncover any issues in my foundation. The Holy Spirit revealed to me that I had been ungrateful to my mother. When I was young, she left home in search of greener pastures. I felt hurt and abandoned by her. My mother had sacrificed so much for me and I couldn't see it or appreciate it. I apologized to her and asked her to forgive me last week. God has restored my mother to me and me to my mother.",
  },
  {
    name: "Beauty Chabu",
    location: "Zambia",
    body: "I have a lot of issues: marital, medical and family. However, one day during this program of prayers, I saw the man of God in my dream. When I saw him I was very happy and I knew it was the end of my suffering. But when I wanted to start narrating my issues, the man of God refused me and said, I'll just pray with you so that I can agree with you in spirit. Secondly, listen to my sermons. Seeing the man of God in my dream giving me instructions is testimony enough.",
  },
  {
    name: "Sunny Iseghohimen",
    location: "United Kingdom",
    body: "Three weeks ago I woke up with pains on my thigh. After three days I discovered I had scratches like two claw marks on both thighs and on my scapula. When I saw it, I laughed and said I love feedback. It means my prayer is striking a chord in the realm of the spirit, so I press on. I got to understand yesterday that feedback isn't always positive; sometimes it is negative and it shows progress. God helps me. Grace after grace.",
  },
  {
    name: "Ese",
    location: "Liverpool",
    body: "I had a dream on the 37th night of the fasting. I saw myself alongside some other people in what seemed like a kidnappers' den. After a while of struggling, a friend of mine came to help me escape, took me to a fine house and asked me to take a good bath. While I was scrubbing my body from head to toe, I could hear people outside trying to get into the house to take us back, but my friend called the police and the people outside ran away immediately. I finished bathing and woke up.",
  },
];

// Regions shown on /partner. Account details live here (not in components) so they can change.
// All marked pending until the Apostle's office confirms what to publish (PRD §6.7).
export const givingRegions = [
  { id: "nigeria", label: "Nigeria", methods: [] as { label: string; value: string }[] },
  { id: "usa", label: "United States", methods: [] as { label: string; value: string }[] },
  { id: "canada", label: "Canada", methods: [] as { label: string; value: string }[] },
  { id: "uk-europe", label: "UK & Europe", methods: [] as { label: string; value: string }[] },
];
