import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PlatformCard from './PlatformCard';
import { Platform, MessageUpdate } from '../types';
import { simulateRealTimeUpdates } from '../utils/mockUpdates';

interface DashboardProps {
  initialPlatforms: Platform[];
}

const Dashboard: React.FC<DashboardProps> = ({ initialPlatforms }) => {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const previousCountsRef = useRef<Record<string, Record<number, number>>>({});
  
  // Track previous counts for animation purposes
  useEffect(() => {
    const newPreviousCounts: Record<string, Record<number, number>> = {};
    
    platforms.forEach(platform => {
      newPreviousCounts[platform.id] = {};
      platform.companies.forEach(company => {
        newPreviousCounts[platform.id][company.id] = company.messageCount;
      });
    });
    
    previousCountsRef.current = newPreviousCounts;
  }, [platforms]);
  
  // Simulate real-time updates
  useEffect(() => {
    const cleanup = simulateRealTimeUpdates((update: MessageUpdate) => {
      setPlatforms(currentPlatforms => {
        return currentPlatforms.map(platform => {
          if (platform.id === update.platformId) {
            return {
              ...platform,
              companies: platform.companies.map(company => {
                if (company.id === update.companyId) {
                  return {
                    ...company,
                    messageCount: company.messageCount + update.newCount
                  };
                }
                return company;
              })
            };
          }
          return platform;
        });
      });
    });
    
    return cleanup;
  }, []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.h2 
        className="text-2xl font-semibold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Monitoramento de Mensagens em Tempo Real
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, index) => (
          <PlatformCard 
            key={platform.id}
            platform={platform}
            previousCounts={previousCountsRef.current[platform.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;