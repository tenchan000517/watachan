'use client';

import { useState, useEffect } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    question: "保険適用ですか？",
    answer: "保険適用外になります。"
  },
  {
    question: "相談の料金はかかりますか？",
    answer: "商品をお買い上げの方は相談料を無料にさせていただいています。ご購入の予定がなく相談のみですと、30分4,000円となりますので、ご予約の際にその旨をお伝えください。"
  },
  {
    question: "何歳から漢方薬は飲めますか？",
    answer: "乳幼児に飲ませるための漢方薬もございますので、年齢は気にせず、ご相談ください。"
  },
  {
    question: "漢方薬で副作用はおこりますか？",
    answer: "残念ながら副作用がないわけではありません。しかし中医学で漢方の本質を考えることにより一般的な使い方よりも劇的に副作用は減らせると考えております。予想できる副作用はなるべくお伝えしますので安心してお飲みください。"
  },
  {
    question: "漢方薬はどのような症状に効きますか？",
    answer: "婦人科・皮膚病・不妊症を得意としております。また病院では病名がつかないが辛いと来局られる方も多くいらっしゃいます。最近ではあがり症など一般的には病院にかかることはないけど、本人は悩んでいるなどのご相談も多いです。"
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer: "症状・年齢・体格により様々ですが、1日300円〜1000円を目安にしてみてください。目安がわかるものもありますので、ご予約の際に聞いていただいても構いません。"
  },
  {
    question: "遠方ですが電話での相談はできますか？",
    answer: "実際にお会いして診断することによってより正確な診断ができますが、来局が難しい場合はオンラインでも対応しますのでご相談ください。"
  }
];

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
  
  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
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


export default function FAQ() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [openStates, setOpenStates] = useState(faqs.map(() => false));
  
    useEffect(() => {
        const handleResize = () => {
          setIsDesktop(window.innerWidth >= 768);
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        if (isDesktop) {
          setOpenStates(faqs.map(() => true));
        }
      }, [isDesktop]);
    
      const toggleAccordion = (index) => {
        setOpenStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = !newStates[index];
          return newStates;
        });
      };
    
      return (
        <AnimatedSection className="pt-[calc(25vw+4rem)] md:pt-[calc(10vw+6rem)] py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 relative inline-block">
                よくある質問
                <span className="absolute top-[-0.5em] left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-green-600 opacity-20 whitespace-nowrap">
                FAQ
                </span>
            </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Disclosure key={index} as="div" className="mt-4">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="flex justify-between w-full px-4 py-3 text-lg font-medium text-left text-gray-700 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-50"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span>{faq.question}</span>
                        <ChevronDownIcon
                          className={`${
                            openStates[index] ? 'transform rotate-180' : ''
                          } w-5 h-5 text-green-500`}
                        />
                      </Disclosure.Button>
                  <Transition
                    show={isDesktop || openStates[index]}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel static className="px-4 pt-4 pb-2 text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      </AnimatedSection>
  );
}