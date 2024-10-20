'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
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

  return (
    <main className="overflow-hidden md:overflow-visible mt-[20vw] md:mt-0">
      <section id="fv" className="md:bg-[url('/img/Top-back.png')] md:bg-[80%] md:bg-top-right md:bg-no-repeat md:pt-[26vw] md:pb-[8vw] md:-mt-[10em]">
        <h1 className="hidden md:block md:text-[1.5em] md:leading-[4] md:pl-[10%] md:font-normal">
          自然の力で<br />心と体を<br />もっと健やかに
        </h1>
        <div className="fv_img md:hidden">
          <Image src="/img/Top-back.png" alt="Top background" width={1000} height={600} layout="responsive" />
        </div>
      </section>

      <section id="news" className="py-[8vw]">
        <div className="title-h2 pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">お知らせ</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#FFFDFD] text-[3.8em] -z-10 h-[min(14vw,49px)]">
            N<span className="text-[0.65em]">ews</span>
          </p>
        </div>
        <div className="more md:hidden text-center">
          <Link href="#" className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light">もっと見る</Link>
        </div>
      </section>

      <section id="about" className="bg-[#FFFDFD] py-[8vw]">
        <div className="title-h2 title-h2gr pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">薬局について</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#F9F9F9] text-[3.8em] -z-10 h-[min(14vw,49px)]">
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
            <div className="more pt-[4vw]">
              <Link href="/about" className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light">もっと見る</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="ModelCasa" className="py-[8vw] pb-[10vw] md:pb-[2em]">
        <div className="title-h2 pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">相談の流れ</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#FFFDFD] text-[3.8em] -z-10 h-[min(14vw,49px)]">
            M<span className="text-[0.65em]">odel</span> C<span className="text-[0.65em]">asa</span>
          </p>
        </div>
        <div className="contents-in w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)]">
          <table className="ModelCasa-table md:hidden w-full">
            {[
              { title: '予約', content: 'メール・お電話よりご予約ください' },
              { title: '来局・カウンセリング', content: '初回は問診表をご記入いただきますので、\n10分前にご来局ください' },
              { title: 'お薬の説明・生活アドバイス', content: 'カウンセリング後、体質にあった薬をお選びします。\n生活習慣を改善した方が早く効果が出る場合は、\n生活のアドバイスもさせていただきます' },
              { title: 'お会計・次回予約', content: '症状にもよりますが２〜３週間を目安に\n来局していただき経過を観察していきます。\n\nお薬を服用中に気になる症状がありましたら、\n予約前でもお気軽にお問い合わせください' }
            ].map((item, index) => (
              <tr key={index} className="border-l-4 border-[#25190C]">
                <th className="relative z-10 text-center m-0 ml-[4vw] w-[70%] text-white py-[2vw] px-[8vw] text-left text-[min(4vw,18px)] font-normal before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[#25190C] before:skew-x-[30deg]">
                  <span className="text-[1.1em] font-bold">・</span>{item.title}
                </th>
                <td className="p-[3vw] whitespace-pre-line">{item.content}</td>
              </tr>
            ))}
          </table>
          <div className="case-flex hidden md:flex items-center text-[#01A73A]">
            {[
              { title: '予約', image: 'flow01.png', content: 'メール・お電話より\nご予約ください' },
              { title: '来局\nカウンセリング', image: 'flow02.png', content: '初回は問診表を\nご記入いただきますので\n10分前にご来局ください' },
              { title: 'お薬の説明\n生活アドバイス', image: 'flow03.png', content: 'カウンセリング後\n体質にあった薬を\nお選びします\n\n生活習慣を改善した方が\n早く効果が出る場合は\n生活のアドバイスも\nさせていただきます', className: 'case-p02' },
              { title: 'お会計\n次回ご予約', image: 'flow04.png', content: '症状にもよりますが\n２〜３週間を目安に\n来局していただき\n経過を観察していきます\n\nお薬を服用中に気になる\n症状がありましたら\n予約前でもお気軽に\nお問い合わせください', className: 'case-p02' }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="case-flex-in border-[3px] border-[#01A73A] p-[0.5vw] text-center rounded-[20px] w-[23%]">
                  <h3 className="text-[1.39em] font-normal whitespace-pre-line">{item.title}</h3>
                  <Image src={`/img/${item.image}`} alt={item.title} width={100} height={100} className="block w-[60%] mx-auto" />
                  <p className={`text-[clamp(0.813rem,0.257rem+1.16vw,1.125rem)] h-[18rem] flex justify-center items-center ${item.className}`}>
                    {item.content}
                  </p>
                </div>
                {index < 3 && (
                  <div className="case-arrow w-[2.5%]">
                    <Image src="/img/Arrow.png" alt="Arrow" width={20} height={20} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#FFFDFD] py-[5vw] pb-[2vw]">
        <div className="title-h2 title-h2gr pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">お問い合わせ</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#F9F9F9] text-[3.8em] -z-10 h-[min(14vw,49px)]">
            C<span className="text-[0.65em]">ontact</span>
          </p>
        </div>
        <div className="contents-in w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)]">
          <p className="md:hidden">当日、前日のご予約や急ぎの場合はお電話にてご連絡ください<br />24時間以内に返信がない場合は再度ご連絡ください</p>
          <div className="contact-btn-flex flex items-center justify-between w-[95%] mx-auto my-[4vw] md:justify-evenly">
            <div className="contact-btn w-[47%] md:w-[max(27%,325px)]">
              <Link href="#" className="bg-[#22E200] rounded-[7px] text-white block w-full text-center text-[clamp(1.5rem,1.159rem+1.45vw,2.25rem)] py-[2vw] md:flex md:items-center md:py-[0.2em]">
                <Image src="/img/tel.png" alt="電話" width={30} height={30} className="hidden md:block md:w-[2em] md:px-[4%] md:pr-[8%]" />
                予約
              </Link>
              <p className="hidden md:block text-[0.89em] pt-[3em] text-center">
                当日・前日の予約や急ぎのお問い合わせは<br />
                お電話にてご連絡ください
              </p>
            </div>
            <div className="contact-btn w-[47%] md:w-[max(27%,325px)]">
              <Link href="#" className="bg-[#22E200] rounded-[7px] text-white block w-full text-center text-[clamp(1.5rem,1.159rem+1.45vw,2.25rem)] py-[2vw] md:flex md:items-center md:py-[0.2em]">
                <Image src="/img/mail.png" alt="メール" width={30} height={30} className="hidden md:block md:w-[2em] md:px-[4%]" />
                お問い合わせ
              </Link>
              <p className="hidden md:block text-[0.89em] pt-[3em] text-center">
                24時間以内に返信がない場合は<br />
                再度ご連絡ください
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="symptoms" className="py-[8vw]">
        <div className="title-h2 pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">よくある相談例</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#FFFDFD] text-[3.8em] -z-10 h-[min(14vw,49px)]">
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
              <div key={index} className="symptoms-contents w-[48%] text-center md:w-[45%] mb-4">
                <Image src={`/img/${item.image}`} alt={item.title} width={200} height={200} layout="responsive" />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="more pt-[2vw] text-center">
          <Link href="#" className="text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light">もっと見る</Link>
        </div>
      </section>

      <section id="access" className="bg-[#FFFDFD] py-[8vw]">
        <div className="title-h2 title-h2gr pl-[1vw] z-10 relative">
          <h2 className="absolute mb-[0.2rem] font-normal text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] pl-[min(9vw,45px)]">営業時間・アクセス</h2>
          <p className="relative top-[max(-9vw,-35px)] left-0 text-[#F9F9F9] text-[3.8em] -z-10 h-[min(14vw,49px)]">
            A<span className="text-[0.65em]">ccess</span>
          </p>
        </div>
        <div className="contents-in access-in w-[90%] mx-auto my-[1vw] text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] md:flex md:justify-between md:items-center md:w-[max(80%,705px)]">
          <div className="access-02 md:order-2 md:w-[45%]">
            <Image src="/img/textlogo.png" alt="ワタナべ薬局" width={200} height={50} className="hidden md:block md:w-1/2" />
            <table className="access-table md:hidden w-full">
              <tr>
                <th className="text-left font-normal leading-[1.2] pt-[0.5em]">〒 776-0010</th>
                <td className="pl-[3vw] text-left font-normal leading-[1.2] pt-[0.5em]">徳島県吉野川市鴨島町鴨島216-1</td>
              </tr>
              <tr>
                <th className="text-left font-normal leading-[1.2] pt-[0.5em]">Tel 0883-24-0770</th>
                <td className="pl-[3vw] text-left font-normal leading-[1.2] pt-[0.5em]">
                  鴨島駅より徒歩8分<br />
                  徳島駅より車で40分
                </td>
              </tr>
              <tr>
                <th className="text-left font-normal leading-[1.2] pt-[0.5em]">
                  営業時間　１０：００〜１９：００<br />
                  定休日　　日曜・祝日
                </th>
              </tr>
            </table>
            <p className="hidden md:block">〒 776-0010<br />徳島県吉野川市鴨島町鴨島216-1</p>
            <table className="access-table-pc hidden md:table ml-[1em]">
              <tr>
                <th className="font-normal text-left w-[5em] leading-[3]">電話</th>
                <td>0883-24-0770</td>
              </tr>
              <tr>
                <th className="font-normal text-left w-[5em] leading-[3]">営業時間</th>
                <td>10:00〜19:00</td>
              </tr>
              <tr>
                <th className="font-normal text-left w-[5em] leading-[3]">定休日</th>
                <td>日曜・祝日</td>
              </tr>
            </table>
          </div>
          <div className="map w-full h-[50vw] mt-[4vw] md:order-1 md:w-[52%] md:h-[25em]">
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
      </section>

    </main>
  )
}