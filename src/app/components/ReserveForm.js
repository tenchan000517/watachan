import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import Link from 'next/link';
import { Send } from 'lucide-react';
import JapaneseHolidays from 'japanese-holidays';
import { setHours, setMinutes } from 'date-fns';

registerLocale('ja', ja);

export default function ReserveForm() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => currentYear - i);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const days = Array.from({length: 31}, (_, i) => i + 1);

  const formFields = [
    { id: 'entry.1898562214', name: 'furigana', label: 'ふりがな', type: 'text', required: true },
    { id: 'entry.168983641', name: 'name', label: '名前', type: 'text', required: true },
    { id: 'entry.583193451', name: 'birthdate', label: '生年月日', type: 'birthdate', required: true },
    { id: 'entry.208122542', name: 'reserveDateTime', label: '予約希望日時', type: 'datetime', required: true },
    { id: 'entry.1821261298', name: 'visitHistory', label: '来店歴', type: 'radio', options: ['初来店', '再来店'], required: true },
    { id: 'entry.111225615', name: 'consultation', label: '薬剤師への相談内容（任意）', type: 'textarea', required: false }
  ];

  const isCustomHoliday = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // 1月2日と1月3日をカスタム休日として追加
    return (month === 1 && (day === 2 || day === 3));
  };

  const isHolidayOrCustomDay = (date) => {
    return JapaneseHolidays.isHoliday(date) || isCustomHoliday(date);
  };

  const filterTime = (time) => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    return hour >= 10 && (hour < 19 || (hour === 19 && minutes === 0));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, fieldId) => {
    setFormData({ ...formData, [fieldId]: date });
  };

  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'birthYear') setBirthYear(value);
    if (name === 'birthMonth') setBirthMonth(value);
    if (name === 'birthDay') setBirthDay(value);

    updateBirthdate(name === 'birthYear' ? value : birthYear, 
                    name === 'birthMonth' ? value : birthMonth, 
                    name === 'birthDay' ? value : birthDay);
  };

  const updateBirthdate = (year, month, day) => {
    if (year && month && day) {
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setFormData(prevData => ({ ...prevData, 'entry.583193451': formattedDate }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdzEHKolpbsWxOeO4Y1X7gSrIMk8owupyZI5kzLSm4yMS81yg/formResponse';
    
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

    console.log('Sending form data:', formBody);  // デバッグ用

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
        console.log('予約フォームが正常に送信されました');
        setSubmitted(true);
      } else {
        console.error('予約フォームの送信に失敗しました');
      }
    } catch (error) {
      console.error('予約フォーム送信中にエラーが発生しました:', error);
    }
  };

  if (submitted) {
    return (
      <div>
        <p>予約を受け付けました</p>
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
            <div className="flex flex-col w-full">
              <DatePicker
                selected={formData[field.id]}
                onChange={(date) => handleDateChange(date, field.id)}
                dateFormat="yyyy/MM/dd HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="時間"
                locale="ja"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required={field.required}
                placeholderText="日時を選択"
                filterDate={(date) => {
                    const isSunday = date.getDay() === 0;
                    return !isSunday && !isHolidayOrCustomDay(date);
                  }}
                  filterTime={filterTime}
                  minTime={setHours(setMinutes(new Date(), 0), 9)} // 9時59分に設定
                  maxTime={setHours(setMinutes(new Date(), 30), 18)} // 18時30分に設定
                  />
             <div className="text-sm text-gray-500">
                <p>※日曜・祝日は定休日</p>
                <p>営業時間: 10:00～19:00</p>
              </div>
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
          <Send className="ml-2" />
        </motion.button>
      </div>
    </motion.form>
  );
}