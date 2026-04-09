'use client';
import { useRef } from 'react';
import { useStaggerAnim, useScrollAnim } from '../lib/useScrollAnim';

const projects = [
    {
        num: '01',
        name: 'ArzunoCV',
        tagline: 'Resume Builder SaaS',
        url: 'https://arzunocv.site',
        tags: ['SaaS', 'Next.js', 'MongoDB', 'JWT', 'Full-Stack'],
        desc: 'Full-stack SaaS platform allowing users to create and manage professional resumes online with dynamic generation, secure auth, and scalable backend APIs.',
        gradient: 'linear-gradient(135deg, #1a0a2e 0%, #0f0a1f 60%, #0d0420 100%)',
        accentColor: '#a855f7',
    },
    {
        num: '02',
        name: 'TrueQuetta',
        tagline: 'Quetta Digital Hub',
        url: 'https://truequetta.com',
        tags: ['SEO', 'Business Directory', 'Performance', 'Site Architecture'],
        desc: 'Quetta-based business directory platform focused on organic search growth. Ranked for multiple local keywords using technical + on-page SEO strategies.',
        gradient: 'linear-gradient(135deg, #0a1a0d 0%, #060e0a 60%, #030a05 100%)',
        accentColor: '#22c55e',
    },
    {
        num: '03',
        name: 'ArzunoApple',
        tagline: '3D Animated Experience',
        url: 'https://arzunoapple.vercel.app',
        tags: ['Three.js', 'GSAP', 'React', '3D', 'Animation'],
        desc: 'Visually immersive, high-performance Apple-inspired 3D website with interactive scenes and scroll-based animations using Three.js and GSAP.',
        gradient: 'linear-gradient(135deg, #0f0f17 0%, #08080f 60%, #060612 100%)',
        accentColor: '#c084fc',
    },
    {
        num: '04',
        name: 'ArzunoCocktails',
        tagline: '3D Interactive Site',
        url: 'https://arzuno-cocktails.vercel.app',
        tags: ['Three.js', 'GSAP', 'Next.js', 'ScrollTrigger', '3D'],
        desc: 'Visually stunning cocktail showcase with immersive 3D scenes, smooth scroll-based animations, and responsive layouts. Balancing advanced visuals with frontend performance.',
        gradient: 'linear-gradient(135deg, #1a0808 0%, #0f0404 60%, #100005 100%)',
        accentColor: '#f59e0b',
    },
];

export default function ProjectsSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useScrollAnim(
        headerRef,
        '.section-label, .section-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        { stagger: 0.15, duration: 0.7 }
    );

    useStaggerAnim(gridRef, '.project-card', { y: 80, stagger: 0.15 });

    return (
        <section className="section projects-section" id="projects">
            <div
                className="glow-blob"
                style={{
                    width: 600,
                    height: 600,
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.07), transparent 70%)',
                    top: '0',
                    right: '-10%',
                }}
            />

            <div className="projects-header" ref={headerRef}>
                <div>
                    <div className="section-label">Portfolio</div>
                    <h2 className="section-title">
                        Selected <em>Projects</em>
                    </h2>
                </div>
                <a
                    href="https://github.com/ArsalanStack"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.7rem 1.5rem' }}
                >
                    View All on GitHub →
                </a>
            </div>

            <div className="projects-grid" ref={gridRef}>
                {projects.map((p) => (
                    <div className="project-card" key={p.num}>
                        <div
                            className="project-img"
                            style={{ background: p.gradient }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span
                                    className="project-num"
                                    style={{
                                        color: p.accentColor,
                                        opacity: 0.18,
                                        fontFamily: 'Syne, sans-serif',
                                        fontSize: '5rem',
                                        fontWeight: 800,
                                    }}
                                >
                                    {p.num}
                                </span>
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    left: '1.2rem',
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: p.accentColor,
                                    boxShadow: `0 0 12px ${p.accentColor}`,
                                }}
                            />
                            <div className="project-img-overlay" />
                        </div>
                        <div className="project-body">
                            <div className="project-tags-row">
                                {p.tags.map((t) => (
                                    <span className="project-tag" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="project-name">{p.name} — {p.tagline}</div>
                            <p className="project-desc">{p.desc}</p>
                            <div className="project-links">
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="project-link"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    Live Site
                                </a>
                                <a
                                    href="https://github.com/ArsalanStack"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="project-link"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    Source
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
