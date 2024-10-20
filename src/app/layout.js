import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToSection from './components/ScrollToSection';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ワタナベ薬局 | 吉野川市の漢方相談薬局 | 1986年創業',
  description: 'ワタナベ薬局は吉野川市で1986年創業の漢方相談薬局です。漢方薬、健康食品、サプリメントの相談は当薬局へ。オーダーメイドの漢方相談で、あなたの健康をサポートします。',
  keywords: 'ワタナベ薬局, 漢方, 吉野川市, 健康相談, ワタナベオイスターバイオリンク, 薬局, 徳島県',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} font-inter text-black bg-[#F9F9F9] w-full`}>
        <Header />
        <Suspense fallback={null}>
        <ScrollToSection />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}