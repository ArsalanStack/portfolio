'use client';
// Direct import — no dynamic() needed.
// LenisProvider uses useEffect so it naturally only runs client-side.
import LenisProvider from './LenisProvider';

export default function ClientProviders({ children }) {
    return <LenisProvider>{children}</LenisProvider>;
}
