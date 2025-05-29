import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <MessageSquare className="text-indigo-600 dark:text-indigo-400 mr-2" size={32} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard de Mensagens</h1>
          </div>
          
          <button
            onClick={onLogin}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LogIn size={20} />
            <span>Entrar no Sistema</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;