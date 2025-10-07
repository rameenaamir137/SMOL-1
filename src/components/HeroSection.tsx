'use client';

import PixelCharacter from './PixelCharacter';

export default function HeroSection() {

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      {/* Grid background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Background Characters */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Walking characters */}
        <div className="absolute top-1/4 left-0">
          <PixelCharacter animation="walk" delay={0} />
        </div>
        <div className="absolute top-1/3 left-0">
          <PixelCharacter animation="walk" delay={2} />
        </div>
        <div className="absolute top-1/2 left-0">
          <PixelCharacter animation="walk" delay={4} />
        </div>
        
        {/* Floating characters */}
        <div className="absolute top-1/6 right-1/4">
          <PixelCharacter animation="float" delay={1} />
        </div>
        <div className="absolute top-2/3 right-1/3">
          <PixelCharacter animation="float" delay={3} />
        </div>
        
        {/* Bouncing characters */}
        <div className="absolute top-1/5 left-1/4">
          <PixelCharacter animation="bounce" delay={0.5} />
        </div>
        <div className="absolute top-3/4 left-1/3">
          <PixelCharacter animation="bounce" delay={2.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="pixel-text text-4xl sm:text-6xl lg:text-8xl text-white mb-8 leading-tight" style={{
            textShadow: `
              0 0 5px var(--primary),
              0 0 10px var(--primary),
              0 0 15px var(--primary),
              0 0 20px var(--primary),
              0 0 35px var(--primary),
              0 0 40px var(--primary)
            `,
            animation: 'neon-glow 2s ease-in-out infinite alternate'
          }}>
            $SMOL1
          </h1>
          
          {/* Tagline */}
          <div className="pixel-text-alt text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            <p className="mb-4">
              <span className="neon-green" style={{
                textShadow: '0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent)'
              }}>FROM SABOTAGE TO SUPERNOVA</span>
            </p>
            <p className="pixel-flicker" style={{
              textShadow: '0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary)'
            }}>
              $SMOL1 RISES!
            </p>
          </div>
          
          {/* Subtitle */}
          <p className="pixel-text text-sm sm:text-base text-white/80 mb-12 max-w-3xl mx-auto">
            Transform your profile picture into a retro pixel art masterpiece. 
            Join the smol community and create your unique digital identity.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <a
              href="#generator"
              className="pixel-button hover:neon-glow"
              style={{
                boxShadow: '0 0 20px var(--primary), inset 0 0 20px rgba(255, 117, 24, 0.1)'
              }}
            >
              GENERATE SMOL PFP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
