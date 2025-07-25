
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';
import Dashboard from '@/pages/Dashboard';
import References from '@/pages/References';
import SuiviControle from '@/pages/SuiviControle';
import Tracabilite from '@/pages/Tracabilite';
import Certification from '@/pages/Certification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/references" element={<References />} />
            <Route path="/suivi-controle" element={<SuiviControle />} />
            <Route path="/tracabilite" element={<Tracabilite />} />
            <Route path="/certification" element={<Certification />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
