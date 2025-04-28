// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import americaDoSul from '../../../geojson/custom.geo.json';
// import L from 'leaflet';
// import { useState, useEffect } from 'react';
// import CaminhaoImg from '../../../assets/caminhao.png';

// // Dados fictícios dos veículos
// const vehicleData = [
//     { id: 1, vehicle: "Veículo A", latitude: -7.756615, longitude: -40.271313 },
//     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
//     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 }
// ];

// const Tracking = () => {
//     const center = [-15.7801, -47.9292]; // Coordenadas aproximadas do centro da América do Sul

//     const [vehicles, setVehicles] = useState(vehicleData); // Dados dos veículos

//     const customStyle = {
//         fillColor: 'transparent', // Torna o preenchimento transparente
//         weight: 0,                // Define a espessura da borda
//         color: 'blue',            // Define a cor da borda
//         opacity: 1,               // Define a opacidade da borda
//         fillOpacity: 0            // Torna o preenchimento completamente transparente
//     };

//     useEffect(() => {
//         // Aqui você pode colocar código para atualizar os veículos em tempo real,
//         // como uma chamada para uma API que traga as coordenadas atualizadas dos veículos.
//     }, []);

//     return (
//         <Container_tracking>
//             <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
//                 {/* Camada de Satélite - Esri World Imagery */}
//                 <TileLayer
//                     url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//                     attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
//                 />
//                 {/* Camada de Rótulos e Estradas - Esri */}
//                 <TileLayer
//                     url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
//                     attribution="Labels © Esri"
//                 />
//                 {/* GeoJSON - América do Sul */}
//                 <GeoJSON data={americaDoSul} style={customStyle} />
                
//                 {/* Marcadores para cada veículo */}
//                 {vehicles.map(vehicle => (
//                     <Marker 
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={new L.Icon({
//                             iconUrl: CaminhaoImg, // Substitua pelo caminho do seu ícone
//                             iconSize: [32, 32], // Tamanho do ícone
//                             iconAnchor: [16, 32], // Posição do ponto de ancoragem
//                             popupAnchor: [0, -32], // Posição do popup
//                         })}
//                     >
//                         <Popup>
//                             {vehicle.vehicle}<br />
//                             Localização: {vehicle.latitude}, {vehicle.longitude}
//                         </Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
//         </Container_tracking>
//     );
// };

// export default Tracking;

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

//     const targetLat = -7.759954;
//     const targetLng = -40.264860;

//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 4 }; // Ajustei o centro

//     // Função para calcular o próximo ponto a cada 10 metros
//     const moveTowards = (currentLat, currentLng, targetLat, targetLng, distanceMeters) => {
//         const toRad = (value) => (value * Math.PI) / 180;
//         const toDeg = (value) => (value * 180) / Math.PI;

//         const R = 6378137; // Raio da Terra em metros
//         const dLat = toRad(targetLat - currentLat);
//         const dLng = toRad(targetLng - currentLng);

//         const a = Math.sin(dLat / 2) ** 2 +
//                   Math.cos(toRad(currentLat)) * Math.cos(toRad(targetLat)) *
//                   Math.sin(dLng / 2) ** 2;
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c;

//         if (distance < distanceMeters) {
//             return { lat: targetLat, lng: targetLng }; // Chegou no destino
//         }

//         const ratio = distanceMeters / distance;
//         const newLat = currentLat + (targetLat - currentLat) * ratio;
//         const newLng = currentLng + (targetLng - currentLng) * ratio;

//         return { lat: newLat, lng: newLng };
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setVehicles((prevVehicles) =>
//                 prevVehicles.map((vehicle) => {
//                     if (vehicle.id !== 1) return vehicle; // Só move o Veículo A
//                     const { lat, lng } = moveTowards(
//                         vehicle.latitude,
//                         vehicle.longitude,
//                         targetLat,
//                         targetLng,
//                         10 // Avançar 10 metros
//                     );
//                     return { ...vehicle, latitude: lat, longitude: lng };
//                 })
//             );
//         }, 100); // Atualiza a cada meio segundo

//         return () => clearInterval(interval);
//     }, []);

//     const defaultIcon = new L.Icon({
//         iconUrl: CaminhaoImg,
//         iconSize: [60, 50],
//         iconAnchor: [17, 32],
//         popupAnchor: [0, -32],
//         ratio: 0.5
//     });

//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 style={{ height: "100vh", width: "100%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <GeoJSON data={safeGeoJSON} style={customStyle} />

//                 {vehicles.map((vehicle) => (
//                     <Marker
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={defaultIcon}
//                     >
//                         <Popup>
//                             <div>
//                                 <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px', }}>{vehicle.vehicle}</div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                                     <span style={{ fontWeight: 'bold' }}>Localização</span>
//                                     {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
//                                 </div>
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
//                                     Abrir no Google Maps
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




// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import americaDoSul from "../../../geojson/custom.geo.json";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// // img
// import CartRight from "../../../assets/cartRigth.png";


// // Dados fictícios dos veículos
// const vehicleData = [
//     { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167 },
//     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
//     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 },
// ];

// const Tracking = () => {

//     const [positImage, setPositImage] = useState(CartRight);// troca a imagem conforme a direção

//     const [vehicles, setVehicles] = useState(vehicleData);

//     const targetLat = -7.759954;
//     const targetLng = -40.264860;

//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 4 }; // Ajustei o centro

//     // Função para calcular o próximo ponto a cada 10 metros
//     const moveTowards = (currentLat, currentLng, targetLat, targetLng, distanceMeters) => {
//         const toRad = (value) => (value * Math.PI) / 180;
//         const toDeg = (value) => (value * 180) / Math.PI;

//         const R = 6378137; // Raio da Terra em metros
//         const dLat = toRad(targetLat - currentLat);
//         const dLng = toRad(targetLng - currentLng);

//         const a = Math.sin(dLat / 2) ** 2 +
//                   Math.cos(toRad(currentLat)) * Math.cos(toRad(targetLat)) *
//                   Math.sin(dLng / 2) ** 2;
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c;

//         if (distance < distanceMeters) {
//             return { lat: targetLat, lng: targetLng }; // Chegou no destino
//         }

//         const ratio = distanceMeters / distance;
//         const newLat = currentLat + (targetLat - currentLat) * ratio;
//         const newLng = currentLng + (targetLng - currentLng) * ratio;

//         return { lat: newLat, lng: newLng };
//     };

//     // Função para calcular a direção
//     const calculateDirection = (currentLat, currentLng, targetLat, targetLng) => {
//         const diffLat = targetLat - currentLat;
//         const diffLng = targetLng - currentLng;

//         if (Math.abs(diffLat) > Math.abs(diffLng)) {
//             return diffLat > 0 ? "Bottom" : "Top";
//         } else {
//             setPositImage(CartRight);
//             return diffLng > 0 ? "Right" : "Left";
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setVehicles((prevVehicles) =>
//                 prevVehicles.map((vehicle) => {
//                     if (vehicle.id !== 1) return vehicle; // Só move o Veículo A
//                     const { lat, lng } = moveTowards(
//                         vehicle.latitude,
//                         vehicle.longitude,
//                         targetLat,
//                         targetLng,
//                         10 // Avançar 10 metros
//                     );

//                     const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng);
//                     console.log(`Veículo A está indo para: ${direction}`); // Exibe a direção no console

//                     return { ...vehicle, latitude: lat, longitude: lng };
//                 })
//             );
//         }, 100); // Atualiza a cada meio segundo

//         return () => clearInterval(interval);
//     }, []);

//     const defaultIcon = new L.Icon({
//         iconUrl: positImage,
//         iconSize: [60, 50],
//         iconAnchor: [17, 32],
//         popupAnchor: [0, -32],
//         ratio: 0.5
//     });

//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 style={{ height: "100vh", width: "100%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <GeoJSON data={safeGeoJSON} style={customStyle} />

//                 {vehicles.map((vehicle) => (
//                     <Marker
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={defaultIcon}
//                     >
//                         <Popup>
//                             <div>
//                                 <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px', }}>{vehicle.vehicle}</div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                                     <span style={{ fontWeight: 'bold' }}>Localização</span>
//                                     {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
//                                 </div>
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
//                                     Abrir no Google Maps
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



// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import americaDoSul from "../../../geojson/custom.geo.json";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// // img
// import CartRight from "../../../assets/cartRigth.png";


// // Dados fictícios dos veículos
// const vehicleData = [
//     { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167 },
//     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295 },
//     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300 },
// ];

// const Tracking = () => {

//     const [positImage, setPositImage] = useState(CartRight);// troca a imagem conforme a direção

//     const [vehicles, setVehicles] = useState(vehicleData);

//     const targetLat = -7.759954;
//     const targetLng = -40.264860;

//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 4 }; // Ajustei o centro

//     // Função para calcular o próximo ponto a cada 10 metros
//     const moveTowards = (currentLat, currentLng, targetLat, targetLng, distanceMeters) => {
//         const toRad = (value) => (value * Math.PI) / 180;
//         const toDeg = (value) => (value * 180) / Math.PI;

//         const R = 6378137; // Raio da Terra em metros
//         const dLat = toRad(targetLat - currentLat);
//         const dLng = toRad(targetLng - currentLng);

//         const a = Math.sin(dLat / 2) ** 2 +
//                   Math.cos(toRad(currentLat)) * Math.cos(toRad(targetLat)) *
//                   Math.sin(dLng / 2) ** 2;
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c;

//         if (distance < distanceMeters) {
//             return { lat: targetLat, lng: targetLng }; // Chegou no destino
//         }

//         const ratio = distanceMeters / distance;
//         const newLat = currentLat + (targetLat - currentLat) * ratio;
//         const newLng = currentLng + (targetLng - currentLng) * ratio;

//         return { lat: newLat, lng: newLng };
//     };

//     // Função para calcular a direção
//     const calculateDirection = (currentLat, currentLng, targetLat, targetLng) => {
//         const diffLat = targetLat - currentLat;
//         const diffLng = targetLng - currentLng;

//         if (Math.abs(diffLat) > Math.abs(diffLng)) {
//             return diffLat > 0 ? "Bottom" : "Top";
//         } else {
//             setPositImage(CartRight);
//             return diffLng > 0 ? "Right" : "Left";
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setVehicles((prevVehicles) =>
//                 prevVehicles.map((vehicle) => {
//                     if (vehicle.id !== 1) return vehicle; // Só move o Veículo A
//                     const { lat, lng } = moveTowards(
//                         vehicle.latitude,
//                         vehicle.longitude,
//                         targetLat,
//                         targetLng,
//                         10 // Avançar 10 metros
//                     );

//                     const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng);
//                     console.log(`Veículo A está indo para: ${direction}`); // Exibe a direção no console

//                     return { ...vehicle, latitude: lat, longitude: lng };
//                 })
//             );
//         }, 100); // Atualiza a cada meio segundo

//         return () => clearInterval(interval);
//     }, []);

//     const defaultIcon = new L.DivIcon({
//         html: `<div style="
//             width: 40px;
//             height: 60px;
//             background: url(${positImage}) no-repeat center center / contain;
//             transform: translate(-50%, -50%);
//             border: solid 3px #000000;
//             transform: rotate(0deg);
//             border-top: solid 3px rgb(182, 7, 7);
            
//         "></div>`,
//         iconSize: [60, 50],
//         iconAnchor: [30, 25], // Centro do ícone
//         popupAnchor: [0, -25], // Ajuste para o popup
//         className: '' // Remove a classe padrão do Leaflet para evitar bordas
//     });

//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 style={{ height: "100vh", width: "100%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <GeoJSON data={safeGeoJSON} style={customStyle} />

//                 {vehicles.map((vehicle) => (
//                     <Marker
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={defaultIcon}
//                     >
//                         <Popup>
//                             <div>
//                                 <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px', }}>{vehicle.vehicle}</div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                                     <span style={{ fontWeight: 'bold' }}>Localização</span>
//                                     {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
//                                 </div>
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
//                                     Abrir no Google Maps
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







// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import americaDoSul from "../../../geojson/custom.geo.json";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// // img
// import CartRight from "../../../assets/cartRigth.png";

// // Dados fictícios dos veículos
// const vehicleData = [
//     { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167, },
//     { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, },
//     { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300,  },
// ];

// const Tracking = () => {
//     const [positImage, setPositImage] = useState(CartRight); // Imagem do veículo (cabine do carro)
//     const [vehicles, setVehicles] = useState(vehicleData);

//     const targetLat = -7.752069;
//     const targetLng = -40.270354

//     ;

//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 16 }; // Ajustei o centro

//     // Função para calcular o próximo ponto a cada 10 metros
//     const moveTowards = (currentLat, currentLng, targetLat, targetLng, distanceMeters) => {
//         const toRad = (value) => (value * Math.PI) / 180;
//         const toDeg = (value) => (value * 180) / Math.PI;

//         const R = 6378137; // Raio da Terra em metros
//         const dLat = toRad(targetLat - currentLat);
//         const dLng = toRad(targetLng - currentLng);

//         const a = Math.sin(dLat / 2) ** 2 +
//                   Math.cos(toRad(currentLat)) * Math.cos(toRad(targetLat)) *
//                   Math.sin(dLng / 2) ** 2;
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c;

//         if (distance < distanceMeters) {
//             return { lat: targetLat, lng: targetLng }; // Chegou no destino
//         }

//         const ratio = distanceMeters / distance;
//         const newLat = currentLat + (targetLat - currentLat) * ratio;
//         const newLng = currentLng + (targetLng - currentLng) * ratio;

//         return { lat: newLat, lng: newLng };
//     };

//     // Função para calcular o ângulo de rotação com base na direção do movimento
//     const calculateDirection = (currentLat, currentLng, targetLat, targetLng, currentRotation) => {
//       const diffLat = targetLat - currentLat; // Diferença em latitude (sul é positivo no mapa)
//       const diffLng = targetLng - currentLng; // Diferença em longitude (leste é positivo)
  
//       // Calcular o ângulo em radianos usando atan2
//       const angleRad = Math.atan2(diffLng, diffLat); // Ajuste para utilizar as coordenadas
//       let angleDeg = (angleRad * 180) / Math.PI; // Converter para graus
  
//       // Ajustar para que a frente (cabine) da imagem aponte para a direção do movimento
//       angleDeg = angleDeg ; // Compensar a orientação padrão da imagem (deve apontar para a direção do movimento)
  
//       // Garantir que o ângulo continue a girar na direção do movimento
//       let deltaAngle = angleDeg - currentRotation;
//       if (Math.abs(deltaAngle) > 180) {
//           // Se o delta do ângulo for maior que 180, significa que houve uma mudança maior que 180 graus,
//           // então vamos ajustar a direção para garantir uma rotação contínua
//           if (deltaAngle > 0) {
//               angleDeg -= 360;
//           } else {
//               angleDeg += 360;
//           }
//       }
  
//       // Normalizar para 0-360
//       if (angleDeg >= 360) angleDeg -= 360;
//       if (angleDeg < 0) angleDeg += 360;
      
//       console.log(angleDeg)
//       return angleDeg 
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//         setVehicles((prevVehicles) =>
//             prevVehicles.map((vehicle) => {
//                 if (vehicle.id !== 1) return vehicle; // Só move o Veículo A

//                 // Atualiza as coordenadas dinamicamente conforme o destino
//                 const { lat, lng } = moveTowards(
//                     vehicle.latitude,
//                     vehicle.longitude,
//                     targetLat,
//                     targetLng,
//                     10 // Avançar 10 metros
//                 );

//                 // Atualiza a rotação com base nas novas coordenadas
//                 const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng, vehicle.rotation);
//                 const rotation = direction > 0 ? direction : 80.89356578343997; // mantem a rotação final fixa

//                 return { ...vehicle, latitude: lat, longitude: lng, rotation };
//             })
//         );
//     }, 100); // Atualiza a cada meio segundo

//     return () => clearInterval(interval); // Limpeza do intervalo quando o componente for desmontado
// }, [targetLat, targetLng]); // Atualiza sempre que o destino mudar



//     // Função para criar o ícone com rotação dinâmica
//     const createVehicleIcon = (rotation) => new L.DivIcon({
//         html: `<div style="
//             width: 70px;
//             height: 70px;
//             background: url(${positImage}) no-repeat center center / contain;
//             transform: translate(-50%, -50%) rotate(${rotation}deg); ;
//             transform-origin: center center;
//             border: solid 3pxrgba(0, 0, 0, 0);
//             border-top: solid 3px rgba(182, 7, 7, 0); /* Aqui você pode customizar a borda superior */
//         "></div>`,
//         iconSize: [40, 60],
//         iconAnchor: [20, 30], // Centro da div
//         popupAnchor: [0, -30], // Ajuste para o popup
//         className: '' // Remove a classe padrão do Leaflet
//     });

//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 style={{ height: "100vh", width: "100%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <GeoJSON data={safeGeoJSON} style={customStyle} />

//                 {vehicles.map((vehicle) => (
//                     <Marker
//                         key={vehicle.id}
//                         position={[vehicle.latitude, vehicle.longitude]}
//                         icon={createVehicleIcon(vehicle.rotation)}
//                     >
//                         <Popup>
//                             <div>
//                                 <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px' }}>{vehicle.vehicle}</div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                                     <span style={{ fontWeight: 'bold' }}>Localização</span>
//                                     {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
//                                 </div>
//                                 <button
//                                     onClick={() => window.open(`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`, '_blank')}
//                                     style={{
//                                         marginTop: '8px',
//                                         padding: '6px 10px',
//                                         backgroundColor: '#FF9D00',
//                                         color: 'white',
//                                         border: 'none',
//                                         borderRadius: '4px',
//                                         cursor: 'pointer',
//                                         fontSize: '12px',
//                                         fontWeight: 'bold'
//                                     }}
//                                 >
//                                     Abrir no Google Maps
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
// img
import CartRight from "../../../assets/cartRigth.png";

// Dados fictícios dos veículos
const vehicleData = [
    { id: 1, vehicle: "Veículo A", latitude: -7.763414, longitude: -40.287167, rotation: 0 },
    { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, rotation: 0 },
    { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300, rotation: 0 },
];

const Tracking = () => {
    const [positImage, setPositImage] = useState(CartRight); // Imagem do veículo (cabine do carro)
    const [vehicles, setVehicles] = useState(vehicleData);
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });

    const customStyle = {
        fillColor: "transparent",
        weight: 0,
        color: "blue",
        opacity: 1,
        fillOpacity: 0,
    };

    const { center, zoom } = { center: [-7.7615, -40.2760], zoom: 16 }; // Ajustei o centro

    // Função para obter a localização atual do dispositivo
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Erro ao obter localização", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocalização não é suportada pelo navegador.");
        }
    };

    // Função para monitorar a mudança de posição em tempo real
    const watchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Erro ao obter localização", error);
                },
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
        }
    };

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

    // Função para calcular o ângulo de rotação com base na direção do movimento
    const calculateDirection = (currentLat, currentLng, targetLat, targetLng, currentRotation) => {
        const diffLat = targetLat - currentLat;
        const diffLng = targetLng - currentLng;

        const angleRad = Math.atan2(diffLng, diffLat);
        let angleDeg = (angleRad * 180) / Math.PI;

        angleDeg = angleDeg; // Ajuste para compensar a imagem do veículo

        let deltaAngle = angleDeg - currentRotation;
        if (Math.abs(deltaAngle) > 180) {
            if (deltaAngle > 0) {
                angleDeg -= 360;
            } else {
                angleDeg += 360;
            }
        }

        if (angleDeg >= 360) angleDeg -= 360;
        if (angleDeg < 0) angleDeg += 360;

        return angleDeg;
    };

    useEffect(() => {
        // Obter localização assim que o componente for montado
        getLocation();
        
        // Monitorar mudanças de posição
        watchLocation();

        const interval = setInterval(() => {
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) => {
                    if (vehicle.id !== 1) return vehicle;

                    // Atualiza as coordenadas dinamicamente conforme o destino
                    const { lat, lng } = moveTowards(
                        vehicle.latitude,
                        vehicle.longitude,
                        currentLocation.latitude,
                        currentLocation.longitude,
                        10 // Avançar 10 metros
                    );

                    // Atualiza a rotação com base nas novas coordenadas
                    const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng, vehicle.rotation);
                    const rotation = direction > 0 ? direction : 80.89356578343997;

                    return { ...vehicle, latitude: lat, longitude: lng, rotation };
                })
            );
        }, 100); // Atualiza a cada meio segundo

        return () => clearInterval(interval); // Limpeza do intervalo quando o componente for desmontado
    }, [currentLocation]); // Atualiza quando a localização mudar

    // Função para criar o ícone com rotação dinâmica
    const createVehicleIcon = (rotation) => new L.DivIcon({
        html: `<div style="
            width: 50px;
            height: 60px;
            background: url(${positImage}) no-repeat center center / cover;
            transform: translate(-50%, -50%) rotate(${rotation}deg);
            transform-origin: center center;
            border: solid 3pxrgba(0, 0, 0, 0);
            border-top: solid 3px rgba(182, 7, 7, 0); /* Customizar borda superior */
        "></div>`,
        iconSize: [40, 60],
        iconAnchor: [20, 30], // Centro da div
        popupAnchor: [0, -30], // Ajuste para o popup
        className: '' // Remove a classe padrão do Leaflet
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
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={safeGeoJSON} style={customStyle} />

                {vehicles.map((vehicle) => (
                    <Marker
                        key={vehicle.id}
                        position={[vehicle.latitude, vehicle.longitude]}
                        icon={createVehicleIcon(vehicle.rotation)}
                    >
                        <Popup>
                            <div>
                                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '8px' }}>{vehicle.vehicle}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold' }}>Localização</span>
                                    {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
                                </div>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`, '_blank')}
                                    style={{
                                        marginTop: '8px',
                                        padding: '6px 10px',
                                        backgroundColor: '#FF9D00',
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

