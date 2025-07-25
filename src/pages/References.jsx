import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Search, Fish, Ship, FileText, Anchor, PlusCircle, List, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const References = () => {
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

  const naviresData = [
    { id: 1, name: "Neptune Explorer", type: "Thonier", status: "Actif" },
    { id: 2, name: "Ocean Guardian", type: "Chalutier", status: "En maintenance" },
    { id: 3, name: "Sea Harmony", type: "Sardinier", status: "Actif" },
  ];

  const licencesData = [
    { id: 1, navire: "Neptune Explorer", licence: "LIC-ATL-001", expiration: "2025-12-31" },
    { id: 2, navire: "Sea Harmony", licence: "LIC-MED-005", expiration: "2024-08-15" },
  ];

  const unitesData = [
    { id: 1, name: "Unité Delta", zone: "Atlantique Nord-Est" },
    { id: 2, name: "Unité Gamma", zone: "Méditerranée" },
  ];

  const especesData = [
    { id: 1, name: "Thon rouge", scientificName: "Thunnus thynnus", status: "Réglementé" },
    { id: 2, name: "Sardine", scientificName: "Sardina pilchardus", status: "Autorisé" },
  ];

  const captureZonesData = [
    { id: 1, position: [14.7336, -17.4583], espece: "Thon rouge", quantite: "1.2 tonnes" },
    { id: 2, position: [14.4974, -17.0378], espece: "Sardinelle", quantite: "3 tonnes" },
    { id: 3, position: [16.0333, -16.5000], espece: "Mérou", quantite: "800 kg" },
    { id: 4, position: [12.5667, -16.7667], espece: "Crevette", quantite: "500 kg" },
  ];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-800"></div></div>;
  }

  if (!user) return null;

  const renderTable = (headers, data, renderRow) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {headers.map(header => <th key={header} scope="col" className="px-6 py-3">{header}</th>)}
            <th scope="col" className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => renderRow(item))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Références - ECOSPECHE</title>
        <meta name="description" content="Base de données de références pour la gestion de la pêche." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="card-maritime p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">Base de Références</h1>
                  <p className="text-gray-700 text-lg">Gestion des navires, licences, unités, espèces et zones de capture</p>
                </div>
                <Database className="w-16 h-16 text-emerald-800" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="navires" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="navires"><Ship className="w-4 h-4 mr-2" />Navires</TabsTrigger>
                <TabsTrigger value="licences"><FileText className="w-4 h-4 mr-2" />Licences</TabsTrigger>
                <TabsTrigger value="unites"><Anchor className="w-4 h-4 mr-2" />Unités de surveillance</TabsTrigger>
                <TabsTrigger value="especes"><Fish className="w-4 h-4 mr-2" />Espèces</TabsTrigger>
                <TabsTrigger value="zones"><MapPin className="w-4 h-4 mr-2" />Zones de Capture</TabsTrigger>
              </TabsList>
              
              <TabsContent value="navires">
                <div className="card-maritime p-6 rounded-xl mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Registre des navires de pêche</h2>
                    <Button className="btn-ocean" onClick={() => handleAction("Ajouter un navire")}><PlusCircle className="w-4 h-4 mr-2"/>Ajouter</Button>
                  </div>
                  {renderTable(
                    ["Nom", "Type", "Statut"],
                    naviresData,
                    (item) => (
                      <tr key={item.id} className="bg-gray-50 border-b border-gray-100 hover:bg-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4">{item.type}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" onClick={() => handleAction("Voir les détails", item.name)}>Détails</Button></td>
                      </tr>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="licences">
                <div className="card-maritime p-6 rounded-xl mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liste et historique des licences</h2>
                  {renderTable(
                    ["Navire", "N° Licence", "Expiration"],
                    licencesData,
                    (item) => (
                      <tr key={item.id} className="bg-gray-50 border-b border-gray-100 hover:bg-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.navire}</td>
                        <td className="px-6 py-4">{item.licence}</td>
                        <td className="px-6 py-4">{item.expiration}</td>
                        <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" onClick={() => handleAction("Voir l'historique", item.licence)}>Historique</Button></td>
                      </tr>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unites">
                <div className="card-maritime p-6 rounded-xl mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liste des unités de surveillance</h2>
                  {renderTable(
                    ["Nom de l'unité", "Zone de couverture"],
                    unitesData,
                    (item) => (
                      <tr key={item.id} className="bg-gray-50 border-b border-gray-100 hover:bg-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4">{item.zone}</td>
                        <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" onClick={() => handleAction("Voir les affectations", item.name)}>Affectations</Button></td>
                      </tr>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="especes">
                <div className="card-maritime p-6 rounded-xl mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liste des espèces usuelles</h2>
                  {renderTable(
                    ["Nom commun", "Nom scientifique", "Statut"],
                    especesData,
                    (item) => (
                      <tr key={item.id} className="bg-gray-50 border-b border-gray-100 hover:bg-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 italic">{item.scientificName}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" onClick={() => handleAction("Consulter la fiche", item.name)}>Fiche</Button></td>
                      </tr>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="zones">
                <div className="card-maritime p-6 rounded-xl mt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Carte des Zones de Capture</h2>
                  <div className="h-[600px] w-full rounded-lg overflow-hidden border-2 border-emerald-200">
                    <MapContainer center={[14.5, -14.5]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {captureZonesData.map(zone => (
                        <Marker key={zone.id} position={zone.position}>
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-emerald-700">{zone.espece}</h3>
                              <p className="text-sm text-gray-600">Quantité: {zone.quantite}</p>
                              <p className="text-xs text-gray-400">
                                Lat: {zone.position[0]}, Lon: {zone.position[1]}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default References;