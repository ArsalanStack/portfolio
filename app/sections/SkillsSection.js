'use client';
import { useRef } from 'react';
import { useStaggerAnim, useScrollAnim } from '../lib/useScrollAnim';

const skillCategories = [
    {
        icon: '⚡',
        title: 'Frontend Development',
        skills: [
            'React.js', 'Next.js', 'JavaScript ES6+', 'TypeScript',
            'HTML5', 'CSS3', 'Three.js', 'GSAP Animations',
            'Responsive Design', 'Zustand', 'clsx',
        ],
    },
    {
        icon: '🛠️',
        title: 'Backend Development',
        skills: [
            'Node.js', 'Express.js', 'RESTful APIs',
            'JWT Authentication', 'Middleware Architecture',
            'Server-Side Validation', 'Scalable API Design',
        ],
    },
    {
        icon: '🗄️',
        title: 'Databases & Storage',
        skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Database Design', 'Optimization', 'Indexing'],
    },
    {
        icon: '🔧',
        title: 'Tools & DevOps',
        skills: [
            'Git & GitHub', 'Postman', 'npm / yarn', 'CLI', 'Vercel',
            'SEO & Performance', 'Full-Stack Architecture', 'Deployment',
        ],
    },
    {
        icon: '🎨',
        title: '3D & Animation',
        skills: ['Three.js', 'GSAP', 'ScrollTrigger', '@react-three/fiber', '@react-three/drei', 'Interactive 3D'],
    },
    {
        icon: '📈',
        title: 'SEO & Growth',
        skills: [
            'On-Page SEO', 'Technical SEO', 'Keyword Research',
            'Site Architecture', 'Performance Optimization',
            'Internal Linking', 'Metadata', 'Google Search',
        ],
    },
];

const techPills = [
    { icon: '⚛️', label: 'React.js' },
    { icon: '▲', label: 'Next.js' },
    { icon: '📦', label: 'Node.js' },
    { icon: '🎯', label: 'TypeScript' },
    { icon: '🌐', label: 'Three.js' },
    { icon: '💚', label: 'MongoDB' },
    { icon: '✨', label: 'GSAP' },
    { icon: '🐘', label: 'PostgreSQL' },
    { icon: '🚀', label: 'Vercel' },
    { icon: '🔐', label: 'JWT Auth' },
    { icon: '⚡', label: 'Express.js' },
    { icon: '🎨', label: 'CSS3' },
];

export default function SkillsSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const marqueeRef = useRef(null);

    useScrollAnim(
        headerRef,
        '.section-label, .section-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        { stagger: 0.15, duration: 0.7 }
    );

    useStaggerAnim(gridRef, '.skill-category', { y: 50, stagger: 0.12 });

    return (
        <>
            <section className="section skills-section" id="skills">
                {/* Glow */}
                <div
                    className="glow-blob"
                    style={{
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent 70%)',
                        bottom: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />

                <div ref={headerRef}>
                    <div className="section-label">Expertise</div>
                    <h2 className="section-title">
                        Technical <em>Skills</em>
                    </h2>
                </div>

                <div className="skills-grid" ref={gridRef}>
                    {skillCategories.map((cat) => (
                        <div className="skill-category" key={cat.title}>
                            <div className="skill-cat-icon">{cat.icon}</div>
                            <div className="skill-cat-title">{cat.title}</div>
                            <div className="skill-tags">
                                {cat.skills.map((s) => (
                                    <span className="skill-tag" key={s}>
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Marquee */}
            <div className="techstack-section" ref={marqueeRef}>
                <p className="marquee-title">— Tech Stack —</p>
                <div className="marquee-wrap" style={{ marginBottom: '1rem' }}>
                    <div className="marquee-track">
                        {[...techPills, ...techPills].map((p, i) => (
                            <div className="tech-pill" key={i}>
                                <span className="tech-pill-icon">{p.icon}</span>
                                {p.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="marquee-wrap">
                    <div className="marquee-track marquee-track-reverse">
                        {[...techPills.slice().reverse(), ...techPills.slice().reverse()].map((p, i) => (
                            <div className="tech-pill" key={i}>
                                <span className="tech-pill-icon">{p.icon}</span>
                                {p.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
