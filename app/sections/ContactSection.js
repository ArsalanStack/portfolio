'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useScrollAnim, useStaggerAnim } from '../lib/useScrollAnim';

const GlobeScene = dynamic(() => import('../components/GlobeScene'), { ssr: false });

export default function ContactSection() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const globeRef = useRef(null);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);

    useScrollAnim(
        formRef,
        '.contact-form-card',
        { opacity: 0, x: -60, immediateRender: false },
        { opacity: 1, x: 0 },
        { duration: 0.9 }
    );

    useScrollAnim(
        globeRef,
        '.globe-wrap',
        { opacity: 0, x: 60, immediateRender: false },
        { opacity: 1, x: 0 },
        { duration: 0.9 }
    );

    const onChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
        }, 1800);
    };

    return (
        <section className="section contact-section" id="contact" ref={sectionRef}>
            {/* Subtle background glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div className="contact-inner" style={{ position: 'relative', zIndex: 1 }}>
                {/* ── Left: Form ── */}
                <div ref={formRef}>
                    <div className="contact-form-card">
                        <div className="contact-top-row">
                            <span className="contact-top-label">Get In Touch</span>
                            <span className="contact-phone">
                                <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 10.81a19.79 19.79 0 01-3.07-8.67A2 2 0 013.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.91a16 16 0 006.17 6.17l1.27-.76a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.42z" />
                                </svg>
                                +92 333 3479586
                            </span>
                        </div>

                        <h2 className="contact-heading">
                            Contact<span>.</span>
                        </h2>

                        {sent ? (
                            <div
                                style={{
                                    padding: '3rem 0',
                                    textAlign: 'center',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'Syne, sans-serif',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                }}
                            >
                                ✅ Message sent! I'll get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="M2 7l10 7 10-7" />
                                            </svg>
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your email"
                                            value={form.email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                        </svg>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Hey Arsalan, let's build something amazing together! 🚀"
                                        value={form.message}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="form-submit"
                                    disabled={sending}
                                >
                                    {sending ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            Send Message
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <line x1="22" y1="2" x2="11" y2="13" />
                                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Contact infos under form */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem',
                                marginTop: '1.5rem',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid var(--border-color)',
                            }}
                        >
                            {[
                                {
                                    icon: '✉',
                                    label: 'arsalancodes596@gmail.com',
                                    href: 'mailto:arsalancodes596@gmail.com',
                                },
                                {
                                    icon: '↗',
                                    label: 'github.com/ArsalanStack',
                                    href: 'https://github.com/ArsalanStack',
                                },
                                {
                                    icon: '↗',
                                    label: 'linkedin.com/in/arsalan-stack',
                                    href: 'https://www.linkedin.com/in/arsalan-stack',
                                },
                            ].map((info) => (
                                <a
                                    key={info.label}
                                    href={info.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.65rem',
                                        textDecoration: 'none',
                                        color: 'var(--text-muted)',
                                        fontFamily: 'Space Mono, monospace',
                                        fontSize: '0.68rem',
                                        letterSpacing: '0.04em',
                                        transition: 'color 0.25s',
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = 'var(--text-primary)')
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.color = 'var(--text-muted)')
                                    }
                                >
                                    <span
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.65rem',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {info.icon}
                                    </span>
                                    {info.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right: Globe floating freely ── */}
                <div
                    ref={globeRef}
                    className="globe-wrap"
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '500px',
                    }}
                >
                    {/* The canvas fills this area — transparent so section bg shows */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '-60px',        /* bleed outside to feel "open" */
                            zIndex: 0,
                        }}
                    >
                        <GlobeScene />
                    </div>

                    {/* Subtle label */}
                    <span
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '0.62rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            zIndex: 2,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Quetta, Pakistan
                    </span>
                </div>
            </div>
        </section>
    );
}
