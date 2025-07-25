
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ship, LogOut, Home, Database, Activity, Shield, Award } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Accueil', icon: Home },
    { path: '/references', label: 'Références', icon: Database },
    { path: '/suivi-controle', label: 'Suivi et contrôle', icon: Activity },
    { path: '/tracabilite', label: 'Traçabilité', icon: Shield },
    { path: '/certification', label: 'Certification des captures', icon: Award }
  ];

  if (!user) return null;

  return (
    <motion.nav 
      className="glass-effect border-b border-emerald-400/30 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05 }}
          >
            <Ship className="w-8 h-8 text-emerald-700" />
            <span className="text-xl font-bold text-gradient">ECOSPECHE</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-400/30' 
                      : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-emerald-700 font-medium">{user.name}</p>
            <p className="text-xs text-gray-600">{user.company}</p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-emerald-400/30 text-emerald-700 hover:bg-emerald-500/20 hover:text-emerald-900"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
