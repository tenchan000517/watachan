'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, ChevronDown } from 'lucide-react';

const ContactForm = dynamic(() => import('@/app/components/ContactForm'), { ssr: false });
const ReserveForm = dynamic(() => import('@/app/components/ReserveForm'), { ssr: false });

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

const NavButton = ({ section, children, icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#5A73A3] hover:bg-[#4D6696] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 min-w-[150px] text-xs md:text-sm transition-colors duration-300"
    onClick={() => onClick(section)}
  >
    <span className="flex items-center justify-center">
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      <ChevronDown className="ml-2" />
    </span>
  </motion.button>
);

const PhoneButton = () => (
  <motion.a
    href="tel:080-5291-4963"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block text-center mb-8 w-[150px]"
  >
    <span className="flex items-center justify-center">
      <Phone className="mr-2" />
      電話する
    </span>
  </motion.a>
);

export default function ContactPage() {
  const searchParams = useSearchParams();
  const contactRef = useRef(null);
  const reserveRef = useRef(null);

  const scrollToSection = (section) => {
    const targetRef = section === 'contact' ? contactRef : reserveRef;
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setTimeout(() => scrollToSection(section), 100);
    }
  }, [searchParams]);

  const handleNavClick = (section) => {
    scrollToSection(section);
  };

  return (
    <div className="pt-[calc(25vw+4rem)] md:pt-[calc(10vw+6rem)] py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 relative inline-block">
            お問い合わせ / 予約
            <span className="absolute top-[-0.5em] left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-green-600 opacity-20 whitespace-nowrap">
              Contact
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="flex justify-center mb-2">
          <PhoneButton />
        </AnimatedSection>
        
        <AnimatedSection className="flex justify-center mb-12">
          <NavButton section="contact" onClick={handleNavClick} icon={<Mail />}>
            お問い合わせ
          </NavButton>
          <NavButton section="reserve" onClick={handleNavClick} icon={<Mail />}>
            来店予約
          </NavButton>
        </AnimatedSection>

        <AnimatedSection>
          <div id="contact" className="absolute top-[-190px]" />
          <div ref={contactRef} className="scroll-mt-[90px] text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">お問い合わせフォーム</h3>
            <ContactForm />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div id="reserve" className="absolute top-[-190px]" />
          <div ref={reserveRef} className="scroll-mt-[100px] text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">予約フォーム</h3>
            <ReserveForm />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}