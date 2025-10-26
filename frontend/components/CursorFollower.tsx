"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-purple-500 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Cursor glow effect */}
      <div
        ref={cursorGlowRef}
        className="fixed w-8 h-8 bg-purple-400/30 rounded-full pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 blur-md transition-all duration-300 ease-out"
        style={{ willChange: "transform" }}
      />
    </>
  );
}