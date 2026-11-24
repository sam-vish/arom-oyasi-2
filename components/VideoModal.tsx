"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Ctx = { open: (id: string, title: string, start?: number) => void };
const VideoCtx = createContext<Ctx>({ open: () => {} });
export const useVideoModal = () => useContext(VideoCtx);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<{ id: string; title: string; start?: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string, title: string, start?: number) => {
    returnFocus.current = document.activeElement as HTMLElement;
    setVideo({ id, title, start });
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (video && !d.open) d.showModal();
  }, [video]);

  const close = () => {
    dialog.current?.close();
  };

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        data-lenis-prevent
        onClose={() => {
          setVideo(null);
          returnFocus.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        aria-label={video?.title ?? "Video player"}
        className="m-auto w-[min(1100px,calc(100vw-32px))] overflow-visible bg-transparent p-0 text-bone backdrop:bg-[#110f0d]/90 backdrop:backdrop-blur-sm"
      >
        {video && (
          <div className="relative">
            <div className="mb-3 flex items-start justify-between gap-4">
              <p className="line-clamp-2 text-[15px] font-medium text-bone/90">{video.title}</p>
              <button
                onClick={close}
                autoFocus
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-bone/30 text-bone hover:border-gold hover:text-gold"
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1${video.start ? `&start=${Math.floor(video.start)}` : ""}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${Math.floor(video.start)}s` : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-bone-muted underline-offset-4 hover:text-bone hover:underline"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </dialog>
    </VideoCtx.Provider>
  );
}

/** Any element that opens a video in the modal. Falls back to a YouTube link without JS. */
export function PlayTrigger({
  id,
  title,
  className = "",
  children,
  label,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const { open } = useContext(VideoCtx);
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open(id, title);
      }}
      aria-label={label ?? `Play: ${title}`}
      className={className}
    >
      {children}
    </a>
  );
}
