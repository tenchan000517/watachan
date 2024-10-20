import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#22E200] md:bg-[#01A73A]"> {/* モバイルの背景色をさらに薄く */}
      <div className="md:hidden w-[35%] mx-auto pt-4"> {/* ロゴ上部の余白を少し減らす */}
        <Image src="/img/footerlogo.png" alt="ロゴ" width={100} height={50} layout="responsive" />
      </div>
      <ul className="footer-menu flex w-[90%] md:w-[40%] mx-auto py-6 md:py-4 justify-between items-center text-[clamp(0.813rem,0.699rem+0.48vw,1.063rem)]"> {/* テキストサイズを大きく */}
        <li className="relative group">
          <Link href="/access" className="text-white transition-colors duration-300">
            営業時間・アクセス
          </Link>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </li>
        <li className="relative group">
          <Link href="/contact" className="text-white transition-colors duration-300">
            お問い合わせ
          </Link>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </li>
        <li className="relative group">
          <Link href="/privacypolicy" className="text-white transition-colors duration-300">
            個人情報保護方針
          </Link>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </li>
      </ul>
    </footer>
  );
}