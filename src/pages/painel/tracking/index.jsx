import React, { useState, useEffect, useRef } from 'react';
import { ContainerTracking,  MenuTracking, Map } from "./styles";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CartRight from "../../../assets/cartRigth3.png";
import CartLeft from "../../../assets/cartLeft3.png";
import Perfil from "../../../assets/perfil.png";
import americaDoSul from "../../../geojson/custom.geo.json";
import Search from "../../../components/search";
import PopupModal from "../../../components/popupModal";
import BtnNavigate from "../../../components/btns/btnNavigate";
// db
import {motoristas} from "../../../DB";

const VehicleTracking = () => {

  const [center, setCenter] = useState([-12.562786, -52.211822]);
  const [zoom, setZoom] = useState(0);
  const wsRef = useRef(null);
  const [positImage, setPositImage] = useState(CartRight);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectVehicle, setSelectVehicle] = useState(null);
  const [controlaMapa, setControlaMapa] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [viewMapEntrega, setViewMapEntrega] = useState(true);

  const [vehicles, setVehicles] = useState(motoristas);

  const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      if (center && zoom) {
        map.setView(center, zoom);
      }
    }, [selectVehicle]);
    return null;
  };

  const customStyle = {
    fillColor: "transparent",
    weight: 0,
    color: "blue",
    opacity: 1,
    fillOpacity: 0,
  };

  // Componente para atualizar o estado do zoom
  const ZoomHandler = () => {
    const map = useMap();
    useEffect(() => {
      map.on('zoomend', () => {
        setZoom(map.getZoom());
      });
    }, [map]);
    return null;
  };

  // Função para criar o ícone com tamanho dinâmico baseado no zoom
  const createVehicleIcon = (rotation) => {
    // Calcule o tamanho do ícone baseado no zoom
    const baseSize = 14; // Tamanho base do ícone em pixels
    const scaleFactor = zoom < 10 ? 1 + (zoom - 4) * 0.1 : 1.6; // Ajuste de escala conforme o zoom
    const iconSize = baseSize * scaleFactor;

    return new L.DivIcon({
      html: `<div
        class="vehicle-icon"
        style="
          transition: transform 0.3s ease;
          width: ${iconSize}px;
          height: ${iconSize * 2}px;
          background: url(${positImage}) no-repeat center center / cover;
          transform: translate(-0%, -20%) rotate(${rotation}deg);
          user-select: none;
          pointer-events: none;
        "></div>`,
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize], // Ajuste o ponto de ancoragem
      popupAnchor: [0, -30], // Ajuste para o popup
      className: '',
    });
  };

  // Função para calcular o ângulo de rotação (mantida como no código original)
  const calculateDirection = (currentLat, currentLng, targetLat, targetLng, currentRotation) => {
    const diffLat = targetLat - currentLat;
    const diffLng = targetLng - currentLng;

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
    angleDeg = angleDeg;

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

  // Funções de localização 
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

  const watchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.log("Erro ao obter localização");
        },
        { enableHighAccuracy: true, maximumAge: 1500, timeout: 3000 }
      );
    }
  };

  useEffect(() => {
    getLocation();
    watchLocation();
  }, []);

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
          dataLocalizacao: new Date().toLocaleString(),
        };
      })
    );
  }, [currentLocation]);

  const safeGeoJSON = americaDoSul || { type: "FeatureCollection", features: [] };

  return (
    <ContainerTracking>
      <section className='tricking-header'>
        <BtnNavigate 
          $width={"100px"} 
          $height={"30px"} 
          $text={"Mapa"}  
          onClick={() => setViewMapEntrega(true)}
          $background={viewMapEntrega ? " #FF9D00" : " #ffffff"}
          $color={viewMapEntrega ? " #FFffff" : " #000000"}
        />
        <BtnNavigate 
          $width={"100px"} 
          $height={"30px"} 
          $text={"Entregas"}  
          onClick={() => setViewMapEntrega(false)}
          $background={viewMapEntrega ? "rgb(255, 255, 255)" : " #FF9D00"}
          $color={viewMapEntrega ? " #000000" : " #FFffff"}
        />
      </section>

      {viewMapEntrega && <section className="tracking-container">
        <div className='tracking'>
          <div className='search'>
            <Search 
              $width={"89%"} 
              $height={"40px"} 
              valueSearch={valueSearch} 
              setValueSearch={setValueSearch}
            />
          </div>
          <MenuTracking>
            {vehicles.filter((motorista) => motorista.nome.toLowerCase().includes(valueSearch.toLowerCase()) || 
              motorista.cnh.toLowerCase().includes(valueSearch.toLowerCase()))
              .map((motorista, index) => (
              <section 
                className='card-tracking'
                onClick={() => {setControlaMapa(true); setCenter([motorista.latitude, motorista.longitude]); setZoom(17), setSelectVehicle(!selectVehicle), setInterval(() => {setControlaMapa(false);}, 1000)}}
                key={index}
              >
                <div className='photo'>
                  <img src={Perfil} alt="foto" />
                </div>
                <div className='info-cantainer'>
                  <div>
                    <div className='box-info'>
                      <h4>Nome</h4>
                      <p>{motorista.nome}</p>
                    </div>
                    <div className='box-info'>
                      <h4>CNH</h4>
                      <p>{motorista.cnh}</p>
                    </div>
                  </div>
                  <div className='box-info-address'>
                    <h4>Endereço de entrega</h4>
                    <p>{motorista.endereco}</p>
                  </div>
                </div>
              </section>
            ))}
          </MenuTracking>
        </div>
        <Map>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            minZoom={4}
            maxZoom={18}
            zoomControl={true}
            dragging={true}
            doubleClickZoom={true}
            touchZoom={true}
          >
            {controlaMapa &&  <ChangeMapView center={center} zoom={zoom} />} {/* Componente para centralizar o mapa */}

            <ZoomHandler /> {/* Componente para atualizar o zoom */}
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
                  <PopupModal
                    name={vehicle.vehicle}
                    plate={vehicle.plate}
                    latitude={vehicle.latitude}
                    longitude={vehicle.longitude}
                    date={vehicle.dataLocalizacao}
                    veiclePhoto={vehicle.veiclePhoto}
                  />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Map>
      </section>}
      
    </ContainerTracking>
  );
};

export default VehicleTracking;