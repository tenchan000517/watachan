'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WordPressNews from './components/WordPressNews';
import { Phone, Mail, ChevronDown } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const ContactButton = ({ href, icon, children }) => (
    <Link href={href} className="bg-[#22E200] rounded-[7px] text-white block w-full text-center text-[clamp(1.5rem,1.159rem+1.45vw,2.25rem)] py-[2vw] md:flex md:items-center md:py-[0.2em]">
      {icon}
      {children}
    </Link>
  );

  // データ取得をuseEffectで実装（クライアントサイドで実行される）
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://since-around4.com/wp-json/wp/v2/posts?_embed&per_page=5');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    }
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <main className="overflow-hidden md:overflow-visible mt-[20vw] md:mt-0">
      <motion.section 
        id="fv" 
        className="relative h-auto md:h-screen"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1 
          className="hidden md:block absolute left-[8%] top-[70%] -translate-y-1/2 text-[1.5em] leading-[4.4] font-normal z-10"
          variants={{
            visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
          }}
        >
          <motion.span className="block" variants={textAnimation}>自然の力で</motion.span>
          <motion.span className="block" variants={textAnimation}>心と体を</motion.span>
          <motion.span className="block" variants={textAnimation}>もっと健やかに</motion.span>
        </motion.h1>
        <motion.div 
          className="fv_img md:hidden"
          variants={fadeIn}
        >
          <Image 
            src="/img/Top-back.png" 
            alt="Top background" 
            width={1000} 
            height={600} 
            className="w-full h-auto" 
            priority
          />
        </motion.div>
        <motion.div 
          className="hidden md:block h-full w-[85%] ml-auto relative"
          variants={fadeIn}
        >
          <Image 
            src="/img/Top-back.png" 
            alt="Top background" 
            layout="fill"
            objectFit="cover"
            objectPosition="right center"
            priority
          />
        </motion.div>
      </motion.section>

      <AnimatedSection>
        <div id="news" className="absolute top-[-90px]" />
        <div className="relative scroll-mt-[90px]">
          <WordPressNews posts={posts} />
        </div>
      </AnimatedSection>


      <AnimatedSection id="about" className="bg-[#FFFDFD] py-[8vw] overflow-hidden">
        <div className="title-h2 title-h2gr w-[75%] mx-auto">
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">薬局について</h2>
          <p className="text-[#F9F9F9] text-[4.5em]">
            A<span className="text-[0.65em]">bout</span>
          </p>
        </div>
        <div className="contents-in about-flex w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] md:flex md:justify-between md:items-end md:w-[max(80%,705px)]">
          <div className="about-img hidden md:block md:w-[48%]">
            <Image src="/img/about-top.png" alt="薬局について" width={400} height={300} layout="responsive" />
          </div>
          <div className="about-flex-p md:w-[48%]">
            <p>
              1986年創業、吉野川市の漢方相談薬局です<br /><br />お薬の提供だけではなく<br />『お客様の心身の悩みにも耳を傾ける薬局』<br />としてさまざまな病気に対し、東洋医学と西洋医学、双方の視点から的確なアドバイスをいたします。
            </p>
            <div className="more pt-[4vw] flex justify-center md:justify-start">
              <Link href="/about" className="group relative inline-block text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light text-black">
                <span className="relative inline-block">
                  もっと見る
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black transform origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="ModelCasa">
        <div className="py-[8vw] pb-[10vw] md:pb-[2em]">
            <div className="title-h2 w-[75%] mx-auto">
    <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">相談の流れ</h2>
    <p className="text-[#FFFDFD] text-[4.5em]">
      M<span className="text-[0.65em]">odel</span> C<span className="text-[0.65em]">asa</span>
    </p>
  </div>
  <div className="contents-in w-[95%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)]">
    {/* モバイル表示 (1000px以下で表示) */}
    <table className="ModelCasa-table lg:hidden w-full">
      <tbody>
        {[
          { title: '予約', content: 'メール・お電話よりご予約ください' },
          { title: '来局・カウンセリング', content: '初回は問診表をご記入いただきますので、10分前にご来局ください' },
          { title: 'お薬の説明・生活アドバイス', content: 'カウンセリング後、体質にあった薬をお選びします。生活習慣を改善した方が早く効果が出る場合は、生活のアドバイスもさせていただきます' },
          { title: 'お会計・次回予約', content: '症状にもよりますが２〜３週間を目安に来局していただき経過を観察していきます。\n\nお薬を服用中に気になる症状がありましたら、予約前でもお気軽にお問い合わせください' }
        ].map((item, index) => (
          <tr key={index} className="border-l-4 border-[#25190C] flex flex-col mb-4">
            <th className="relative z-10 text-left m-0 ml-[4vw] w-full text-white py-[2vw] px-[8vw] text-[min(4vw,18px)] font-normal overflow-hidden">
              <span className="relative z-10">
                <span className="text-[1.1em] font-bold">・</span>{item.title}
              </span>
              <span className="absolute top-0 left-0 right-0 bottom-0 -z-10 bg-[#25190C] origin-left skew-x-[30deg] transform -translate-x-[10%]"></span>
            </th>
            <td className="p-[3vw] whitespace-pre-line">{item.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    {/* PC表示 (1000px以上で表示) */}
    <div className="case-flex hidden lg:flex lg:justify-between items-stretch">
      {[
        { title: '予約', image: 'flow01.png', content: 'メール・お電話より\nご予約ください' },
        { title: '来局\nカウンセリング', image: 'flow02.png', content: '初回は問診表を\nご記入いただきますので\n10分前にご来局ください' },
        { title: 'お薬の説明\n生活アドバイス', image: 'flow03.png', content: 'カウンセリング後\n体質にあった薬を\nお選びします\n\n生活習慣を改善した方が\n早く効果が出る場合は\n生活のアドバイスも\nさせていただきます' },
        { title: 'お会計\n次回ご予約', image: 'flow04.png', content: '症状にもよりますが\n２〜３週間を目安に\n来局していただき\n経過を観察していきます\n\nお薬を服用中に気になる\n症状がありましたら\n予約前でもお気軽に\nお問い合わせください' }
      ].map((item, index) => (
        <React.Fragment key={index}>
          <div className="case-flex-in border-[3px] border-[#01A73A] p-4 text-center rounded-[20px] w-[23%] flex flex-col h-[600px]">
            <div className="flex flex-col h-1/2">
              <h3 className="text-[1.39em] font-normal text-green-600 whitespace-pre-line mb-2 h-[2.5em] flex items-center justify-center">{item.title}</h3>
              <div className="flex-grow flex items-center justify-center">
                <Image src={`/img/${item.image}`} alt={item.title} width={100} height={100} className="w-[60%] object-contain" />
              </div>
            </div>
            <div className="h-1/2 flex items-center justify-center">
              <p className="text-[0.89em] text-green-600 whitespace-pre-line">{item.content}</p>
            </div>
          </div>
          {index < 3 && (
            <div className="case-arrow w-[1.5%] flex items-center justify-center">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10H38M38 10L30 2M38 10L30 18" stroke="#01A73A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
  </div>
      </AnimatedSection>

      <AnimatedSection id="contact">
      <div className="bg-[#FFFDFD] py-[5vw] pb-[2vw]">
        <div className="title-h2 title-h2gr pl-[1vw] z-10 relative w-[75%] mx-auto">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)] mt-2">お問い合わせ</h2>
          <p className="relative top-[max(-9vw,-51px)] left-0 text-[#F9F9F9] text-[4.5em] -z-10 h-[min(14vw,49px)]">
            C<span className="text-[0.65em]">ontact</span>
          </p>
        </div>

        <div className="contents-in w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)]">
          <p className="md:hidden mb-4">当日、前日のご予約や急ぎの場合はお電話にてご連絡ください<br />24時間以内に返信がない場合は再度ご連絡ください</p>
          <div className="contact-btn-flex flex flex-col items-center w-[95%] mx-auto my-[4vw]">
            <div className="contact-btn w-[47%] mb-4 md:w-[max(27%,325px)] md:mb-16">
              <ContactButton href="tel:080-5291-4963" icon={<Image src="/img/tel.png" alt="電話" width={30} height={30} className="hidden md:block md:w-[2em] md:px-[4%]" />}>
                電話する
              </ContactButton>
            </div>

            <div className="flex justify-between w-full md:justify-center md:gap-4">
              <div className="contact-btn w-[47%] md:w-[max(27%,325px)]">
                <ContactButton href="/contact#contact" icon={<Image src="/img/mail.png" alt="メール" width={30} height={30} className="hidden md:block md:w-[2em] md:px-[4%]" />}>
                  お問い合わせ
                </ContactButton>
                <p className="hidden md:block text-[0.89em] pt-[3em] text-center">
                  24時間以内に返信がない場合は<br />
                  再度ご連絡ください
                </p>
              </div>

              <div className="contact-btn w-[47%] md:w-[max(27%,325px)]">
                <ContactButton href="/contact#reserve" icon={<Image src="/img/mail.png" alt="メール" width={30} height={30} className="hidden md:block md:w-[2em] md:px-[4%]" />}>
                  予約
                </ContactButton>
                <p className="hidden md:block text-[0.89em] pt-[3em] text-center">
                  当日・前日の予約や急ぎのお問い合わせは<br />
                  お電話にてご連絡ください
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>

      <AnimatedSection id="symptoms">
        <div className="py-[8vw]">
          <div className="title-h2 pl-[1vw] z-10 relative w-[75%] mx-auto">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)] mt-2">よくある相談例</h2>
          <p className="relative top-[max(-9vw,-51px)] left-0 text-[#FFFDFD] text-[4.5em] -z-10 h-[min(14vw,49px)]">
          S<span className="text-[0.65em]">ymptoms</span>
          </p>
        </div>
        <div className="contents-in about-flex w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] md:w-[max(80%,705px)]">
          <div className="Symptoms-flex flex flex-wrap justify-between pt-[2vw] md:justify-around">
            {[
              { image: 'ex01.png', title: '皮膚トラブル' },
              { image: 'ex02.png', title: '子宝相談' },
              { image: 'ex03.png', title: '痛み' },
              { image: 'ex04.png', title: '女性の悩み' }
            ].map((item, index) => (
              <div key={index} className="symptoms-contents w-[48%] text-center md:w-[22%] mb-4">
                <Image src={`/img/${item.image}`} alt={item.title} width={200} height={200} className="w-full h-auto" />
                <p className="mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="more pt-[2vw] text-center">
        <Link href="/symptoms" className="group relative inline-block text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light text-black">
                <span className="relative inline-block">
                  もっと見る
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black transform origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
                </span>
              </Link>
        </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="access">
  <div className="bg-[#FFFDFD] py-[8vw]">
    <div className="title-h2 title-h2gr pl-[1vw] z-10 relative w-full md:w-[75%] mx-auto">
      <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)] mt-2">営業時間・アクセス</h2>
      <p className="relative top-[max(-9vw,-51px)] left-0 text-[#F9F9F9] text-[4.5em] -z-10 h-[min(14vw,49px)]">
        A<span className="text-[0.65em]">ccess</span>
      </p>
    </div>
    <div className="contents-in access-in w-[90%] mx-auto mt-[6vw] md:mt-[4vw] text-[clamp(0.875rem,0.7rem+0.73vw,1rem)] md:flex md:justify-center md:items-start md:w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[80%]">
      <div className="access-info md:order-1 md:w-[40%] md:mr-4 mt-4 md:mt-0 bg-white rounded-lg shadow-md p-4 md:h-[clamp(400px,50vw,500px)] flex flex-col justify-center">
        <div className="text-container mx-auto w-full md:w-4/5">
          <Image src="/img/textlogo.png" alt="ワタナべ薬局" width={150} height={37.5} className="hidden md:block md:w-3/4 mx-auto mb-12" />
          <div className="md:hidden">
            <div className="w-[70%] mx-auto">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="font-semibold">〒776-0010</p>
                  <p>徳島県吉野川市鴨島町鴨島216-1</p>
                  <p className="mt-2">鴨島駅より徒歩8分<br />徳島駅より車で40分</p>
                </div>
                <div>
                  <p><span className="font-semibold">Tel:</span> 0883-24-0770</p>
                  <p><span className="font-semibold">営業時間:</span> 10:00〜19:00</p>
                  <p><span className="font-semibold">定休日:</span> 日曜・祝日</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">〒776-0010</p>
                <p>徳島県吉野川市鴨島町鴨島216-1</p>
                <p className="mt-2">鴨島駅より徒歩8分<br />徳島駅より車で40分</p>
              </div>
              <div>
                <p><span className="font-semibold">Tel:</span> 0883-24-0770</p>
                <p><span className="font-semibold">営業時間:</span> 10:00〜19:00</p>
                <p><span className="font-semibold">定休日:</span> 日曜・祝日</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map w-full h-[70vw] md:h-[clamp(400px,50vw,500px)] mt-4 md:mt-0 md:order-2 md:w-[40%] overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0577833124767!2d134.3533357753065!3d34.06803297315102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3553a6d39747f757%3A0x6c986b3a214f59a1!2z44Ov44K_44OK44OZ6Jas5bGA!5e0!3m2!1sja!2sjp!4v1723183014296!5m2!1sja!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</AnimatedSection>
    </main>
  );
}