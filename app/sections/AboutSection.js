'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useStaggerAnim, useScrollAnim } from '../lib/useScrollAnim';

const AboutScene = dynamic(() => import('../components/AboutScene'), { ssr: false });

export default function AboutSection() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useScrollAnim(
        sectionRef,
        '.about-3d',
        { opacity: 0, x: -80, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1 }
    );

    useScrollAnim(
        textRef,
        '.section-label, .section-title, .about-text p',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0 },
        { stagger: 0.15, duration: 0.8 }
    );

    useStaggerAnim(textRef, '.stat-card', { y: 40, stagger: 0.15 });

    return (
        <section className="section" id="about" ref={sectionRef}>
            {/* Background glow */}
            <div
                className="glow-blob"
                style={{
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent 70%)',
                    top: '20%',
                    right: '0',
                }}
            />

            <div className="about-section">
                {/* 3D Scene */}
                <div className="about-3d">
                    <AboutScene />
                </div>

                {/* Text */}
                <div ref={textRef}>
                    <div className="section-label">About Me</div>
                    <h2 className="section-title">
                        Building Digital <em>Experiences</em>
                    </h2>

                    <div className="about-text">
                        <p>
                            I'm <strong style={{ color: 'var(--text-primary)' }}>Arsalan Durrani</strong>, a
                            Full-Stack Developer based in Quetta, Pakistan. I build production-ready SaaS
                            platforms, SEO-ranked web projects, and immersive 3D animated websites.
                        </p>
                        <p>
                            Strong in Next.js, the MERN stack, and modern animation tools like Three.js and GSAP.
                            I'm deeply focused on performance, scalability, and creating real business impact
                            through code.
                        </p>
                        <p>
                            From architecting backend APIs to crafting pixel-perfect interactive frontends, I
                            bring a full-stack perspective to every project I build.
                        </p>
                    </div>

                    <div className="about-stats">
                        <div className="stat-card">
                            <span className="stat-num">3+</span>
                            <span className="stat-label">Years Coding</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-num">10+</span>
                            <span className="stat-label">Projects Built</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-num">2</span>
                            <span className="stat-label">SaaS Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
