import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { initialPlatforms } from './data/initialData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // In a real application, you would validate credentials here
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header onLogout={handleLogout} />
      <main className="container mx-auto py-6">
        <Dashboard initialPlatforms={initialPlatforms} />
      </main>
      
      <footer className="mt-12 py-4 border-t border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
        <p>© 2025 Dashboard de Mensagens | Atualizado em tempo real</p>
      </footer>
    </motion.div>
  );
}

export default App;