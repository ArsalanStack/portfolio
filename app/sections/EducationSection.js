'use client';
import { useRef } from 'react';
import { useStaggerAnim, useScrollAnim } from '../lib/useScrollAnim';

const education = [
    {
        date: '2021 – 2023',
        title: 'F.Sc. Pre-Engineering',
        sub: 'Tameer-i-Nau College, Quetta, Pakistan',
        desc: 'Marks: 852 / 1100 (77.5%) — Strong foundation in Mathematics and Sciences.',
    },
    {
        date: '2018 – 2020',
        title: 'Matriculation (Science)',
        sub: 'Qandeel Public High School, Saryab Road, Quetta',
        desc: 'Science stream with Mathematics — built logical thinking and problem-solving skills.',
    },
];

const certs = [
    {
        date: '2025',
        title: 'Mobile Application Development',
        sub: 'CISD Certification',
        desc: 'Comprehensive mobile app development training covering modern frameworks and deployment.',
    },
    {
        date: '2024',
        title: 'Digital Marketing & SEO',
        sub: 'Professional Certification',
        desc: 'Technical SEO, on-page strategies, keyword research, and Google Search optimization.',
    },
    {
        date: '2023',
        title: 'NAVTTC Web Development',
        sub: 'Front-End Track — NAVTTC',
        desc: 'Front-end web development with HTML, CSS, JavaScript, and responsive design.',
    },
];

export default function EducationSection() {
    const eduRef = useRef(null);
    const certsRef = useRef(null);
    const headerRef = useRef(null);

    useScrollAnim(
        headerRef,
        '.section-label, .section-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        { stagger: 0.15 }
    );

    useStaggerAnim(eduRef, '.timeline-item', { y: 40, stagger: 0.18 });
    useStaggerAnim(certsRef, '.timeline-item', { y: 40, stagger: 0.18 });

    return (
        <section className="section edu-section" id="education">
            <div
                className="glow-blob"
                style={{
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06), transparent 70%)',
                    top: '0',
                    left: '0',
                }}
            />

            <div ref={headerRef}>
                <div className="section-label">Background</div>
                <h2 className="section-title">
                    Education & <em>Credentials</em>
                </h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    marginTop: '2rem',
                }}
            >
                {/* Education */}
                <div>
                    <h3
                        style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-primary)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        Education
                    </h3>
                    <div className="timeline" ref={eduRef}>
                        {education.map((e, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-date">{e.date}</div>
                                <div className="timeline-title">{e.title}</div>
                                <div className="timeline-sub">{e.sub}</div>
                                <div className="timeline-desc">{e.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h3
                        style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-primary)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        Certifications
                    </h3>
                    <div className="timeline" ref={certsRef}>
                        {certs.map((c, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-date">{c.date}</div>
                                <div className="timeline-title">{c.title}</div>
                                <div className="timeline-sub">{c.sub}</div>
                                <div className="timeline-desc">{c.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
