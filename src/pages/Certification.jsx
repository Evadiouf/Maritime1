
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FileText, CheckSquare, BarChart2, Archive, PlusCircle, Download } from 'lucide-react';

const Certification = () => {
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

  const demandesData = [
    { id: 1, lot: "Lot THO-A-001", operateur: "Opérateur A", date: "2024-07-20", status: "En vérification" },
    { id: 2, lot: "Lot SAR-B-001", operateur: "Opérateur B", date: "2024-07-22", status: "Soumis" },
  ];

  const verificationsData = [
    { id: 1, lot: "Lot THO-A-001", status: "Vérification stocks OK", notes: "Débit de 200kg appliqué" },
  ];
  
  const stocksDebitsData = [
    { id: 1, operateur: "Opérateur A", espece: "Thon Rouge", debit: "200 kg", motif: "Certificat #C001" },
  ];

  const archivesData = [
    { id: 1, certificat: "CERT-2024-07-001", lot: "Lot MER-C-050", date: "2024-07-15" },
    { id: 2, certificat: "CERT-2024-07-002", lot: "Lot BAR-D-032", date: "2024-07-18" },
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
        <title>Certification des Captures - ECOSPECHE</title>
        <meta name="description" content="Processus de certification des captures de pêche." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="card-maritime p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">Certification des Captures</h1>
                  <p className="text-gray-700 text-lg">Processus de soumission, vérification et archivage</p>
                </div>
                <Award className="w-16 h-16 text-emerald-800" />
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="demandes" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="demandes"><FileText className="w-4 h-4 mr-2" />Soumission</TabsTrigger>
                <TabsTrigger value="verification"><CheckSquare className="w-4 h-4 mr-2" />Vérification</TabsTrigger>
                <TabsTrigger value="debits"><BarChart2 className="w-4 h-4 mr-2" />Débit des Stocks</TabsTrigger>
                <TabsTrigger value="archivage"><Archive className="w-4 h-4 mr-2" />Archivage</TabsTrigger>
              </TabsList>

              <TabsContent value="demandes" className="mt-6">
                 {renderCardList("Soumission des demandes de certification", demandesData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                        <div>
                          <p className="font-semibold text-gray-900">Lot: {item.lot}</p>
                          <p className="text-sm text-gray-600">Opérateur: {item.operateur} - Date: {item.date}</p>
                        </div>
                        <span className="text-sm font-medium">{item.status}</span>
                    </div>
                ), { label: "Nouvelle Demande", handler: () => handleAction("Soumettre une nouvelle demande") })}
              </TabsContent>

              <TabsContent value="verification" className="mt-6">
                {renderCardList("Vérification des captures", verificationsData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                        <p className="font-semibold text-gray-900">Lot: {item.lot}</p>
                        <p className="text-sm text-gray-600">Statut: <span className="font-medium text-emerald-700">{item.status}</span></p>
                        <p className="text-xs text-gray-500 mt-1">Note: {item.notes}</p>
                    </div>
                ), { label: "Vérifier une capture", handler: () => handleAction("Lancer une vérification") })}
              </TabsContent>
              
              <TabsContent value="debits" className="mt-6">
                {renderCardList("Débit des stocks d'opérateurs", stocksDebitsData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                       <div>
                          <p className="font-semibold text-gray-900">Opérateur: {item.operateur} ({item.espece})</p>
                          <p className="text-sm text-gray-600">Motif: {item.motif}</p>
                       </div>
                       <p className="text-lg font-bold text-orange-800">-{item.debit}</p>
                    </div>
                ))}
              </TabsContent>

              <TabsContent value="archivage" className="mt-6">
                {renderCardList("Archivage des certificats de capture", archivesData, item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                        <div>
                          <p className="font-semibold text-gray-900">{item.certificat}</p>
                          <p className="text-sm text-gray-600">Lot: {item.lot} - Date: {item.date}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleAction("Télécharger", item.certificat)}><Download className="w-4 h-4 mr-2" />Télécharger</Button>
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

export default Certification;
