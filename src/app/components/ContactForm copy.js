'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    furigana: '',
    name: '',
    birthdate: '',
    gender: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここにフォーム送信のロジックを実装
    console.log(formData);
    alert('お問い合わせを受け付けました。');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label htmlFor="furigana" className="block text-gray-700 text-sm font-bold mb-2">ふりがな</label>
        <input type="text" id="furigana" name="furigana" value={formData.furigana} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">名前</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">生年月日</label>
        <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">性別</label>
        <div className="flex">
          <label className="inline-flex items-center mr-6">
            <input type="radio" name="gender" value="male" onChange={handleChange} className="form-radio" required />
            <span className="ml-2">男性</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="gender" value="female" onChange={handleChange} className="form-radio" required />
            <span className="ml-2">女性</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">電話番号</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">お問い合わせ内容</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        <p className="text-sm text-gray-600 mt-2">
          ※ご予約の場合は希望日・時間を第２希望までご記入お願いします。<br />
          （例）① 5/20 14時 ② 5/23 12〜16時の間
        </p>
      </div>
      <div className="flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          送信
        </motion.button>
      </div>
    </motion.form>
  );
}