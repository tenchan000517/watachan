'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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

  const navItems = ['お知らせ', '薬局について', '予約', 'よくある質問', 'アクセス'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full h-[20vw] md:h-[10vw] flex justify-between items-end md:items-center bg-background md:bg-[rgba(34,226,0,0.3)] box-border z-50">
      <div className="logo">
        <Link href="/" className="flex items-center justify-between pl-[2vw] w-[30vw]">
          <Image src="/img/logo-icon.png" alt="ロゴ" width={50} height={50} className="logo-icon block w-1/2 md:w-[40%]" />
          <Image src="/img/textlogo.png" alt="ワタナベ薬局" width={100} height={50} className="textlogo block w-full md:w-[65%]" />
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
        className={`navigation md:hidden ${isMenuOpen ? 'navigation--open' : ''}`}
      >
        <ul className="navigation__list">
          {navItems.map((item, index) => (
            <li key={index} className="navigation__list-item">
              <Link href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="navigation__link" onClick={toggleMenu}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="navigation__list-pc hidden md:flex justify-around w-1/2 mr-[2vw] ml-auto">
        {navItems.map((item, index) => (
          <li key={index} className="navigation__list-item border-none">
            <Link href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="navigation__link">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}