// All 13 titles, as listed on aaobooks.com and in the author bio there.
// Blurbs are intentionally empty until the aaobooks team supplies approved copy (PRD §6.4).

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  series?: string;
  cover: string;
  blurb?: string;
};

export const books: Book[] = [
  {
    slug: "kingdom-recalibration-1",
    title: "Kingdom Recalibration 1",
    subtitle: "Comparing Everything with the Divine Reference",
    cover: "/images/books/kingdom-recalibration-1.jpg",
  },
  {
    slug: "kingdom-recalibration-2",
    title: "Kingdom Recalibration 2",
    subtitle: "The Execution",
    cover: "/images/books/kingdom-recalibration-2.jpg",
  },
  {
    slug: "kingdom-recalibration-legacy",
    title: "Kingdom Recalibration",
    subtitle: "Legacy Edition",
    cover: "/images/books/kingdom-recalibration-legacy.jpg",
  },
  {
    slug: "godward",
    title: "Godward",
    subtitle: "Finding the True North",
    cover: "/images/books/godward.jpg",
  },
  {
    slug: "the-science-of-altars",
    title: "The Science of Altars",
    series: "Kingdom Advance Series, Book 2",
    cover: "/images/books/science-of-altars.jpg",
  },
  {
    slug: "decimating-demonic-devices",
    title: "Decimating Demonic Devices",
    series: "Kingdom Advance Series, Book 1",
    cover: "/images/books/decimating-demonic-devices.jpg",
  },
  {
    slug: "a-treatise-on-christian-ministry",
    title: "A Treatise on Christian Ministry",
    subtitle: "Making the Most of God's Command, Methods and Resources in Life and Ministry",
    cover: "/images/books/treatise-on-christian-ministry.jpg",
  },
  {
    slug: "the-judgment-seat-of-christ",
    title: "The Judgment Seat of Christ",
    subtitle: "A Solemn Focus",
    cover: "/images/books/judgment-seat-of-christ.jpg",
  },
  {
    slug: "biblical-discourses-on-giving-and-worship",
    title: "Biblical Discourses on Giving & Worship",
    cover: "/images/books/giving-and-worship.jpg",
  },
  {
    slug: "an-epistle-to-the-apostles-in-the-marketplace",
    title: "An Epistle to the Apostles in the Marketplace",
    cover: "/images/books/epistle-to-the-apostles.jpg",
  },
  {
    slug: "go-into-all-the-world",
    title: "Go Into All the World",
    subtitle: "Building Legacies that Will Last the Test of Time",
    cover: "/images/books/go-into-all-the-world.jpg",
  },
  {
    slug: "birthing-his-excellence",
    title: "Birthing His Excellence",
    subtitle: "Creating a Holy Debacle among the Nations",
    cover: "/images/books/birthing-his-excellence.jpg",
  },
  {
    slug: "choice",
    title: "Choice",
    subtitle: "Man's Most Important Power",
    cover: "/images/books/choice.jpg",
  },
];
