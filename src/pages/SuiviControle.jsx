
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ShieldCheck, Anchor, Fish, Ship, PlusCircle, FilePlus, Award, CheckSquare, Eye } from 'lucide-react';

const SuiviControle = () => {
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

  const patrouillesData = [
    { id: 1, mission: "PAT-001", zone: "Atlantique Nord-Est", debut: "2024-07-20", fin: "2024-07-25", status: "Terminée" },
    { id: 2, mission: "PAT-002", zone: "Méditerranée", debut: "2024-07-23", fin: "2024-07-28", status: "En cours" },
  ];

  const inspectionsMerData = [
    { id: 1, navire: "Salty Dog", date: "2024-07-21", resultat: "Conforme" },
    { id: 2, navire: "Wanderer", date: "2024-07-24", resultat: "Non-conformité mineure" },
  ];

  const capturesData = [
    { id: 1, navire: "Salty Dog", espece: "Thon", quantite: "2 tonnes", date: "2024-07-21" },
  ];

  const inspectionsQuaiData = [
    { id: 1, navire: "Neptune Explorer", date: "2024-07-19", resultat: "Conforme" },
  ];
  
  const debarquementsData = [
    { id: 1, navire: "Neptune Explorer", espece: "Thon", quantite: "5 tonnes", date: "2024-07-19" },
  ];

  const certificationsData = [
      { id: 1, operation: "PAT-001", autorite: "Direction des Pêches", status: "Validé" },
      { id: 2, operation: "INSP-Q-005", autorite: "Garde Côtière", status: "En attente de validation" },
  ]

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
        <title>Suivi et Contrôle - ECOSPECHE</title>
        <meta name="description" content="Suivi des opérations de surveillance, contrôle et certification." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="card-maritime p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">Suivi et Contrôles</h1>
                  <p className="text-gray-700 text-lg">Gestion des opérations de surveillance, inspections et certifications</p>
                </div>
                <Activity className="w-16 h-16 text-emerald-800" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="surveillance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="surveillance"><Eye className="w-4 h-4 mr-2" />Surveillance</TabsTrigger>
                <TabsTrigger value="controles"><ShieldCheck className="w-4 h-4 mr-2" />Contrôles</TabsTrigger>
                <TabsTrigger value="certification"><Award className="w-4 h-4 mr-2" />Certification</TabsTrigger>
              </TabsList>
              
              <TabsContent value="surveillance">
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {renderCardList("Enregistrement des patrouilles", patrouillesData, item => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                            <div><p className="font-semibold text-gray-900">{item.mission}</p><p className="text-sm text-gray-600">{item.zone}</p></div>
                            <span className="text-sm font-medium">{item.status}</span>
                        </div>
                    ), { label: "Nouvelle patrouille", handler: () => handleAction("Enregistrer une nouvelle patrouille") })}

                    {renderCardList("Suivi des résultats de patrouilles", patrouillesData, item => (
                         <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                            <div><p className="font-semibold text-gray-900">{item.mission}</p><p className="text-sm text-gray-600">{item.status}</p></div>
                            <Button variant="outline" size="sm" onClick={() => handleAction("Voir les résultats", item.mission)}>Résultats</Button>
                        </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="controles">
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    {renderCardList("Inspections en mer", inspectionsMerData, item => (
                         <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                            <div><p className="font-semibold text-gray-900">{item.navire}</p><p className="text-sm text-gray-600">{item.date}</p></div>
                            <span className="text-sm font-medium">{item.resultat}</span>
                        </div>
                    ), { label: "Nouvelle inspection", handler: () => handleAction("Enregistrer une inspection en mer") })}

                    {renderCardList("Captures en mer", capturesData, item => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                            <p className="font-semibold text-gray-900">{item.navire}</p>
                            <p className="text-sm text-gray-600">{item.espece} - {item.quantite} ({item.date})</p>
                        </div>
                    ), { label: "Nouvelle capture", handler: () => handleAction("Enregistrer une capture en mer") })}
                    
                    {renderCardList("Inspections à quai", inspectionsQuaiData, item => (
                         <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                            <div><p className="font-semibold text-gray-900">{item.navire}</p><p className="text-sm text-gray-600">{item.date}</p></div>
                            <span className="text-sm font-medium">{item.resultat}</span>
                        </div>
                    ), { label: "Nouvelle inspection", handler: () => handleAction("Enregistrer une inspection à quai") })}

                    {renderCardList("Débarquements", debarquementsData, item => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100">
                            <p className="font-semibold text-gray-900">{item.navire}</p>
                            <p className="text-sm text-gray-600">{item.espece} - {item.quantite} ({item.date})</p>
                        </div>
                    ), { label: "Nouveau débarquement", handler: () => handleAction("Enregistrer un débarquement") })}
                </div>
              </TabsContent>

               <TabsContent value="certification">
                <div className="mt-6">
                    {renderCardList("Validation des opérations par une autorité désignée", certificationsData, item => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100">
                            <div><p className="font-semibold text-gray-900">{item.operation}</p><p className="text-sm text-gray-600">Autorité: {item.autorite}</p></div>
                            <div>
                                <span className={`mr-4 text-sm font-medium ${item.status === 'Validé' ? 'text-green-800' : 'text-orange-800'}`}>{item.status}</span>
                                <Button variant="outline" size="sm" onClick={() => handleAction("Valider l'opération", item.operation)}>Valider</Button>
                            </div>
                        </div>
                    ), { label: "Soumettre pour validation", handler: () => handleAction("Soumettre une opération") })}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default SuiviControle;
