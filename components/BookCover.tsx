import Image from "next/image";
import type { Book } from "@/content/books";

export function BookCover({ book, sizes = "200px", className = "" }: { book: Book; sizes?: string; className?: string }) {
  return (
    <div className={`relative aspect-[2/3] overflow-hidden rounded-[2px] bg-paper-2 shadow-[0_30px_40px_-24px_rgba(22,19,15,.55)] ${className}`}>
      <Image src={book.cover} alt={`Cover of ${book.title} by Arome Osayi`} fill sizes={sizes} className="object-cover" draggable={false} />
      <span aria-hidden className="absolute inset-y-0 left-0 w-[7px] bg-gradient-to-r from-black/30 to-transparent" />
    </div>
  );
}
