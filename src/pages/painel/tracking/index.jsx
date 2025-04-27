// // import { Container_tracking } from "./styles";
// // import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import americaDoSul from '../../../geojson/custom.geo.json';
// // import L from 'leaflet';
// // import { useState, useEffect } from 'react';
// // import CaminhaoImg from '../../../assets/caminhao.png';

// // // Dados fictícios dos veículos
// // const vehicleData = [
// //     { id: 1, vehicle: "Veículo A", latitude: -7.756615, longitude: -40.271313 },
// //     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
// //     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 }
// // ];

// // const Tracking = () => {
// //     const center = [-15.7801, -47.9292]; // Coordenadas aproximadas do centro da América do Sul

// //     const [vehicles, setVehicles] = useState(vehicleData); // Dados dos veículos

// //     const customStyle = {
// //         fillColor: 'transparent', // Torna o preenchimento transparente
// //         weight: 0,                // Define a espessura da borda
// //         color: 'blue',            // Define a cor da borda
// //         opacity: 1,               // Define a opacidade da borda
// //         fillOpacity: 0            // Torna o preenchimento completamente transparente
// //     };

// //     useEffect(() => {
// //         // Aqui você pode colocar código para atualizar os veículos em tempo real,
// //         // como uma chamada para uma API que traga as coordenadas atualizadas dos veículos.
// //     }, []);

// //     return (
// //         <Container_tracking>
// //             <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
// //                 {/* Camada de Satélite - Esri World Imagery */}
// //                 <TileLayer
// //                     url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// //                     attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
// //                 />
// //                 {/* Camada de Rótulos e Estradas - Esri */}
// //                 <TileLayer
// //                     url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
// //                     attribution="Labels © Esri"
// //                 />
// //                 {/* GeoJSON - América do Sul */}
// //                 <GeoJSON data={americaDoSul} style={customStyle} />
                
// //                 {/* Marcadores para cada veículo */}
// //                 {vehicles.map(vehicle => (
// //                     <Marker 
// //                         key={vehicle.id}
// //                         position={[vehicle.latitude, vehicle.longitude]}
// //                         icon={new L.Icon({
// //                             iconUrl: CaminhaoImg, // Substitua pelo caminho do seu ícone
// //                             iconSize: [32, 32], // Tamanho do ícone
// //                             iconAnchor: [16, 32], // Posição do ponto de ancoragem
// //                             popupAnchor: [0, -32], // Posição do popup
// //                         })}
// //                     >
// //                         <Popup>
// //                             {vehicle.vehicle}<br />
// //                             Localização: {vehicle.latitude}, {vehicle.longitude}
// //                         </Popup>
// //                     </Marker>
// //                 ))}
// //             </MapContainer>
// //         </Container_tracking>
// //     );
// // };

// // export default Tracking;

// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import americaDoSul from "../../../geojson/custom.geo.json";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// import CaminhaoImg from "../../../assets/caminhao.png";

// // Dados fictícios dos veículos
// const vehicleData = [
//     { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167 },
//     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
//     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 },
// ];

// const Tracking = () => {
//     const [vehicles, setVehicles] = useState(vehicleData);

//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     // Calcula centro e zoom dinamicamente
//     const calculateMapBounds = (vehicles) => {
//         if (vehicles.length === 0)
//             return { center: [-15.7801, -47.9292], zoom: 0 };

//         const latitudes = vehicles.map((v) => v.latitude);
//         const longitudes = vehicles.map((v) => v.longitude);
//         const minLat = Math.min(...latitudes);
//         const maxLat = Math.max(...latitudes);
//         const minLng = Math.min(...longitudes);
//         const maxLng = Math.max(...longitudes);

//         const center = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
//         const zoom = Math.min(
//             100,
//             Math.floor(
//                 Math.log2(360 / Math.max(maxLat - minLat, maxLng - minLng))
//             )
//         );

//         return { center, zoom };
//     };

//     const { center, zoom } = calculateMapBounds(vehicles);

//     // Simulação de rastreamento em tempo real
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setVehicles((prevVehicles) =>
//                 prevVehicles.map((vehicle) => ({
//                     ...vehicle,
//                     latitude: vehicle.latitude + (Math.random() - 0.5) * 0.001,
//                     longitude: vehicle.longitude + (Math.random() - 0.5) * 0.001,
//                 }))
//             );
//         }, 5000); // Atualiza a cada 5 segundos

//         return () => clearInterval(interval);
//     }, []);

//     // Ícone padrão
//     const defaultIcon = new L.Icon({
//         iconUrl: CaminhaoImg,
//         iconSize: [32, 32],
//         iconAnchor: [16, 32],
//         popupAnchor: [0, -32],
//     });

//     // GeoJSON seguro
//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 maxZoom={19} // Permite zoom até o nível 19
//                 style={{ height: "100vh", width: "100%" }}
//             >
//                 {/* Camada de Rótulos - OpenStreetMap */}
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     maxZoom={18} // Define o zoom máximo da camada
//                     minZoom={4} // Define o zoom mínimo da camada
//                     opacity={1} // Torna a camada de rótulos levemente transparente para harmonizar com a camada de satélite
//                 />
//                 {/* GeoJSON - América do Sul */}
//                 <GeoJSON data={safeGeoJSON} style={customStyle} />

//                 {/* Marcadores para cada veículo */}
//                 {vehicles.map((vehicle) => (
//                     <Marker
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={defaultIcon}
//                     >
//                         <Popup>
//                             <div>
//                                 <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px', }}>{vehicle.vehicle}</div>
//                                 <div style={{ display: 'flex',flexDirection: 'column', alignItems: 'center' }}> <span style={{ fontWeight: 'bold' }}>Localização</span>  {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}</div>
//                                 <button
//                                     onClick={() => window.open(`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`, '_blank')}
//                                     style={{
//                                         marginTop: '8px',
//                                         padding: '6px 10px',
//                                         backgroundColor: ' #FF9D00',
//                                         color: 'white',
//                                         border: 'none',
//                                         borderRadius: '4px',
//                                         cursor: 'pointer',
//                                         fontSize: '12px',
//                                         fontWeight: 'bold'
//                                     }}
//                                 >
//                                 Abrir no Google Maps
//                                 </button>
//                             </div>
//                         </Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
//         </Container_tracking>
//     );
// };

// export default Tracking;


import { Container_tracking } from "./styles";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import americaDoSul from "../../../geojson/custom.geo.json";
import L from "leaflet";
import { useState, useEffect } from "react";
import CaminhaoImg from "../../../assets/caminhao.png";

// Dados fictícios dos veículos
const vehicleData = [
    { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167 },
    { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
    { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 },
];

const Tracking = () => {
    const [vehicles, setVehicles] = useState(vehicleData);

    const targetLat = -7.759954;
    const targetLng = -40.264860;

    const customStyle = {
        fillColor: "transparent",
        weight: 0,
        color: "blue",
        opacity: 1,
        fillOpacity: 0,
    };

    const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 13 }; // Ajustei o centro

    // Função para calcular o próximo ponto a cada 10 metros
    const moveTowards = (currentLat, currentLng, targetLat, targetLng, distanceMeters) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const toDeg = (value) => (value * 180) / Math.PI;

        const R = 6378137; // Raio da Terra em metros
        const dLat = toRad(targetLat - currentLat);
        const dLng = toRad(targetLng - currentLng);

        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(toRad(currentLat)) * Math.cos(toRad(targetLat)) *
                  Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < distanceMeters) {
            return { lat: targetLat, lng: targetLng }; // Chegou no destino
        }

        const ratio = distanceMeters / distance;
        const newLat = currentLat + (targetLat - currentLat) * ratio;
        const newLng = currentLng + (targetLng - currentLng) * ratio;

        return { lat: newLat, lng: newLng };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) => {
                    if (vehicle.id !== 1) return vehicle; // Só move o Veículo A
                    const { lat, lng } = moveTowards(
                        vehicle.latitude,
                        vehicle.longitude,
                        targetLat,
                        targetLng,
                        10 // Avançar 10 metros
                    );
                    return { ...vehicle, latitude: lat, longitude: lng };
                })
            );
        }, 100); // Atualiza a cada meio segundo

        return () => clearInterval(interval);
    }, []);

    const defaultIcon = new L.Icon({
        iconUrl: CaminhaoImg,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

    return (
        <Container_tracking>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={safeGeoJSON} style={customStyle} />

                {vehicles.map((vehicle) => (
                    <Marker
                        key={vehicle.id}
                        position={[vehicle.latitude, vehicle.longitude]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <div>
                                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px', }}>{vehicle.vehicle}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold' }}>Localização</span>
                                    {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
                                </div>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`, '_blank')}
                                    style={{
                                        marginTop: '8px',
                                        padding: '6px 10px',
                                        backgroundColor: ' #FF9D00',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Abrir no Google Maps
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Container_tracking>
    );
};

export default Tracking;
