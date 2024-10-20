'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadFormFields = async () => {
      const response = await fetch('/formFields.json');
      const data = await response.json();
      setFormFields(data.fields);

      const initialFormData = data.fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {});
      setFormData(initialFormData);
    };

    loadFormFields();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(formData);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfzXCsVE_bEHpRpm8jZnliQExaiSvg1q9Ylm5W3ESevolbpwQ/formResponse';
    
    const formBody = Object.keys(formData).map(key => 
      encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    ).join('&');

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        mode: 'no-cors', // Important for CORS issues
      });

      if (response.type === 'opaque') {
        // Google Forms returns an opaque response due to CORS
        console.log('Form submitted successfully');
        setSubmitted(true);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (submitted) {
    return <p>お問い合わせを受け付けました！</p>;
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
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={field.required}
            ></textarea>
          ) : field.type === 'radio' ? (
            field.options.map((option, index) => (
              <label key={index} className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  onChange={handleChange}
                  className="form-radio"
                  required={field.required}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))
          ) : (
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={field.required}
            />
          )}
        </div>
      ))}

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