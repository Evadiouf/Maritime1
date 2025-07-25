
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { Ship, Waves, Fish, Shield, Award, Activity, Database, Anchor } from 'lucide-react';

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const features = [
    {
      icon: Database,
      title: "Références",
      description: "Base de données complète des espèces marines et réglementations"
    },
    {
      icon: Activity,
      title: "Suivi et contrôle",
      description: "Monitoring en temps réel des activités de pêche"
    },
    {
      icon: Shield,
      title: "Traçabilité",
      description: "Traçage complet de la chaîne d'approvisionnement"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Certification des captures selon les standards internationaux"
    }
  ];

  return (
    <>
      <Helmet>
        <title>ECOSPECHE - Plateforme Maritime Durable</title>
        <meta name="description" content="ECOSPECHE est une plateforme innovante pour la gestion durable des ressources maritimes avec traçabilité complète et certification des captures." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 wave-pattern opacity-10"></div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-emerald-700/40" /* Adjusted opacity and shade */
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Fish className="w-16 h-16" />
        </motion.div>
        
        <motion.div 
          className="absolute top-40 right-20 text-blue-700/40" /* Adjusted opacity and shade */
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Waves className="w-20 h-20" />
        </motion.div>

        <motion.div 
          className="absolute bottom-20 left-20 text-emerald-700/40" /* Adjusted opacity and shade */
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Anchor className="w-12 h-12" />
        </motion.div>

        {/* Header */}
        <header className="relative z-10 px-6 py-8">
          <motion.div 
            className="max-w-7xl mx-auto flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <Ship className="w-10 h-10 text-emerald-800" />
              <span className="text-2xl font-bold text-gradient">ECOSPECHE</span>
            </div>
            
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-ocean px-8 py-3 text-lg font-semibold"
            >
              S'inscrire
            </Button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Logo */}
              <motion.div 
                className="mb-12 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full glass-effect flex items-center justify-center border-2 border-emerald-400/30">
                    <Ship className="w-16 h-16 text-emerald-800" />
                  </div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Fish className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="text-gradient">ECOSPECHE</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Plateforme innovante pour la gestion durable des ressources maritimes. 
                Traçabilité complète, contrôle qualité et certification des captures 
                pour un océan préservé.
              </p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-ocean px-12 py-4 text-xl font-bold"
                  size="lg"
                >
                  Rejoindre ECOSPECHE
                </Button>
                
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Certifié ISO 14001</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="card-maritime p-6 rounded-xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-800 to-blue-800 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-700 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Project Description */}
            <motion.div 
              className="card-maritime p-8 rounded-2xl max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-3xl font-bold text-gradient mb-6 text-center">Notre Mission</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ECOSPECHE révolutionne l'industrie maritime en offrant une plateforme 
                    complète de gestion durable des ressources océaniques. Notre technologie 
                    avancée permet un suivi en temps réel, une traçabilité transparente et 
                    une certification rigoureuse.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Ensemble, construisons un avenir où la pêche responsable et la préservation 
                    marine vont de pair pour les générations futures.
                  </p>
                </div>
                <div className="text-center">
                  <img  
                    className="w-full h-64 object-cover rounded-xl"
                    alt="Pêche durable en mer"
                   src="https://images.unsplash.com/photo-1628213524301-2662fc2de56e" />
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-20 border-t border-emerald-400/30 glass-effect">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Ship className="w-6 h-6 text-emerald-800" />
                <span className="text-lg font-semibold text-gradient">ECOSPECHE</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>© 2024 ECOSPECHE. Tous droits réservés.</span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Plateforme sécurisée</span>
                </span>
              </div>
            </div>
          </div>
        </footer>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </>
  );
};

export default HomePage;
