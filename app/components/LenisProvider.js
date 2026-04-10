'use client';
import { useEffect } from 'react';

export default function LenisProvider({ children }) {
    useEffect(() => {
        // Only runs in browser — safe for SSR
        let lenis;

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
                // IMPORTANT: disable Lenis' own RAF so we drive it from gsap.ticker
                autoRaf: false,
            });

            // Keep GSAP ScrollTrigger in sync with Lenis scroll events
            lenis.on('scroll', ScrollTrigger.update);

            // Drive Lenis from GSAP's ticker (single RAF loop)
            function onTick(time) {
                lenis.raf(time * 1000); // gsap ticker gives seconds, lenis wants ms
            }

            gsap.ticker.add(onTick);
            gsap.ticker.lagSmoothing(0);

            // Expose lenis globally so ScrollTrigger can use it if needed
            window.__lenis = lenis;

            return () => {
                gsap.ticker.remove(onTick);
            };
        }

        let cleanup;
        init().then((fn) => {
            cleanup = fn;
        });

        return () => {
            if (cleanup) cleanup();
            if (lenis) lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return <>{children}</>;
}
