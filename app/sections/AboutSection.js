'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useStaggerAnim, useScrollAnim } from '../lib/useScrollAnim';

const WorkspaceScene = dynamic(() => import('../components/WorkspaceScene'), { ssr: false });

export default function AboutSection() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useScrollAnim(
        sectionRef,
        '.about-canvas-wrap',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0 },
        { duration: 1.0 }
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
        <section
            className="about-section-root"
            id="about"
            ref={sectionRef}
        >
            {/* Background glow */}
            <div
                className="glow-blob"
                style={{
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(80,100,160,0.12), transparent 70%)',
                    top: '20%',
                    right: '0',
                }}
            />

            {/* Left: Full-height 3D workspace */}
            <div className="about-canvas-wrap">
                <WorkspaceScene />
            </div>

            {/* Right: Text content */}
            <div ref={textRef} className="about-text-col">
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
        </section>
    );
}
