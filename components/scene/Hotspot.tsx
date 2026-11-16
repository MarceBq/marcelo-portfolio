"use client";

import { useId, useRef, type CSSProperties, type ReactNode } from "react";

interface HotspotProps {
  /** Short name shown on hover and focus; also the button's accessible name. */
  name: string;
  /** Title of the window that opens. */
  title: string;
  /** The sprite to click, rendered on the server and passed in. */
  sprite: ReactNode;
  /** Window content, also server-rendered. */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A clickable body in the sky (the moon, a planet) and the retro window it
 * opens. The window is a native modal <dialog>, so focus is trapped inside it,
 * Escape closes it and focus returns to the sprite, with no extra script.
 */
export default function Hotspot({ name, title, sprite, children, className = "", style }: HotspotProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className={`hotspot ${className}`}
        style={style}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        {sprite}
        <span className="hotspot-label label">{name}</span>
      </button>

      <dialog
        ref={dialog}
        className="px-dialog"
        aria-labelledby={titleId}
        onClick={(e) => {
          // A click on the dialog element itself is a click on the backdrop;
          // an in-page link inside the window should also dismiss it.
          const target = e.target as HTMLElement;
          if (target === dialog.current || target.closest('a[href^="#"]')) close();
        }}
      >
        <div className="px-box">
          <div className="px-titlebar">
            <span className="bg-amber h-u2 w-u2 shrink-0" aria-hidden />
            <h2 id={titleId} className="flex-1">
              {title}
            </h2>
            <button type="button" className="px-close" onClick={close}>
              <span className="sr-only">Close</span>
              <svg viewBox="0 0 5 5" aria-hidden className="h-[calc(var(--px)*5)] w-[calc(var(--px)*5)]">
                <path
                  fill="currentColor"
                  d="M0 0h1v1h-1zM4 0h1v1h-1zM1 1h1v1h-1zM3 1h1v1h-1zM2 2h1v1h-1zM1 3h1v1h-1zM3 3h1v1h-1zM0 4h1v1h-1zM4 4h1v1h-1z"
                />
              </svg>
            </button>
          </div>
          <div className="px-dialog-body">{children}</div>
        </div>
      </dialog>
    </>
  );
}
