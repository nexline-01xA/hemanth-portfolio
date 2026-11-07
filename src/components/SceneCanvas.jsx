import { useContext, useEffect, useRef } from "react";
import { MotionContext } from "../motion.js";

/** Progressive enhancement: all portfolio content exists independently of WebGL. */
export default function SceneCanvas({ variant = "core", className = "" }) {
  const host = useRef(null);
  const engine = useRef(null);
  const { paused } = useContext(MotionContext);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    engine.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    let cancelled = false;
    let started = false;
    const observer = new IntersectionObserver(async ([entry]) => {
      engine.current?.setVisible(entry.isIntersecting);
      if (!entry.isIntersecting || started) return;
      started = true;
      try {
        const { createScene } = await import("../graphics/scenes.js");
        if (cancelled) return;
        engine.current = createScene(element, variant, pausedRef.current);
        element.dataset.ready = "true";
      } catch {
        element.dataset.fallback = "true";
      }
    }, { rootMargin: "120px" });
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [variant]);

  return <div ref={host} className={`scene-canvas scene-canvas--${variant} ${className}`} aria-hidden="true">
    <div className="scene-fallback"><i /><i /><i /><span /></div>
  </div>;
}
