"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let frame = 0;

    function handlePointerMove(event: PointerEvent) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      className="cursor-glow"
      style={
        {
          "--cursor-x": `${position.x}px`,
          "--cursor-y": `${position.y}px`
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}
