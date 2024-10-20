'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

export default function AccessInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2">所在地</h3>
            <p>〒776-0010</p>
            <p>徳島県吉野川市鴨島町鴨島216-1</p>
            <p className="mt-2 text-sm text-gray-600">
              鴨島駅より徒歩8分 / 徳島駅より車で40分
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-1">電話番号</h3>
            <p className="text-xl">0883-24-0770</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-1">営業時間</h3>
            <p>10:00 〜 19:00</p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-1">定休日</h3>
            <p>日曜・祝日</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}