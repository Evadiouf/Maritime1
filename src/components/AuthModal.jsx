
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Ship } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && (!formData.name || !formData.company)) {
      toast({
        title: "Erreur", 
        description: "Veuillez remplir tous les champs pour l'inscription",
        variant: "destructive"
      });
      return;
    }

    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.name || 'Utilisateur',
      company: formData.company || 'ECOSPECHE',
      role: 'maritime_professional'
    };

    login(userData);
    
    toast({
      title: isLogin ? "Connexion réussie !" : "Inscription réussie !",
      description: `Bienvenue ${userData.name} dans ECOSPECHE`
    });

    onClose();
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-emerald-400/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gradient flex items-center justify-center gap-2">
            <Ship className="w-6 h-6 text-emerald-400" />
            {isLogin ? 'Connexion' : 'Inscription'}
          </DialogTitle>
        </DialogHeader>

        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-emerald-100 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom complet
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass-effect border-emerald-400/30 text-white placeholder:text-gray-300"
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-emerald-100 flex items-center gap-2">
                  <Ship className="w-4 h-4" />
                  Entreprise maritime
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="glass-effect border-emerald-400/30 text-white placeholder:text-gray-300"
                  placeholder="Nom de votre entreprise"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-emerald-100 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="glass-effect border-emerald-400/30 text-white placeholder:text-gray-300"
              placeholder="votre@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-emerald-100 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="glass-effect border-emerald-400/30 text-white placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full btn-ocean text-white font-semibold py-3 rounded-lg"
          >
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-300 hover:text-emerald-200 transition-colors underline"
            >
              {isLogin 
                ? "Pas encore de compte ? S'inscrire" 
                : "Déjà un compte ? Se connecter"
              }
            </button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
