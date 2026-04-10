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

        // Small delay to ensure Lenis is initialized and ScrollTrigger is synced
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    targets,
                    { ...fromVars, immediateRender: false },
                    {
                        ...toVars,
                        immediateRender: false,
                        stagger: options.stagger ?? 0.1,
                        duration: options.duration ?? 0.8,
                        ease: options.ease ?? 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: options.start ?? 'top 85%',
                            end: options.end ?? 'top 20%',
                            toggleActions: 'play none none reverse',
                            ...options.scrollTrigger,
                        },
                    }
                );
            }, containerRef);

            // Store ctx on the ref so we can clean it up
            containerRef.__gsapCtx = ctx;
        }, 100);

        return () => {
            clearTimeout(timer);
            if (containerRef.__gsapCtx) {
                containerRef.__gsapCtx.revert();
                containerRef.__gsapCtx = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    targets,
                    {
                        opacity: 0,
                        y: options.y ?? 50,
                        x: options.x ?? 0,
                        scale: options.scale ?? 1,
                        immediateRender: false,
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
                            start: options.start ?? 'top 85%',
                            end: options.end ?? 'top 20%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }, containerRef);

            containerRef.__gsapCtxStagger = ctx;
        }, 100);

        return () => {
            clearTimeout(timer);
            if (containerRef.__gsapCtxStagger) {
                containerRef.__gsapCtxStagger.revert();
                containerRef.__gsapCtxStagger = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        const timer = setTimeout(() => {
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

            containerRef.__gsapCtxScrub = ctx;
        }, 100);

        return () => {
            clearTimeout(timer);
            if (containerRef.__gsapCtxScrub) {
                containerRef.__gsapCtxScrub.revert();
                containerRef.__gsapCtxScrub = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
