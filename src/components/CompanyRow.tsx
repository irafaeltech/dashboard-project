import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Company } from '../types';

interface CompanyRowProps {
  company: Company;
  color: string;
  previousCount?: number;
}

const CompanyRow: React.FC<CompanyRowProps> = ({ company, color, previousCount }) => {
  const hasIncreased = previousCount !== undefined && company.messageCount > previousCount;
  const hasDecreased = previousCount !== undefined && company.messageCount < previousCount;
  const showChange = previousCount !== undefined && previousCount !== company.messageCount;
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="font-medium text-gray-700 dark:text-gray-200">{company.name}</span>
      <div className="flex items-center">
        <motion.span 
          key={company.messageCount}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-lg"
          style={{ color }}
        >
          {company.messageCount}
        </motion.span>
        
        {showChange && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 flex items-center"
          >
            {hasIncreased ? (
              <div className="flex items-center text-green-500 dark:text-green-400">
                <ArrowUp size={16} />
                <span className="text-xs ml-1">+{company.messageCount - (previousCount || 0)}</span>
              </div>
            ) : hasDecreased ? (
              <div className="flex items-center text-red-500 dark:text-red-400">
                <ArrowDown size={16} />
                <span className="text-xs ml-1">-{(previousCount || 0) - company.messageCount}</span>
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CompanyRow;