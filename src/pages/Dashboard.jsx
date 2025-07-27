
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Ship, TrendingUp, Fish, Shield, Award, Activity, Database, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-800"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { icon: Fish, label: "Captures certifiées", value: "1,247", color: "text-blue-600" },
    { icon: Shield, label: "Contrôles effectués", value: "89", color: "text-green-600" },
    { icon: Award, label: "Certifications actives", value: "156", color: "text-purple-600" },
    { icon: Users, label: "Partenaires", value: "34", color: "text-orange-600" }
  ];

  const quickActions = [
    {
      icon: Database,
      title: "Références",
      description: "Consulter la base de données des espèces",
      path: "/references",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Activity,
      title: "Suivi et contrôle",
      description: "Monitoring des activités de pêche",
      path: "/suivi-controle",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Traçabilité",
      description: "Traçage de la chaîne d'approvisionnement",
      path: "/tracabilite",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Certification des captures",
      path: "/certification",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - ECOSPECHE</title>
        <meta name="description" content="Tableau de bord ECOSPECHE pour la gestion de vos activités maritimes durables." />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-maritime p-8 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">
                    Bienvenue, {user.name} !
                  </h1>
                  <p className="text-gray-700 text-lg">
                    Tableau de bord ECOSPECHE - {user.company}
                  </p>
                  <p className="text-emerald-800 mt-2">
                    Gérez vos activités maritimes durables en toute simplicité
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Ship className="w-16 h-16 text-emerald-800" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="card-maritime p-6 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <TrendingUp className="w-4 h-4 text-emerald-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accès rapide aux fonctionnalités</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    className="card-maritime p-6 rounded-xl cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => navigate(action.path)}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-gray-900" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {action.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-maritime p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité récente</h2>
              
              <div className="space-y-4">
                {[
                  { action: "Nouvelle certification", item: "Thon rouge - Lot #TR2024-001", time: "Il y a 2 heures", icon: Award, color: "text-orange-600" },
                  { action: "Contrôle qualité", item: "Sardines - Zone Atlantique Nord", time: "Il y a 4 heures", icon: Shield, color: "text-green-600" },
                  { action: "Mise à jour traçabilité", item: "Anchois - Bateau Neptune", time: "Il y a 6 heures", icon: Activity, color: "text-blue-600" }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <Icon className={`w-8 h-8 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.action}</p>
                        <p className="text-gray-600 text-sm">{activity.item}</p>
                      </div>
                      <span className="text-gray-500 text-xs">{activity.time}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
