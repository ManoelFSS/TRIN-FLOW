// esse ta funcionando bem 

import React, { useState, useEffect, useRef } from 'react';
import { ContainerTracking } from "./styles";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CartRight from "../../../assets/cartRigth3.png";
import CartLeft from "../../../assets/cartLeft3.png";
import americaDoSul from "../../../geojson/custom.geo.json";


const VehicleTracking = () => {

  const [center, setCenter] = useState([-12.768171, -50.251635 ]);
  const [zoom, setZoom] = useState(2);
  const wsRef = useRef(null);
  const [positImage, setPositImage] = useState(CartRight); // Imagem do veículo (cabine do carro)
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });


  // Dados fictícios iniciais dos veículos
  const initialVehicleData = [
    { id: 1, vehicle: "Veículo A", latitude: -7.763433, longitude: -40.287220, rotation: 0 },
    { id: 2, vehicle: "Veículo B", latitude: -15.7805, longitude: -47.9295, rotation: 0 },
    { id: 3, vehicle: "Veículo C", latitude: -15.7810, longitude: -47.9300, rotation: 0 },
  ];
  const [vehicles, setVehicles] = useState(initialVehicleData);

  
// style do GeoJSON
const customStyle = {
    fillColor: "transparent",
    weight: 0,
    color: "blue",
    opacity: 1,
    fillOpacity: 0,
};


// Função para calcular o ângulo de rotação com base na direção do movimento
const calculateDirection = (currentLat, currentLng, targetLat, targetLng, currentRotation) => {
  const diffLat = targetLat - currentLat;
  const diffLng = targetLng - currentLng;


   // Log de direção simples
  if (Math.abs(diffLat) > Math.abs(diffLng)) {
    if (diffLat > 0) {
      console.log("Movendo para CIMA (Norte)");
      setPositImage(CartRight);
    } else {
      console.log("Movendo para BAIXO (Sul)");
      setPositImage(CartLeft);
    }
  } else {
    if (diffLng > 0) {
      console.log("Movendo para a DIREITA (Leste)");
      setPositImage(CartRight);
    } else {
      console.log("Movendo para a ESQUERDA (Oeste)");
      setPositImage(CartLeft);
    }
  }

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
const watchLocation =  () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.log("Erro ao obter localização");
            },
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
    }
};

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


useEffect(() => {
  getLocation();
  watchLocation();
},[]);

useEffect(() => {
  setVehicles((prevVehicles) =>
    prevVehicles.map((vehicle) => {
      if (vehicle.id !== 1) return vehicle;
      const newLat = currentLocation.latitude;
      const newLng = currentLocation.longitude;

      const newRotation = calculateDirection(
        vehicle.latitude,
        vehicle.longitude,
        newLat,
        newLng,
        vehicle.rotation || 0
      );
      console.log(
        `Atualizando ${vehicle.vehicle}: Posição (${newLat.toFixed(6)}, ${newLng.toFixed(6)}), Rotação: ${newRotation.toFixed(2)}°`
      );
      return {
        ...vehicle,
        latitude: newLat,
        longitude: newLng,
        rotation: newRotation,
      };
    })
  );
}, [currentLocation]);

const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

return (
  <ContainerTracking>
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "calc(100vh - 50px)", width: "100%" }}
      scrollWheelZoom={true}
      minZoom={4}
      maxZoom={18}
      zoomControl={true} // Ativa os botões de zoom
      dragging={true} // Permite arrastar o mapa
      doubleClickZoom={true} // Permite zoom com duplo clique
      touchZoom={true} // Permite zoom por toque em dispositivos móveis
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
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px' }}>
                {vehicle.vehicle}
              </div>
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
  </ContainerTracking>
);
};

export default VehicleTracking;






