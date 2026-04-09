'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Core: animates selected elements inside a container ref.
 * Uses fromTo with immediateRender:false so elements stay VISIBLE
 * until the ScrollTrigger fires. Reverses when scrolling back up.
 */
export function useScrollAnim(containerRef, selector, fromVars, toVars = {}, options = {}) {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef?.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (!targets.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                { ...fromVars, immediateRender: false },   // ← key fix: don't hide until trigger fires
                {
                    ...toVars,
                    immediateRender: false,
                    stagger: options.stagger ?? 0.1,
                    duration: options.duration ?? 0.8,
                    ease: options.ease ?? 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: options.start ?? 'top 88%',
                        end: options.end ?? 'top 25%',
                        toggleActions: 'play reverse play reverse',   // ← reverses on scroll-up
                        ...options.scrollTrigger,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);
}

/**
 * Staggered children animation — also reverses on scroll-up.
 */
export function useStaggerAnim(containerRef, selector, options = {}) {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef?.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (!targets.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                {
                    opacity: 0,
                    y: options.y ?? 50,
                    x: options.x ?? 0,
                    scale: options.scale ?? 1,
                    immediateRender: false,   // ← key fix
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    immediateRender: false,
                    stagger: options.stagger ?? 0.12,
                    duration: options.duration ?? 0.75,
                    ease: options.ease ?? 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: options.start ?? 'top 88%',
                        end: options.end ?? 'top 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);
}

/**
 * Scrub-based timeline that naturally reverses as you scroll back up.
 */
export function useScrubAnim(containerRef, selector, options = {}) {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef?.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (!targets.length) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: options.start ?? 'top bottom',
                    end: options.end ?? 'bottom top',
                    scrub: options.scrub ?? 1.5,
                },
            });

            tl.fromTo(
                targets,
                { opacity: 0, y: options.y ?? 60, immediateRender: false, ...options.from },
                { opacity: 1, y: 0, ease: 'none', stagger: 0.06, ...options.to }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);
}
