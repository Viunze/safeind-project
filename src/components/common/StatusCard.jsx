// src/components/common/StatusCard.jsx
import React from 'react';

const cardConfig = {
  red: {
    color: 'border-safe-red bg-safe-red/10 text-safe-red',
    title: '🚨 TERINDIKASI PENIPU',
    icon: '❌',
  },
  yellow: {
    color: 'border-safe-yellow bg-safe-yellow/10 text-safe-yellow',
    title: '⚠️ PERNAH DILAPORKAN (Belum Terverifikasi)',
    icon: '🟡',
  },
  green: {
    color: 'border-safe-green bg-safe-green/10 text-safe-green',
    title: '✅ AMAN (Berdasarkan Database SAFEIND)',
    icon: '✅',
  },
};

const StatusCard = ({ status, children }) => {
  const config = cardConfig[status] || cardConfig.green;

  return (
    <div className={`p-6 rounded-xl border-l-4 shadow-lg ${config.color}`}>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
        {config.icon} {config.title}
      </h2>
      <div className="text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default StatusCard;
