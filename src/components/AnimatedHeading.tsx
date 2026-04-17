'use client';

import { motion } from 'framer-motion';

type AnimatedHeadingProps = {
  text: string;
  className?: string;
};

export default function AnimatedHeading({ text, className }: AnimatedHeadingProps) {
  const words = text.split(' ');

  return (
    <h2 className={className ?? 'section-heading'}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}
