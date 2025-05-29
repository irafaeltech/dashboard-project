import { MessageUpdate } from '../types';

// Generates random message updates to simulate real-time data
export function generateMockUpdates(): MessageUpdate {
  const platforms = ['teams', 'zoom', 'meet'];
  const companyIds = [1, 2, 3];
  
  const platformId = platforms[Math.floor(Math.random() * platforms.length)];
  const companyId = companyIds[Math.floor(Math.random() * companyIds.length)];
  const increment = Math.floor(Math.random() * 5) + 1; // Random increment between 1 and 5
  
  return {
    platformId,
    companyId,
    newCount: increment
  };
}

// Simulates real-time updates at random intervals
export function simulateRealTimeUpdates(callback: (update: MessageUpdate) => void): () => void {
  const minInterval = 2000; // 2 seconds
  const maxInterval = 5000; // 5 seconds
  
  const scheduleNext = () => {
    const nextInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
    
    return setTimeout(() => {
      const update = generateMockUpdates();
      callback(update);
      timeoutId = scheduleNext();
    }, nextInterval);
  };
  
  let timeoutId = scheduleNext();
  
  // Return cleanup function
  return () => clearTimeout(timeoutId);
}