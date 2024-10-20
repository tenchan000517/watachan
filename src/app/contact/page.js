'use client';
import dynamic from 'next/dynamic';

const ContactPage = dynamic(() => import('@/app/components/ContactPage'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default ContactPage;