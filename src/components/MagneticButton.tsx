'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps = {
  href: string;
  className: string;
  children: React.ReactNode;
  download?: boolean;
};

export default function MagneticButton({ href, className, children, download }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: springX, y: springY }}
      className={`${className} relative overflow-hidden`}
    >
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)]" />
    </motion.a>
  );
}
