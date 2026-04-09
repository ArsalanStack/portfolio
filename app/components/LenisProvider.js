'use client';
import { useEffect } from 'react';

export default function LenisProvider({ children }) {
    useEffect(() => {
        // Only runs in browser — safe for SSR
        let lenis;
        let rafId;

        async function init() {
            const { default: Lenis } = await import('lenis');
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);

            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
            });

            // Keep GSAP ScrollTrigger in sync with Lenis
            lenis.on('scroll', ScrollTrigger.update);

            const tick = (time) => {
                lenis.raf(time);
                ScrollTrigger.update();
            };

            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
        }

        init();

        return () => {
            if (lenis) lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
