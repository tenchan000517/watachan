'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // イージング関数の調整
      },
    },
  };

  const AnimatedSection = ({ children, id, className }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2, // しきい値を下げて、要素がより画面に入ってからアニメーションを開始
      rootMargin: '-100px 0px', // 追加のマージンを設定して、アニメーション開始タイミングを微調整
    });

    return (
      <motion.section
        ref={ref}
        id={id}
        className={className}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <main className="overflow-hidden md:overflow-visible">
      <AnimatedSection id="about-top" className="pt-[calc(20vw+8vw)] md:pt-[calc(10vw+8vw)] pb-[8vw]">
      <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 relative inline-block">
                薬局について
                <span className="absolute top-[-0.5em] left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-Gray-50 opacity-10 whitespace-nowrap">
                A<span className="text-[0.65em]">bout</span>
                </span>
            </h2>
            </div>

      <div className="contents-in about-in w-[90%] mx-auto my-[1vw] md:flex md:justify-between md:items-start md:w-[max(80%,705px)]">
        <div className="aboutfv_img md:w-[48%] mb-6 md:mb-0">
          <Image 
            src="/img/about-top.png" 
            alt="About top" 
            width={500} 
            height={300} 
            className="w-full h-auto"
          />
        </div>

            <div className="md:w-[48%]">
            <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8]">
                ワタナベ薬局は1986年の創業以来、地域の方々の健康を第一に考え、中医学をベースにした質の高い漢方薬を提供しています。<br />
                自然の恵みを活かした漢方薬は、体の不調を根本から改善し、より質の高い生活を実現する手助けをします。
                <br />当薬局では、中医学に基づくアドバイスと、体質や症状に合わせた最適な漢方薬の選定を心がけております。<br />
                <br />
                また時代の進行と共に、新しい研究や漢方の知見も進化しています。<br />この変化に対応し、常に最新の情報を取り入れつつ、安全で効果的な製品を提供しています。<br />
                <br />
                ワタナベ薬局は、皆様の健康をサポートし、より良い毎日を送るお手伝いをいたします。
            </p>
            </div>
        </div>
        </AnimatedSection>

        {/* Staff section */}
        <AnimatedSection id="staff" className="bg-[#FFFDFD] py-[8vw]">
        <div className="title-h2 title-h2gr w-[75%] mx-auto">
            <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">スタッフ</h2>
            <p className="text-[#F9F9F9] text-[4.5em]">
            S<span className="text-[0.65em]">taff</span>
            </p>
        </div>
        <div className="contents-in w-[90%] mx-auto my-[1vw] md:w-[max(80%,705px)]">
            {[
            {
                name: "渡部 遼平",
                title: "管理薬剤師 / 国際中医専門員",
                image: "/img/profile01.png",
                description: `明治薬科大学 薬学部を卒業。
        調剤薬局での勤務を経て、イスクラ中医薬研修塾で中医学の基礎を学ぶ。その後、首都医科大学附属北京中医医院で研修を受け、帰国後は都内の漢方薬局に勤務。中国政府認定の国際中医専門員A級を取得。

        30歳でトレーニングの魅力に気づき、アメリカのフィットネスインストラクターの資格を取得。

        これらの経験を活かし、東洋医学を基本としつつ、西洋医学や運動指導も取り入れた、一人ひとりの体質と症状に合わせたオーダーメイドの治療プランを提案しています。`
            },
            {
                name: "渡部 淑子",
                title: "薬剤師 / 看護師 / 保育士",
                image: "/img/profile02.png",
                description: `『毎日楽しく生きること』がモットー。

        薬剤師・看護師・保育士のいままでつちかってきた経験の中からアドバイスいたします。

        趣味はオカリナの演奏。`
            },
            {
                name: "渡部　寧",
                title: "開設者",
                description: `吉野川市鴨島町生まれ。
        日本に中医学が普及し始めた初期に、当時は珍しかった漢方薬局を吉野川市に開業。
        日本中医薬学会四国ブロック会長などを歴任。`
            }
            ].map((staff, index) => (
            <div key={index} className="staff-flex mb-12 md:flex md:justify-between md:items-start">
                <div className="staff-img md:w-[30%] text-center mb-6 md:mb-0">
                {staff.image && (
                    <Image src={staff.image} alt={staff.name} width={200} height={200} className="mx-auto mb-4" />
                )}
                <h3 className="text-[1.25em] font-normal mb-2">{staff.name}</h3>
                <p className="text-[0.875em]">{staff.title}</p>
                </div>
                <div className="staff-flex-p md:w-[65%]">
                <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8] whitespace-pre-line">
                    {staff.description}
                </p>
                </div>
            </div>
            ))}
        </div>
        </AnimatedSection>

        {/* TCM section */}
        <AnimatedSection id="TCM" className="py-[8vw]">
            <div className="title-h2 w-[75%] mx-auto">
                <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">中医学とは</h2>
                <p className="text-[#FFFDFD] text-[4.5em]">
                TCM
                </p>
            </div>
            <div className="contents-in contents-in-flex w-[90%] mx-auto my-[1vw] md:flex md:justify-between md:items-start md:w-[max(80%,705px)]">
                <div className="TCM-left md:w-[48%] mb-8 md:mb-0">
                <p className="text-[clamp(1rem,0.909rem+0.39vw,1.25rem)] font-medium mb-4">
                    古代中国を起源とする自然療法です
                </p>
                <Image 
                    src="/img/fiveelement.png" 
                    alt="Five elements" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto"
                />
                </div>
                <div className="TCM-right md:w-[48%]">
                <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8]">
                    植物や動物、自然現象や季節をヒントに確立された2000年以上の歴史をもつ医学です。<br />
                    <br />
                    基本的な概念は、陰陽理論・五行理論、そして体内の気、血、津液のバランスを考えます。診断方法は、望診（特に舌の観察）、聞診、問診、脈診があり、これらに基づいて個々の体質や不調を判断します。<br />
                    <br />
                    その多くは書物や経験則で伝えられていました。<br />
                    <br />
                    現在では、中西医結合のもと東洋医学と西洋医学の
                    長所を合わせる試みも行われていて、アメリカでの
                    論文発表も頻繁に行われ、中国・日本だけではなく
                    グローバルな治療として世界中に普及しています。
                </p>
                </div>
            </div>
            </AnimatedSection>

            <AnimatedSection id="pre-disease" className="bg-[#FFFDFD] py-[8vw]">
                <div className="title-h2 title-h2gr w-[75%] mx-auto">
                    <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">未病とは</h2>
                    <p className="text-[#F9F9F9] text-[4.5em]">
                    P<span className="text-[0.65em]">re-disease</span>
                    </p>
                </div>
                <div className="contents-in contents-in-flex w-[90%] mx-auto my-[1vw] md:flex md:flex-row-reverse md:justify-between md:items-center md:w-[max(80%,705px)]">
                    <div className="pre-disease-left md:w-[48%] mb-8 md:mb-0">
                    <Image 
                        src="/img/kenkousign.png" 
                        alt="健康サイン" 
                        width={300} 
                        height={300} 
                        className="w-full h-auto"
                    />
                    </div>
                    <div className="pre-disease-right md:w-[48%]">
                    <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8]">
                        未病とは東洋医学における概念で、病気になる前の段階、つまり病気へと進行しつつあるがまだ完全に発症していない状態を指します。<br />
                        この状態では、体に些細な異常が見られるものの、西洋医学で一般的に用いられる検査では異常が見つからないことが多く、『気のせい』と言われる状態です。<br />
                        <br />
                        漢方ではこの『気のせい』を未病とし治療していくことで、病気の発症を防ぐという予防医学のアプローチを重視しています。未病の概念は、「病気になる前に治す」という思想に基づいており、早期の対処によって健康を長期的に維持することを目指しています。<br />
                        <br />
                        ワタナベ薬局では未病状態の患者も体質や生活環境を詳しくお伺いし、個々の状態に合わせた治療法を提案します。
                    </p>
                    </div>
                </div>
                </AnimatedSection>

                <AnimatedSection id="distinction" className="py-[8vw]">
                    <div className="title-h2 w-[75%] mx-auto">
                        <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">調剤薬局と漢方薬局の違い</h2>
                        <p className="text-[#FFFDFD] text-[4.5em]">
                        D<span className="text-[0.65em]">istinction</span>
                        </p>
                    </div>
                    <div className="contents-in contents-in-flex w-[90%] mx-auto my-[1vw] md:flex md:justify-between md:items-start md:w-[max(80%,705px)]">
                        <div className="distinction-left md:w-[48%] mb-8 md:mb-0">
                        <Image 
                            src="/img/HPsiryou.png" 
                            alt="調剤薬局と漢方薬局の違い" 
                            width={300} 
                            height={300} 
                            className="w-full h-auto"
                        />
                        </div>
                        <div className="distinction-right md:w-[48%]">
                        <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8]">
                            調剤薬局と漢方薬局は、提供するサービスと専門性が異なります。<br />
                            <br />
                            調剤薬局は医師の処方箋に基づいて医薬品を患者に提供する場所です。主に西洋医学に基づいた薬が扱われ、薬剤師が薬の効能、副作用、飲み合わせなどを説明し患者の安全確保に努めます。<br />
                            <br />
                            漢方薬局は中国の伝統医学に基づいた自然由来の薬剤を提供します。<br />
                            ここでは身体全体のバランスや生命エネルギーを調整して、病気の予防や未病の治療にも焦点を当てています。漢方薬局では、薬剤師や漢方専門家が患者の体質や症状を詳細に診て、その人に合った漢方薬を選び、生活指導も含めたトータルケアを提供することが一般的です。<br />
                            <br />
                            この違いは医療へのアプローチにも現れています。<br />
                            調剤薬局は症状の緩和と治療に注力するのに対し、漢方薬局は体質改善と病気の根本的な解決を目指します。
                        </p>
                        </div>
                    </div>
                    </AnimatedSection>

                    <AnimatedSection id="quality" className="bg-[#FFFDFD] py-[8vw]">
                        <div className="title-h2 title-h2gr w-[75%] mx-auto">
                            <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">品質の良い商品を</h2>
                            <p className="text-[#F9F9F9] text-[4.5em]">
                            Q<span className="text-[0.65em]">uality</span>
                            </p>
                        </div>
                        <div className="contents-in contents-in-flex w-[90%] mx-auto my-[1vw] md:flex md:flex-row-reverse md:justify-between md:items-center md:w-[max(80%,705px)]">
                            <div className="quality-left md:w-[48%] mb-8 md:mb-0">
                            <Image 
                                src="/img/about-bottom.png" 
                                alt="品質の良い商品" 
                                width={300} 
                                height={300} 
                                className="w-full h-auto"
                            />
                            </div>
                            <div className="quality-right md:w-[48%]">
                            <p className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] leading-[1.8]">
                                創業以来、『手に入る中で最も品質が良いものを』との思いで取り扱い商品を選んでおります。<br />
                                <br />
                                自然の商品なので同じ漢方薬・生薬でも品質の良し悪しで効果の違いはとても大きいです。<br />
                                <br />
                                当薬局は良い効果が早く出るよう品質の良いものを厳選して取り扱っております。
                            </p>
                            </div>
                        </div>
                        </AnimatedSection>
      </main>
  );
}