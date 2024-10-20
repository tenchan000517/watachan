'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Send } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';

registerLocale('ja', ja);

export default function ContactForm() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({length: 100}, (_, i) => currentYear - i), [currentYear]);
  const months = useMemo(() => Array.from({length: 12}, (_, i) => i + 1), []);
  const days = useMemo(() => Array.from({length: 31}, (_, i) => i + 1), []);

  const formFields = useMemo(() => [
    { id: 'entry.1873355356', name: 'ふりがな', label: 'ふりがな', type: 'text', required: true },
    { id: 'entry.946035362', name: '名前', label: '名前', type: 'text', required: true },
    { id: 'entry.204902190', name: 'birthdate', label: '生年月日', type: 'birthdate', required: true },
    { id: 'entry.1641764328', name: 'gender', label: '性別', type: 'radio', options: ['男性', '女性'], required: true },
    { id: 'entry.1576761590', name: 'email', label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス', required: true },
    { id: 'entry.1140571906', name: 'phone', label: '電話番号', type: 'tel', placeholder: '電話番号', required: true },
    { id: 'entry.49744826', name: 'message', label: 'お問い合わせ内容', type: 'textarea', required: false }
  ], []);

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDateChange = useCallback((date, fieldId) => {
    setFormData(prev => ({ ...prev, [fieldId]: date }));
  }, []);

  const handleBirthDateChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'birthYear') setBirthYear(value);
    if (name === 'birthMonth') setBirthMonth(value);
    if (name === 'birthDay') setBirthDay(value);

    setFormData(prev => {
      const updatedBirthYear = name === 'birthYear' ? value : birthYear;
      const updatedBirthMonth = name === 'birthMonth' ? value : birthMonth;
      const updatedBirthDay = name === 'birthDay' ? value : birthDay;

      if (updatedBirthYear && updatedBirthMonth && updatedBirthDay) {
        const formattedDate = `${updatedBirthYear}-${updatedBirthMonth.padStart(2, '0')}-${updatedBirthDay.padStart(2, '0')}`;
        return { ...prev, 'entry.204902190': formattedDate };
      }
      return prev;
    });
  }, [birthYear, birthMonth, birthDay]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(formData);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfzXCsVE_bEHpRpm8jZnliQExaiSvg1q9Ylm5W3ESevolbpwQ/formResponse';
    
    const formBody = Object.entries(formData).map(([key, value]) => {
      if (key === 'entry.208122542' && value instanceof Date) {
        const date = value.toISOString().split('T')[0];
        const hour = value.getHours().toString().padStart(2, '0');
        const minute = value.getMinutes().toString().padStart(2, '0');
        return `${encodeURIComponent('entry.208122542')}=${encodeURIComponent(date)}&` +
               `${encodeURIComponent('entry.1421944315_hour')}=${encodeURIComponent(hour)}&` +
               `${encodeURIComponent('entry.1421944315_minute')}=${encodeURIComponent(minute)}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value || '')}`;
    }).join('&');

    console.log('Sending form data:', formBody);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        mode: 'no-cors',
      });

      if (response.type === 'opaque') {
        console.log('お問い合わせが正常に送信されました');
        setSubmitted(true);
      } else {
        console.error('お問い合わせの送信に失敗しました');
      }
    } catch (error) {
      console.error('お問い合わせ送信中にエラーが発生しました:', error);
    }
  }, [formData]);

  if (submitted) {
    return (
      <div>
        <p>お問い合わせを受け付けました</p>
        <Link href="/" className="group relative inline-block text-[clamp(1rem,0.875rem+0.75vw,1.5rem)] font-light text-black">
          <span className="relative inline-block">
            トップに戻る
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black transform origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
          </span>
        </Link>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
    >
      {formFields.map((field) => (
        <div className="mb-6" key={field.id}>
          <label htmlFor={field.id} className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={field.required}
              placeholder={field.placeholder}
            ></textarea>
          ) : field.type === 'radio' ? (
            field.options.map((option, index) => (
              <label key={index} className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  onChange={handleChange}
                  className="form-radio"
                  required={field.required}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))
          ) : field.type === 'birthdate' ? (
            <div className="flex space-x-2 justify-center md:justify-start">
              <select
                name="birthYear"
                value={birthYear}
                onChange={handleBirthDateChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                required
              >
                <option value="">年</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                name="birthMonth"
                value={birthMonth}
                onChange={handleBirthDateChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                required
              >
                <option value="">月</option>
                {months.map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>{month}</option>
                ))}
              </select>
              <select
                name="birthDay"
                value={birthDay}
                onChange={handleBirthDateChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                required
              >
                <option value="">日</option>
                {days.map(day => (
                  <option key={day} value={day.toString().padStart(2, '0')}>{day}</option>
                ))}
              </select>
            </div>
          ) : field.type === 'datetime' ? (
            <div className="flex justify-center md:justify-start w-full">
              <DatePicker
                selected={formData[field.id]}
                onChange={(date) => handleDateChange(date, field.id)}
                dateFormat="yyyy/MM/dd HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="時間"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required={field.required}
                placeholderText="日時を選択"
                wrapperClassName="w-full"
              />
            </div>
          ) : (
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}

        <div className="flex items-center justify-center">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            type="submit"
        >
            送信
            <Send className="ml-2" /> {/* Sendアイコンを追加 */}
        </motion.button>
        </div>
    </motion.form>
  );
}