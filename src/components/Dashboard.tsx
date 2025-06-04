import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PlatformCard from './PlatformCard';
import { Platform, MessageUpdate } from '../types';
import { simulateRealTimeUpdates } from '../utils/mockUpdates';
import { getPythonStats } from '../utils/pythonBridge';

interface DashboardProps {
  initialPlatforms: Platform[];
}

const Dashboard: React.FC<DashboardProps> = ({ initialPlatforms }) => {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [pythonStats, setPythonStats] = useState<any>(null);
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
  
  // Fetch Python stats
  useEffect(() => {
    const fetchPythonStats = async () => {
      try {
        const stats = await getPythonStats();
        setPythonStats(stats);
      } catch (error) {
        console.error('Failed to fetch Python stats:', error);
      }
    };

    fetchPythonStats();
    const interval = setInterval(fetchPythonStats, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
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
      
      {pythonStats && (
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total de mensagens processadas: {pythonStats.total_messages}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Última atualização: {new Date(pythonStats.timestamp).toLocaleString()}
          </p>
        </div>
      )}
      
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