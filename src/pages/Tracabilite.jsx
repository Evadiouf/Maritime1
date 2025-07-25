
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Package, Users, BarChart2, PlusCircle, Anchor, FileText, QrCode, ShoppingCart } from 'lucide-react';

const Tracabilite = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleAction = (action, item) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine invite ! 🚀",
      description: `${action} ${item ? `pour ${item}` : ''} bientôt disponible.`
    });
  };

  const debarquementsData = [
    { id: 1, navire: "Neptune Explorer", maree: "MAR-0724-A", date: "2024-07-23", quantite: "5 tonnes" },
    { id: 2, navire: "Sea Harmony", maree: "MAR-0724-B", date: "2024-07-22", quantite: "3.5 tonnes" },
  ];

  const capturesData = [
    { id: 1, traceId: "NEX-M0724A-THO", espece: "Thon Rouge", quantite: "2 tonnes", operateur: "Opérateur A" },
    { id: 2, traceId: "SHA-M0724B-SAR", espece: "Sardine", quantite: "1.5 tonnes", operateur: "Opérateur B" },
  ];

  const stocksData = [
    { id: 1, operateur: "Opérateur A", espece: "Thon Rouge", stock: "1.8 tonnes" },
    { id: 2, operateur: "Opérateur B", espece: "Sardine", stock: "1.2 tonnes" },
  ];

  const commercialisationData = [
    { id: 1, operateur: "Opérateur A", produit: "Lot THO-A-001", destination: "Client X", status: "Livré" },
    { id: 2, operateur: "Opérateur B", produit: "Lot SAR-B-001", destination: "Client Y", status: "En transit" },
  ];

  const renderCardList = (title, data, renderItem, addAction) => (
      <div className="card-maritime p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              {addAction && <Button size="sm" className="btn-ocean" onClick={addAction.handler}><PlusCircle className="w-4 h-4 mr-2"/>{addAction.label}</Button>}
          </div>
          <div className="space-y-4">
              {data.map(item => renderItem(item))}
          </div>
      </div>
  );

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-800"></div></div>;
  }

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Traçabilité - ECOSPECHE</title>
        <meta name="description" content="Traçage complet de la chaîne d'approvisionnement maritime." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="card-maritime p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">Traçabilité des Captures</h1>
                  <p className="text-gray-700 text-lg">De la capture à la commercialisation</p>
                </div>
                <Shield className="w-16 h-16 text-emerald-800" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="debarquements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="debarquements"><Anchor className="w-4 h-4 mr-2" />Débarquements</TabsTrigger>
                <TabsTrigger value="affectation"><Package className="w-4 h-4 mr-2" />Affectation & Traçage</TabsTrigger>
                <TabsTrigger value="stocks"><BarChart2 className="w-4 h-4 mr-2" />Stocks Opérateurs</TabsTrigger>
                <TabsTrigger value="commercialisation"><ShoppingCart className="w-4 h-4 mr-2" />Commercialisation</TabsTrigger>
              </TabsList>

              <TabsContent value="debarquements" className="mt-6">
                {renderCardList("Gestion des débarquements", debarquementsData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                        <p className="font-semibold text-gray-900">{item.navire} - Marée {item.maree}</p>
                        <p className="text-sm text-gray-600">Date: {item.date} - Quantité: {item.quantite}</p>
                    </div>
                ), { label: "Nouveau débarquement", handler: () => handleAction("Enregistrer un débarquement") })}
              </TabsContent>

              <TabsContent value="affectation" className="mt-6">
                {renderCardList("Enregistrement et affectation des captures", capturesData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900">ID: {item.traceId}</p>
                        <p className="text-sm text-gray-600">{item.espece} ({item.quantite}) - Assigné à: {item.operateur}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleAction("Voir détails", item.traceId)}><QrCode className="w-4 h-4 mr-2" />Traçer</Button>
                    </div>
                ), { label: "Attribuer un numéro", handler: () => handleAction("Attribuer un numéro de traçage") })}
              </TabsContent>

              <TabsContent value="stocks" className="mt-6">
                {renderCardList("Suivi des stocks des opérateurs", stocksData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                       <div>
                        <p className="font-semibold text-gray-900">Opérateur: {item.operateur}</p>
                        <p className="text-sm text-gray-600">{item.espece}</p>
                       </div>
                       <p className="text-lg font-bold text-emerald-800">{item.stock}</p>
                    </div>
                ))}
              </TabsContent>

              <TabsContent value="commercialisation" className="mt-6">
                {renderCardList("Suivi de la commercialisation", commercialisationData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                        <p className="font-semibold text-gray-900">Lot: {item.produit} (Opérateur: {item.operateur})</p>
                        <p className="text-sm text-gray-600">Destination: {item.destination} - Statut: <span className="font-medium">{item.status}</span></p>
                    </div>
                ))}
              </TabsContent>

            </Tabs>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Tracabilite;