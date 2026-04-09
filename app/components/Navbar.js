'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className="nav"
            style={{
                height: '72px',
                background: scrolled
                    ? 'rgba(0,0,0,0.92)'
                    : 'rgba(0,0,0,0.6)',
                boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.05)' : 'none',
            }}
        >
            <Link href="/" className="nav-logo">
                ARS<span>.</span>
            </Link>

            <ul className="nav-links">
                {NAV_LINKS.map((l) => (
                    <li key={l.label}>
                        <a
                            href={l.href}
                            style={{
                                color: active === l.href ? 'var(--text-primary)' : undefined,
                            }}
                            onClick={() => setActive(l.href)}
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>

            <a href="#contact" className="nav-cta">
                Hire Me
            </a>
        </nav>
    );
}
