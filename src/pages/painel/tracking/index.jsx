// // esse e o original 

import { Container_tracking } from "./styles";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import americaDoSul from "../../../geojson/custom.geo.json";
import L from "leaflet";
import { useState, useEffect } from "react";
// img
import CartRight from "../../../assets/cartRigth3.png";

const Tracking = () => {
    const [positImage, setPositImage] = useState(CartRight); // Imagem do veículo (cabine do carro)
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });

    // Dados fictícios dos veículos
    const vehicleData = [
      { id: 1, vehicle: "Veículo A", latitude: -7.763437, longitude:-40.287224, rotation: 0 },
      { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, rotation: 0 },
      { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300, rotation: 0 },
    ];
    
    const [vehicles, setVehicles] = useState(vehicleData);

    // style do GeoJSON
    const customStyle = {
        fillColor: "transparent",
        weight: 0,
        color: "blue",
        opacity: 1,
        fillOpacity: 0,
    };

    const { center, zoom } = { center: [-12.432558, -51.772750], zoom: 4 }; // Ajustei o centro

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
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    setTimeout(() => {
                      console.log("Erro ao obter localização");
                      setCurrentLocation({ latitude: 0, longitude: 0 });
                    }, 5000);
                },
                { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
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
        console.log(currentLocation);

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
                        0.1 // Avançar 10 metros
                    );

                    // Atualiza a rotação com base nas novas coordenadas
                    const direction = calculateDirection(vehicle.latitude, vehicle.longitude, lat, lng, vehicle.rotation);
                    const rotation = direction;

                    return { ...vehicle, latitude: lat, longitude: lng, rotation };
                })
            );
        }, 20 ); // Atualiza a cada meio segundo

        return () => clearInterval(interval); // Limpeza do intervalo quando o componente for desmontado
    }, [currentLocation]); // Atualiza quando a localização mudar

    // Função para criar o ícone com rotação dinâmica
    const createVehicleIcon = (rotation) => new L.DivIcon({
        html: `<div
              class="vehicle-icon"
              style="
                trasition: all 0.3s linear;
                width: 25px;
                height: 50px;
                background: url(${positImage}) no-repeat center center / cover;
                transform:  rotate(${rotation}deg);
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





