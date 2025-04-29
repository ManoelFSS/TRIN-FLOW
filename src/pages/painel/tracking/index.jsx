// // // esse e o original 

// import { Container_tracking } from "./styles";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import americaDoSul from "../../../geojson/custom.geo.json";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// // img
// import CartRight from "../../../assets/cartRigth3.png";

// const Tracking = () => {
//     const [positImage, setPositImage] = useState(CartRight); // Imagem do veículo (cabine do carro)
//     const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });

//     // Dados fictícios dos veículos
//     const vehicleData = [
//       { id: 1, vehicle: "Veículo A", latitude: -7.763437, longitude:-40.287224, rotation: 0 },
//       { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, rotation: 0 },
//       { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300, rotation: 0 },
//     ];
    
//     const [vehicles, setVehicles] = useState(vehicleData);

//     // style do GeoJSON
//     const customStyle = {
//         fillColor: "transparent",
//         weight: 0,
//         color: "blue",
//         opacity: 1,
//         fillOpacity: 0,
//     };

//     const { center, zoom } = { center: [-12.432558, -51.772750], zoom: 4 }; // Ajustei o centro

//     // Função para obter a localização atual do dispositivo
//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setCurrentLocation({ latitude, longitude });
//                     console.log({ latitude, longitude });
//                 },
//                 (error) => {
//                     console.error("Erro ao obter localização", error);
//                 },
//                 { enableHighAccuracy: true }
//             );
//         } else {
//             alert("Geolocalização não é suportada pelo navegador.");
//         }
//     };

//     // Função para monitorar a mudança de posição em tempo real
//     const watchLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.watchPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setCurrentLocation({ latitude, longitude });
//                 },
//                 (error) => {
//                     setTimeout(() => {
//                       console.log("Erro ao obter localização");
//                       // setCurrentLocation({ latitude: 0, longitude: 0 });
//                     }, 1500);
//                 },
//                 { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
//             );
//         }
//     };

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
//         const diffLat = targetLat - currentLat;
//         const diffLng = targetLng - currentLng;

//         const angleRad = Math.atan2(diffLng, diffLat);
//         let angleDeg = (angleRad * 180) / Math.PI;

//         angleDeg = angleDeg; // Ajuste para compensar a imagem do veículo

//         let deltaAngle = angleDeg - currentRotation;
//         if (Math.abs(deltaAngle) > 180) {
//             if (deltaAngle > 0) {
//                 angleDeg -= 360;
//             } else {
//                 angleDeg += 360;
//             }
//         }

//         if (angleDeg >= 360) angleDeg -= 360;
//         if (angleDeg < 0) angleDeg += 360;

//         return angleDeg;
//     };

//     useEffect(() => {
//         // Obter localização assim que o componente for montado
//         getLocation();
        
//         // Monitorar mudanças de posição
//         watchLocation();
//         console.log(currentLocation);

//         const interval = setInterval(() => {
//             setVehicles((prevVehicles) =>
//                 prevVehicles.map((vehicle) => {
//                     if (vehicle.id !== 1) return vehicle;

//                     // Atualiza as coordenadas dinamicamente conforme o destino
//                     const { lat, lng } = moveTowards(
//                         vehicle.latitude,
//                         vehicle.longitude,
//                         currentLocation.latitude,
//                         currentLocation.longitude,
//                         0.027778// Avançar  metros
//                     );

//                     // Atualiza a rotação com base nas novas coordenadas
//                     const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng, vehicle.rotation);
//                     const rotation = direction;

//                     return { ...vehicle, latitude: lat, longitude: lng, rotation };
//                 })
//             );
//         }, 100 ); // Atualiza a cada meio segundo

//         return () => clearInterval(interval); // Limpeza do intervalo quando o componente for desmontado
//     }, [currentLocation]); // Atualiza quando a localização mudar

//     // Função para criar o ícone com rotação dinâmica
//     const createVehicleIcon = (rotation) => new L.DivIcon({
//         html: `<div
//               class="vehicle-icon"
//               style="
//                 trasition: all 0.3s linear;
//                 width: 25px;
//                 height: 50px;
//                 background: url(${positImage}) no-repeat center center / cover;
//                 transform:  rotate(${rotation}deg);
//                 user-select: none;
//                 pointer-events: none;
//               "></div>`,
//         iconSize: [50, 40],
//         iconAnchor: [7, 20], // Centro da div
//         popupAnchor: [0, -25], // Ajuste para o popup
//         className: '' // Remove a classe padrão do Leaflet
//     });

//     const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

//     return (
//         <Container_tracking>
//             <MapContainer
//                 center={center}
//                 zoom={zoom}
//                 style={{ height: "100vh", width: "100%" }}
//                 scrollWheelZoom={true}
//                 minZoom={4}
//                 maxZoom={18}
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
import CartRight from "../../../assets/cartRigth3.png";

const Tracking = () => {
    const [positImage, setPositImage] = useState(CartRight);
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
    const [lastLocation, setLastLocation] = useState(null); // Novo estado para última localização
    const [realSpeed, setRealSpeed] = useState(0); // Velocidade real em m/s

    // Dados fictícios dos veículos
    const vehicleData = [
        { id: 1, vehicle: "Veículo A", latitude: -7.763437, longitude: -40.287224, rotation: 0 },
        { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, rotation: 0 },
        { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300, rotation: 0 },
    ];

    const [vehicles, setVehicles] = useState(vehicleData);

    // Style do GeoJSON
    const customStyle = {
        fillColor: "transparent",
        weight: 0,
        color: "blue",
        opacity: 1,
        fillOpacity: 0,
    };

    const { center, zoom } = { center: [-12.432558, -51.772750], zoom: 4 };

    // Função para calcular a distância em metros (Haversine)
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Raio da Terra em metros
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distância em metros
    };

    // Função para obter a localização atual do dispositivo
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    console.log({ latitude, longitude });
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
                    setCurrentLocation((prev) => {
                        // Armazena a localização anterior antes de atualizar
                        if (prev.latitude !== 0 && prev.longitude !== 0) {
                            setLastLocation({ latitude: prev.latitude, longitude: prev.longitude });
                        }
                        return { latitude, longitude };
                    });

                    // Calcular distância e velocidade se houver última localização
                    if (lastLocation) {
                        const distance = haversineDistance(
                            lastLocation.latitude,
                            lastLocation.longitude,
                            latitude,
                            longitude
                        );
                        const timeInterval = 3; // 3 segundos (tempo entre atualizações)
                        const speed = distance / timeInterval; // Velocidade em m/s
                        setRealSpeed(speed);
                        console.log(`Distância: ${distance.toFixed(2)} metros, Velocidade: ${(speed * 3.6).toFixed(2)} km/h`);
                    }
                },
                (error) => {
                    setTimeout(() => {
                        console.log("Erro ao obter localização");
                    }, 1500);
                },
                { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
            );
        }
    };

    // Função para calcular o próximo ponto a cada X metros
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
        console.log(currentLocation);

        const interval = setInterval(() => {
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) => {
                    if (vehicle.id !== 1) return vehicle;

                    // Calcular distância a mover a cada 100 ms com base na velocidade real
                    const distancePerUpdate = realSpeed * 0.1; // Velocidade (m/s) * 0.1 s
                    // Usar 0.027778 metros (1 km/h) como fallback se a velocidade real for 0
                    const distance = distancePerUpdate > 0 ? distancePerUpdate : 0.027778;

                    // Atualiza as coordenadas dinamicamente conforme o destino
                    const { lat, lng } = moveTowards(
                        vehicle.latitude,
                        vehicle.longitude,
                        currentLocation.latitude,
                        currentLocation.longitude,
                        distance // Avançar a distância calculada
                    );

                    // Atualiza a rotação com base nas novas coordenadas
                    const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng, vehicle.rotation);
                    const rotation = direction;

                    return { ...vehicle, latitude: lat, longitude: lng, rotation };
                })
            );
        }, 100); // Atualiza a cada 100 ms

        return () => clearInterval(interval); // Limpeza do intervalo
    }, [currentLocation, realSpeed]); // Adicionei realSpeed como dependência

    // Função para criar o ícone com rotação dinâmica
    const createVehicleIcon = (rotation) => new L.DivIcon({
        html: `<div
              class="vehicle-icon"
              style="
                transition: all 0.3s linear;
                width: 25px;
                height: 50px;
                background: url(${positImage}) no-repeat center center / cover;
                transform: rotate(${rotation}deg);
                user-select: none;
                pointer-events: none;
              "></div>`,
        iconSize: [50, 40],
        iconAnchor: [7, 20], // Centro da div
        popupAnchor: [0, -25], // Ajuste para o popup
        className: '' // Remove a classe padrão do Leaflet
    });

    const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

    return (
        <Container_tracking>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: "100vh", width: "100%" }}
                scrollWheelZoom={true}
                minZoom={4}
                maxZoom={18}
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


