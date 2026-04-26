'use client';

import React, { useEffect, useRef, useState } from 'react';

export function AutoScale({ children, width = 794, height = 1123, className = '' }: { children: React.ReactNode, width?: number, height?: number, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: containerWidth } = entry.contentRect;
        setScale(containerWidth / width);
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      {/* The inner div must take up exactly the scaled height to push the container's height properly if needed, but since we usually use aspect ratio on the container, we don't strictly need to push height. However, we can use padding-bottom trick or aspect-ratio CSS. */}
      {/* Wait, the container MUST have a height. It's best if it comes from the parent, so we assume the parent has aspect-ratio or fixed height. */}
      {/* Actually, let's make the container set its own height based on the aspect ratio! */}
      <div style={{ paddingBottom: `${(height / width) * 100}%` }}></div>
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          transform: `scale(${scale})` 
        }}
      >
        {children}
      </div>
    </div>
  );
}
