'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="pixel-text text-primary text-xl sm:text-2xl" style={{
              textShadow: `
                0 0 5px var(--primary),
                0 0 10px var(--primary),
                0 0 15px var(--primary)
              `,
              animation: 'neon-glow 2s ease-in-out infinite alternate'
            }}>
              $SMOL1
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`pixel-text text-sm transition-colors duration-200 ${
                pathname === '/'
                  ? 'text-primary neon-glow'
                  : 'text-white hover:text-primary'
              }`}
            >
              HOME
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
