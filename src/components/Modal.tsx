import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { TeamsService } from '../services/api/teams';
import { ZoomService } from '../services/api/zoom';
import { GoogleMeetService } from '../services/api/meet';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    name: string;
    color: string;
    icon: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, platform }) => {
  const IconComponent = LucideIcons[platform.icon as keyof typeof LucideIcons];

  const handleConnect = async () => {
    try {
      let success = false;
      
      switch (platform.name) {
        case 'Microsoft Teams':
          const teamsService = new TeamsService('');
          success = await teamsService.connect('your-client-id', 'your-client-secret');
          break;
        case 'Zoom':
          const zoomService = new ZoomService('your-api-key', 'your-api-secret');
          success = await zoomService.connect('your-client-id', 'your-client-secret');
          break;
        case 'Google Meet':
          const meetService = new GoogleMeetService('your-client-id', 'your-client-secret');
          success = await meetService.connect();
          break;
      }

      if (success) {
        onClose();
        // Handle successful connection
      }
    } catch (error) {
      console.error('Error connecting to platform:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: platform.color + '15' }}
                  >
                    {IconComponent && <IconComponent color={platform.color} size={20} />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Conectar {platform.name}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnect}
                  className="w-full py-2.5 px-4 rounded-lg text-white font-medium 
                           shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: platform.color }}
                >
                  Conectar com {platform.name}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;