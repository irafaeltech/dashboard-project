import React from 'react';
import { MessageSquare, Clock, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };
  
  const [time, setTime] = React.useState(getCurrentTime());
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 mb-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="text-indigo-600 dark:text-indigo-400 mr-2" size={24} />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard de Mensagens</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-600 dark:text-gray-300" />
            <div className="text-sm">
              <p className="font-medium text-gray-800 dark:text-white">Emerson Rocha</p>
              <p className="text-gray-500 dark:text-gray-400">emerson.rocha@erconsultoria.com</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock size={16} className="mr-1" />
            <span className="text-sm font-medium">{time}</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="text-gray-600 dark:text-gray-300" size={20} />
            ) : (
              <Moon className="text-gray-600 dark:text-gray-300" size={20} />
            )}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;