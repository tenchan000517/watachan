'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AccessInfo = dynamic(() => import('@/app/components/AccessInfo'), {
  ssr: false,
});

const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const AnimatedSection = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-100px 0px',
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

export default function Access() {
  return (
    <AnimatedSection className="pt-[calc(25vw+4rem)] md:pt-[calc(10vw+6rem)] py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 relative inline-block">
            アクセス
            <span className="absolute top-[-0.5em] left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-green-600 opacity-20 whitespace-nowrap">
              Access
            </span>
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <AccessInfo />
        </AnimatedSection>
        <AnimatedSection className="mt-12 max-w-2xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.5641612515473!2d134.35331571521757!3d34.068545980603504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzA2LjgiTiAxMzTCsDIxJzE5LjEiRQ!5e0!3m2!1sja!2sjp!4v1621234567890!5m2!1sja!2sjp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}