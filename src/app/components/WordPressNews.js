import React from 'react';
import Link from 'next/link';

const WordPressNews = ({ posts }) => {
  // 最大5つの記事を表示
  const displayedPosts = posts.slice(0, 5);

  return (
    <div className="py-[8vw]">
      <div className="title-h2 w-[75%] mx-auto">
        <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] mt-2">お知らせ</h2>
        <p className="text-[#FFFDFD] text-[4.5em]">
          N<span className="text-[0.65em]">ews</span>
        </p>
      </div>
      <div className="news-container w-[90%] md:w-[max(60%,600px)] mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="news-list">
          {displayedPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <Link href={`/news/${post.slug}`} className="news-item block transition-colors duration-300 hover:bg-gray-100 py-3 px-4 rounded">
                <p className="news-date text-xs md:text-sm text-gray-500 mb-1 pl-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="news-title text-sm md:text-base font-semibold pl-2">{post.title.rendered}</h3>
              </Link>
              {index < displayedPosts.length - 1 && <hr className="border-gray-200 my-2" />}
            </React.Fragment>
          ))}
        </div>
        <div className="more pt-[4vw] flex justify-center">
          <Link href="/news" className="group relative inline-block text-[clamp(0.75rem,0.58rem+0.73vw,1.125rem)] font-light text-black">
            <span className="relative inline-block">
              もっと見る
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black transform origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WordPressNews;