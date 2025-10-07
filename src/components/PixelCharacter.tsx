'use client';

interface PixelCharacterProps {
  className?: string;
  animation?: 'bounce' | 'walk' | 'float';
  delay?: number;
}

export default function PixelCharacter({ 
  className = '', 
  animation = 'bounce',
  delay = 0 
}: PixelCharacterProps) {
  const animationClass = {
    bounce: 'pixel-bounce',
    walk: 'pixel-walk',
    float: 'pixel-float'
  }[animation];

  return (
    <div 
      className={`${animationClass} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="drop-shadow-lg"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Body */}
        <rect x="24" y="32" width="16" height="20" fill="#FA8947" />
        
        {/* Head */}
        <rect x="20" y="16" width="24" height="20" fill="#FFD93D" />
        
        {/* Eyes */}
        <rect x="24" y="24" width="4" height="4" fill="#000" />
        <rect x="36" y="24" width="4" height="4" fill="#000" />
        
        {/* Mouth */}
        <rect x="28" y="32" width="8" height="2" fill="#000" />
        
        {/* Arms */}
        <rect x="16" y="36" width="8" height="12" fill="#FFD93D" />
        <rect x="40" y="36" width="8" height="12" fill="#FFD93D" />
        
        {/* Legs */}
        <rect x="24" y="52" width="6" height="8" fill="#2C3E50" />
        <rect x="34" y="52" width="6" height="8" fill="#2C3E50" />
        
        {/* Hat */}
        <rect x="18" y="12" width="28" height="8" fill="#E74C3C" />
        <rect x="22" y="8" width="20" height="4" fill="#E74C3C" />
      </svg>
    </div>
  );
}
