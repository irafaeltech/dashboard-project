import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Platform } from '../types';
import CompanyRow from './CompanyRow';

interface PlatformCardProps {
  platform: Platform;
  previousCounts?: Record<number, number>;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, previousCounts = {} }) => {
  const IconComponent = LucideIcons[platform.icon as keyof typeof LucideIcons];
  const totalMessages = platform.companies.reduce((sum, company) => sum + company.messageCount, 0);
  const previousTotal = platform.companies.reduce((sum, company) => 
    sum + (previousCounts[company.id] || company.messageCount), 0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const hasNewMessages = totalMessages > previousTotal;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl p-6 ${platform.backgroundColor} dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3 dark:bg-opacity-20" 
            style={{ backgroundColor: platform.color + '15' }}
          >
            {IconComponent && <IconComponent color={platform.color} size={20} />}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{platform.name}</h3>
        </div>
        
        <div className="flex items-center">
          {platform.active ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Ativo
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
              Inativo
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-baseline">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Total de Mensagens:</span>
          <motion.span 
            key={totalMessages}
            className="text-2xl font-bold"
            style={{ color: platform.color }}
            initial={hasNewMessages ? { scale: 1.3 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {totalMessages}
          </motion.span>
        </div>
      </div>
      
      <div>
        {platform.companies.map(company => (
          <CompanyRow 
            key={company.id} 
            company={company} 
            color={platform.color}
            previousCount={previousCounts[company.id]}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PlatformCard;