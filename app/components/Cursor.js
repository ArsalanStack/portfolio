'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const hovered = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      hovered.current = true;
      ring.classList.add('hovered');
      dot.style.opacity = '0';
    };

    const onLeave = () => {
      hovered.current = false;
      ring.classList.remove('hovered');
      dot.style.opacity = '1';
    };

    const tick = () => {
      // Dot snaps instantly
      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;

      // Ring follows with lerp
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    tick();

    // Attach hover listeners
    const addListeners = () => {
      const els = document.querySelectorAll('a, button, .project-card, .skill-category, .nav-cta, input, textarea');
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Run once and again after a short delay (for dynamically rendered elements)
    addListeners();
    const timer = setTimeout(addListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
