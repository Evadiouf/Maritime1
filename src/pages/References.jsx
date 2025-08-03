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
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet';
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
    { id: 1, name: "Unité Delta", zone: "Soumbédioune" },
    { id: 2, name: "Unité Gamma", zone: "Saint-Louis" },
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
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Zones de Capture</h2>
                  </div>
                  
                  {/* Formulaire d'ajout de zone */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Nouvelle Zone de Capture</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nom de la zone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la zone *
                        </label>
                        <Input 
                          placeholder="Ex: Zone de pêche au large de Dakar"
                          className="w-full"
                        />
                      </div>

                      {/* Espèces */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Espèces autorisées *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                          <option value="">Sélectionner les espèces</option>
                          <option value="thon-rouge">Thon rouge</option>
                          <option value="sardine">Sardine</option>
                          <option value="sardinelle">Sardinelle</option>
                          <option value="crevette">Crevette</option>
                          <option value="merou">Mérou</option>
                          <option value="barracuda">Barracuda</option>
                        </select>
                      </div>

                      {/* Période d'ouverture */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Période d'ouverture
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input 
                            type="date" 
                            placeholder="Date d'ouverture"
                            className="w-full"
                          />
                          <Input 
                            type="date" 
                            placeholder="Date de fermeture"
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Coordonnées GPS */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Coordonnées GPS (minimum 3 points) *
                        </label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Latitude 1"
                              className="flex-1"
                            />
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Longitude 1"
                              className="flex-1"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Latitude 2"
                              className="flex-1"
                            />
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Longitude 2"
                              className="flex-1"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Latitude 3"
                              className="flex-1"
                            />
                            <Input 
                              type="number" 
                              step="any"
                              placeholder="Longitude 3"
                              className="flex-1"
                            />
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            + Ajouter un point supplémentaire
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button className="btn-ocean">
                        Enregistrer la zone
                      </Button>
                      <Button variant="outline">
                        Annuler
                      </Button>
                    </div>
                  </div>

                  {/* Carte de pêche détaillée */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Carte de Pêche - Côte Sénégalaise</h3>
                    <div className="h-[600px] w-full rounded-lg overflow-hidden border-2 border-emerald-200 relative">
                      <MapContainer center={[14.7167, -17.4677]} zoom={8} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {/* Zone A - Dakar Offshore */}
                        <Polygon 
                          positions={[
                            [14.8, -17.6], [14.9, -17.6], [14.9, -17.4], [14.8, -17.4], [14.8, -17.6]
                          ]}
                          pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.3, weight: 2 }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-blue-700">Zone A - Dakar Offshore</h3>
                              <p className="text-sm text-gray-600"><strong>Espèces:</strong> Thon rouge, Barracuda</p>
                              <p className="text-sm text-gray-600"><strong>Période:</strong> Janvier - Juin</p>
                              <p className="text-xs text-gray-400">Profondeur: 50-200m</p>
                            </div>
                          </Popup>
                        </Polygon>

                        {/* Zone B - Saint-Louis Coastal */}
                        <Polygon 
                          positions={[
                            [16.0, -16.6], [16.1, -16.6], [16.1, -16.4], [16.0, -16.4], [16.0, -16.6]
                          ]}
                          pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.3, weight: 2 }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-emerald-700">Zone B - Saint-Louis Coastal</h3>
                              <p className="text-sm text-gray-600"><strong>Espèces:</strong> Sardine, Sardinelle</p>
                              <p className="text-sm text-gray-600"><strong>Période:</strong> Octobre - Mars</p>
                              <p className="text-xs text-gray-400">Profondeur: 20-100m</p>
                            </div>
                          </Popup>
                        </Polygon>

                        {/* Zone C - Thiès Shelf */}
                        <Polygon 
                          positions={[
                            [14.6, -17.2], [14.7, -17.2], [14.7, -17.0], [14.6, -17.0], [14.6, -17.2]
                          ]}
                          pathOptions={{ color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.3, weight: 2 }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-amber-700">Zone C - Thiès Shelf</h3>
                              <p className="text-sm text-gray-600"><strong>Espèces:</strong> Mérou, Crevette</p>
                              <p className="text-sm text-gray-600"><strong>Période:</strong> Avril - Septembre</p>
                              <p className="text-xs text-gray-400">Profondeur: 30-150m</p>
                            </div>
                          </Popup>
                        </Polygon>

                        {/* Zone D - Sine-Saloum Delta */}
                        <Polygon 
                          positions={[
                            [13.8, -16.8], [13.9, -16.8], [13.9, -16.6], [13.8, -16.6], [13.8, -16.8]
                          ]}
                          pathOptions={{ color: '#8B5CF6', fillColor: '#8B5CF6', fillOpacity: 0.3, weight: 2 }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-purple-700">Zone D - Sine-Saloum Delta</h3>
                              <p className="text-sm text-gray-600"><strong>Espèces:</strong> Crevette, Poisson-chat</p>
                              <p className="text-sm text-gray-600"><strong>Période:</strong> Toute l'année</p>
                              <p className="text-xs text-gray-400">Profondeur: 5-50m</p>
                            </div>
                          </Popup>
                        </Polygon>

                        {/* Villes principales */}
                        <Marker position={[14.7167, -17.4677]} icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: '<div style="background-color: #DC2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                          iconSize: [12, 12],
                          iconAnchor: [6, 6]
                        })}>
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-red-700">Dakar</h3>
                              <p className="text-sm text-gray-600">Capitale du Sénégal</p>
                            </div>
                          </Popup>
                        </Marker>

                        <Marker position={[16.0333, -16.5000]} icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: '<div style="background-color: #DC2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                          iconSize: [12, 12],
                          iconAnchor: [6, 6]
                        })}>
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-red-700">Saint-Louis</h3>
                              <p className="text-sm text-gray-600">Ancienne capitale</p>
                            </div>
                          </Popup>
                        </Marker>

                        <Marker position={[14.7833, -16.9333]} icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: '<div style="background-color: #DC2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                          iconSize: [12, 12],
                          iconAnchor: [6, 6]
                        })}>
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-red-700">Thiès</h3>
                              <p className="text-sm text-gray-600">Ville industrielle</p>
                            </div>
                          </Popup>
                        </Marker>

                        <Marker position={[14.1667, -16.8333]} icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: '<div style="background-color: #DC2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                          iconSize: [12, 12],
                          iconAnchor: [6, 6]
                        })}>
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-red-700">Kaolack</h3>
                              <p className="text-sm text-gray-600">Port fluvial</p>
                            </div>
                          </Popup>
                        </Marker>

                        {/* Frontière maritime */}
                        <Polyline 
                          positions={[
                            [12.5, -16.8], [12.5, -17.5], [12.5, -18.0]
                          ]}
                          pathOptions={{ color: '#1F2937', weight: 3, dashArray: '10, 5' }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <h3 className="font-bold text-md text-gray-700">Frontière Maritime</h3>
                              <p className="text-sm text-gray-600">Limite des eaux territoriales</p>
                            </div>
                          </Popup>
                        </Polyline>

                      </MapContainer>

                      {/* Légende */}
                      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs">
                        <h4 className="font-bold text-sm text-gray-800 mb-3">Légende des Zones</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span><strong>Zone A:</strong> Thon rouge, Barracuda</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                            <span><strong>Zone B:</strong> Sardine, Sardinelle</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-amber-500 rounded"></div>
                            <span><strong>Zone C:</strong> Mérou, Crevette</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <span><strong>Zone D:</strong> Crevette, Poisson-chat</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            <span>Villes principales</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-gray-700 border-dashed border-2"></div>
                            <span>Frontière maritime</span>
                          </div>
                        </div>
                      </div>
                    </div>
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