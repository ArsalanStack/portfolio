import './globals.css';
import ClientProviders from './components/ClientProviders';

export const metadata = {
  title: 'Arsalan Durrani — Full Stack Developer & SaaS Builder',
  description:
    'Full-Stack Developer building production SaaS platforms, SEO-ranked web projects, and immersive 3D animated websites. Expert in Next.js, MERN stack, Three.js and GSAP.',
  keywords: 'Arsalan Durrani, Full Stack Developer, Next.js, React, Three.js, GSAP, SaaS',
  authors: [{ name: 'Arsalan Durrani' }],
  openGraph: {
    title: 'Arsalan Durrani — Full Stack Developer',
    description:
      'Building production SaaS platforms, SEO-ranked web projects, and immersive 3D animated websites.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ClientProviders is a 'use client' component — safe to use dynamic(ssr:false) inside */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
