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

const VehicleTracking = () => {
  const [center, setCenter] = useState([-12.562786, -52.211822]);
  const [zoom, setZoom] = useState(4);
  const wsRef = useRef(null);
  const [positImage, setPositImage] = useState(CartRight);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectVehicle, setSelectVehicle] = useState(null);
  const [controlaMapa, setControlaMapa] = useState(false);
  const [valueSearch, setValueSearch] = useState('');

  const motoristas = [
    {
      id: 1,
      nome: "João da Silva",
      cnh: "12345678900",
      endereco: "Rua das Araucárias, nº 285, Bairro Centro, Chapecó - SC, CEP 89801-200",
      vehicle: "Carreta Bitrem",
      plate: "BRA3C41",
      latitude: -7.763433,
      longitude: -40.287220,
      rotation: 0,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      cnh: "98765432100",
      endereco: "Avenida Brasil, nº 1000, Bairro São Cristóvão, Chapecó - SC, CEP 89801-250",
      vehicle: "Caminhão Truck",
      plate: "KZT6P20",
      latitude: -7.756626,
      longitude: -40.271342,
      rotation: 0,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 3,
      nome: "Carlos Souza",
      cnh: "45612378900",
      endereco: "Rua das Palmeiras, nº 58, Bairro Passo dos Fortes, Chapecó - SC, CEP 89801-180",
      vehicle: "Cavalo Mecânico",
      plate: "QWE1J89",
      latitude: -15.7810,
      longitude: -47.9300,
      rotation: 0,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 4,
      nome: "Ana Paula Lima",
      cnh: "32198765400",
      endereco: "Rua das Hortênsias, nº 77, Bairro Efapi, Chapecó - SC, CEP 89809-100",
      vehicle: "Carreta Rodotrem",
      plate: "MNL4T72",
      latitude: -23.550520,
      longitude: -46.633308,
      rotation: 15,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 5,
      nome: "Bruno Ferreira",
      cnh: "74185296300",
      endereco: "Avenida Getúlio Vargas, nº 120, Bairro Líder, Chapecó - SC, CEP 89802-000",
      vehicle: "Caminhão Toco",
      plate: "GHB8F60",
      latitude: -22.906847,
      longitude: -43.172896,
      rotation: 25,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 6,
      nome: "Patrícia Mendes",
      cnh: "85296374100",
      endereco: "Rua Rui Barbosa, nº 315, Bairro São Pedro, Chapecó - SC, CEP 89801-600",
      vehicle: "Carreta LS (Linha Segmentada)",
      plate: "QWE1J89",
      latitude: -30.034647,
      longitude: -51.217658,
      rotation: 10,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 7,
      nome: "Ricardo Alves",
      cnh: "15975348600",
      endereco: "Travessa Beira Rio, nº 89, Bairro Universitário, Chapecó - SC, CEP 89803-210",
      vehicle: "Caminhão VUC (Veículo Urbano de Carga)",
      plate: "MNL4T72",
      latitude: -19.8157,
      longitude: -43.9542,
      rotation: 45,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 8,
      nome: "Juliana Rocha",
      cnh: "36925814700",
      endereco: "Rua Fernando Machado, nº 440, Bairro Centro, Chapecó - SC, CEP 89801-020",
      vehicle: "Caminhão Baú",
      plate: "GHB8F60",
      latitude: -3.7319,
      longitude: -38.5267,
      rotation: 5,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 9,
      nome: "Lucas Martins",
      cnh: "75315984200",
      endereco: "Rua São Marcos, nº 198, Bairro Paraíso, Chapecó - SC, CEP 89805-100",
      vehicle: "Caminhão Carga Seca",
      plate: "QWE1J89",
      latitude: -1.4550,
      longitude: -48.5024,
      rotation: 30,
      dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
      id: 10,
      nome: "Fernanda Dias",
      cnh: "95135785200",
      endereco: "Rua Marechal Bormann, nº 62, Bairro Esplanada, Chapecó - SC, CEP 89801-360",
      vehicle: "Carreta Prancha",
      plate: "MNL4T72",
      latitude: -8.0476,
      longitude: -34.8770,
      rotation: 60,
      dataLocalizacao: "04/05/2025 15:20:00"
    }
  ];
  
  
  const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      if (center && zoom) {
        map.setView(center, zoom);
      }
    }, [selectVehicle]);
    return null;
  };
  
  const [vehicles, setVehicles] = useState(motoristas);

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

  // Funções de localização (mantidas como no código original)
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
      <div className='tracking-container'>
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
              onClick={() => {setControlaMapa(true); setCenter([motorista.latitude, motorista.longitude]); setZoom(17), setSelectVehicle(!selectVehicle), setInterval(() => {setControlaMapa(false);}, 2000)}}
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
          {controlaMapa &&  <ChangeMapView center={center} zoom={zoom} />}

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
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '2px', color: '#FF9D00' }}>
                    {vehicle.vehicle}
                  </div>
                  <div style={{marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}>
                    <h4>Placa: </h4>
                    <span>{vehicle.plate}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Localização</span>
                    {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
                    <span style={{ fontWeight: 'bold', marginTop: '8px' }}>{vehicle.dataLocalizacao}</span>
                  </div>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`,
                        '_blank'
                      )
                    }
                    style={{
                      marginTop: '8px',
                      padding: '6px 10px',
                      backgroundColor: '#FF9D00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    Abrir no Google Maps
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=-7.763412,-40.287154&destination=-9.415635,-40.502929&travelmode=driving`,
                        '_blank'
                      )
                    }
                    style={{
                      marginTop: '8px',
                      padding: '6px 10px',
                      backgroundColor: '#FF9D00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginLeft: '8px'
                    }}
                  >
                    Ver Rota
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Map>
    </ContainerTracking>
  );
};

export default VehicleTracking;