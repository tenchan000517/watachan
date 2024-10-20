'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const symptoms = [
  {
    category: "女性の病気",
    items: ["生理痛", "産後の不調", "生理不順（生理全般）", "PMS（月経前症候群）", "子宮筋腫", "子宮内膜症", "チョコレート嚢腫", "更年期障害", "ホットフラッシュ"]
  },
  {
    category: "子宝・不妊症",
    items: ["無月経・無排卵", "黄体機能不全", "多嚢胞性卵巣症候群（PCOS）", "高プロラクチン血症", "卵巣の腫れ", "産前産後の不調", "マタニティーブルー", "男性不妊症"]
  },
  {
    category: "皮膚の病気",
    items: ["美肌", "ニキビ", "シミ", "アトピー", "掌蹠膿疱症", "乾燥肌・肌荒れ", "乾癬", "アザ・皮下出血", "肝斑", "ヘルペス", "手汗", "多汗症", "ケロイド"]
  },
  {
    category: "生活習慣病",
    items: ["高血圧", "高脂血症", "動脈硬化", "糖尿病"]
  },
  {
    category: "痛み・しびれ",
    items: ["生理痛・排卵痛", "頭痛", "肩こり", "腰痛", "四十肩", "神経痛", "慢性疼痛", "骨折", "リウマチ", "帯状疱疹による後遺症", "幻肢痛", "骨粗鬆症"]
  },
  {
    category: "体型・代謝",
    items: ["ダイエット", "肥満", "むくみ"]
  },
  {
    category: "胃腸の病気",
    items: ["食欲不振", "げっぷ", "胃もたれ", "胃・十二指腸潰瘍", "腸活・腸内フローラの改善", "おなら", "慢性下痢", "便秘"]
  },
  {
    category: "小児科",
    items: ["夜泣き", "低身長"]
  },
  {
    category: "内科",
    items: ["肝臓疾患", "腎臓疾患"]
  },
  {
    category: "泌尿器",
    items: ["頻尿", "膀胱炎", "前立腺疾患"]
  },
  {
    category: "循環器系",
    items: ["貧血", "血流改善", "動脈硬化", "下肢静脈瘤", "あざ・皮下出血", "低血圧"]
  },
  {
    category: "呼吸器系",
    items: ["カラ咳", "風邪予防", "痰", "のどのつまり（梅核気）"]
  },
  {
    category: "目の症状",
    items: ["眼精疲労", "目の奥の痛み", "ドライアイ", "眩しい"]
  },
  {
    category: "耳・鼻の症状",
    items: ["気管支炎", "めまい", "メニエール病", "耳鳴り", "難聴"]
  },
  {
    category: "口の症状",
    items: ["ドライマウス", "口臭", "口が苦い"]
  },
  {
    category: "メンタル",
    items: ["あがり症", "緊張", "ストレス障害", "やる気が出ない"]
  },
  {
    category: "アレルギー疾患",
    items: ["花粉症", "寒冷蕁麻疹", "喘息"]
  },
  {
    category: "その他",
    items: ["体のメンテナンス", "がんの緩和ケア", "脳の血流障害", "末端冷え性", "冷えのぼせ", "物忘れ", "認知症", "コロナ後遺症", "味覚障害", "嗅覚障害", "倦怠感", "犬・猫の体調相談"]
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

const SymptomCard = ({ category, items, isOpen, toggleOpen }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
    initial={false}
    animate={{ height: isOpen ? 'auto' : '60px' }}
    transition={{ duration: 0.3 }}
  >
    <div
      className="px-4 py-3 bg-green-100 flex justify-between items-center cursor-pointer"
      onClick={toggleOpen}
    >
      <h3 className="text-lg font-semibold">{category}</h3>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </motion.svg>
    </div>
    {isOpen && (
      <motion.ul
        className="px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {items.map((item, index) => (
          <li key={index} className="py-1">{item}</li>
        ))}
      </motion.ul>
    )}
  </motion.div>
);

export default function Symptom() {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <AnimatedSection className="pt-[calc(25vw+4rem)] md:pt-[calc(10vw+6rem)] py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 relative inline-block">
            よくある相談例
            <span className="absolute top-[-0.5em] left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-green-600 opacity-20 whitespace-nowrap">
              Symptom
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {symptoms.map((symptom, index) => (
            <SymptomCard
              key={index}
              category={symptom.category}
              items={symptom.items}
              isOpen={openCategories[symptom.category]}
              toggleOpen={() => toggleCategory(symptom.category)}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}