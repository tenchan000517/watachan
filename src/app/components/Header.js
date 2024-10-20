'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'お知らせ', href: '/#news' },
    { name: '薬局について', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: '相談例', href: '/symptoms' },
    { name: 'お問い合わせ/予約', href: '/contact' },
    { name: 'アクセス', href: '/access' }
  ];

  if (pathname !== '/') {
    navItems.unshift({ name: 'HOME', href: '/' });
  }
  
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  const handleNewsClick = useCallback((e) => {
    e.preventDefault();
    if (pathname === '/') {
      const newsSection = document.getElementById('news');
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#news');
    }
    setIsMenuOpen(false);
  }, [pathname, router]);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
    setIsMenuOpen(false);
  }, [pathname, router]);

  const handleScrollToTop = useCallback((e, page) => {
    e.preventDefault();
  
    console.log('Current pathname:', pathname);
    console.log('Target page:', page);
  
    if (pathname === page) {
      console.log('Scrolling to top since the pathname matches the page.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('Navigating to the new page');
      router.push(page);
      // Next.js 13以降では router.push が完了を待つ必要がないため、
      // 即座にスクロールを実行します
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    setIsMenuOpen(false);
  }, [pathname, router]);

  

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] md:h-[90px] flex justify-between items-center bg-[rgba(34,226,0,0.3)] box-border z-50">
      <div className="logo">
        <Link href="/" className="flex items-center justify-between pl-[2vw] w-[240px] md:w-[300px]" onClick={handleLogoClick}>
          <Image 
            src="/img/logo-icon.png" 
            alt="ロゴ" 
            width={100}
            height={100} 
            className="logo-icon block w-[80px] md:w-[100px]" 
            priority
            quality={100} 
          />
          <Image 
            src="/img/textlogo.png" 
            alt="ワタナベ薬局" 
            width={300} 
            height={100} 
            className="textlogo block w-[160px] md:w-[200px]" 
            priority
            quality={100} 
          />
        </Link>
      </div>
      <button
        className={`hamburger-menu md:hidden ${isMenuOpen ? 'hamburger-menu--open' : ''}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="メニュー"
      >
        <span className="hamburger-menu__bar"></span>
        <span className="hamburger-menu__bar"></span>
        <span className="hamburger-menu__bar"></span>
      </button>
      <nav
        className={`navigation custom:hidden ${isMenuOpen ? 'navigation--open' : ''} absolute top-[70px] left-0 w-full`}
      >
        <ul className="navigation__list bg-gray-600 bg-opacity-80">
          {navItems.map((item, index) => (
            <li key={index} className="navigation__list-item">
              <Link
                href={item.href}
                className="navigation__link text-white hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.3)] transition-colors duration-300"
                onClick={
                  item.name === 'お知らせ' ? handleNewsClick :
                  item.name === 'HOME' ? handleLogoClick :
                  item.name === 'お問い合わせ/予約' ? (e) => handleScrollToTop(e, '/contact') :
                  item.name === '薬局について' ? (e) => handleScrollToTop(e, '/about') :
                  item.name === 'FAQ' ? (e) => handleScrollToTop(e, '/faq') :
                  item.name === '相談例' ? (e) => handleScrollToTop(e, '/symptoms') :
                  item.name === 'アクセス' ? (e) => handleScrollToTop(e, '/access') :
                  () => setIsMenuOpen(false)
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="hidden md:block">
        <ul className="flex mr-[2vw] items-center space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-8">
          {navItems.map((item, index) => (
            <li key={index} className="relative group px-1 md:px-2">
              <Link
                href={item.href}
                className="text-foreground hover:text-[#22E200] transition-colors duration-300 text-[15px] lg:text-[16px] xl:text-[18px] whitespace-nowrap"
                onClick={
                  item.name === 'お知らせ' ? handleNewsClick :
                  item.name === 'HOME' ? handleLogoClick :
                  item.name === 'お問い合わせ/予約' ? (e) => handleScrollToTop(e, '/contact') :
                  item.name === '薬局について' ? (e) => handleScrollToTop(e, '/about') :
                  item.name === 'FAQ' ? (e) => handleScrollToTop(e, '/faq') :
                  item.name === '相談例' ? (e) => handleScrollToTop(e, '/symptoms') :
                  item.name === 'アクセス' ? (e) => handleScrollToTop(e, '/access') :
                  undefined
                }
              >
                {item.name}
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#22E200] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        @media (max-width: 980px) {
          .md\:hidden {
            display: block;
          }
          .md\:block {
            display: none;
          }
        }
        @media (min-width: 981px) {
          .md\:hidden {
            display: none;
          }
          .md\:block {
            display: block;
          }
          .logo {
            padding-top: 10px;
            padding-bottom: 10px;
          }
        }
      `}</style>
    </header>
  );
}