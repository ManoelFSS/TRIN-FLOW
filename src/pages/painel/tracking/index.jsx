import React, { useState, useEffect, useRef } from 'react';
import { ContainerTracking,  MenuTracking, Map, Container, ContainerTable } from "./styles";
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
import Select from "../../../components/select"
import Pagination from "../../../components/pagination"
// icons
import { FaUserPlus } from "react-icons/fa";
import { LuSquareEqual, LuLayoutList } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { PiUserListFill , PiHandTapFill  } from "react-icons/pi";
import { FaAddressCard } from "react-icons/fa6";
import { BsCreditCard,  BsFillTelephonePlusFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { HiMiniStar } from "react-icons/hi2";
import { GiSteeringWheel } from "react-icons/gi";


import { FaEdit, FaInfoCircle  } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// db
import {motoristas} from "../../../DB";
// hooks
import useSelect from "../../../hooks/useSelect"



const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Nome", icon: <PiUserListFill  className="icon" /> },
        { name: "CNH", icon: <FaAddressCard className="icon" /> },
        { name: "TEL", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Veículo", icon: <BiSolidCity className="icon" /> },
        { name: "Placa", icon: <BiSolidCity className="icon" /> },
        { name: "Cor", icon: <BiSolidCity className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}

    ]

    const databody = [
        { name: "João pereira da silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city:"Trindade-PE", status: "Ativo" },
        { name: "Joaquim alencar de souza", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Bloqueado" },
        { name: "Maria celina da silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Maicon oliveira de souza", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Bloqueado" },
        { name: "Pedro herrique da silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat",plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Paulo jose dos santos", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Ronaldo silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Roberto rodrigues da silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", veiculo:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Roney da silva", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Ativo" },
        { name: "Ronaldo santos", cpf: "123.456.789-00", cnh: "123.456.789-00", tel: "(11) 1234-5678", vehicle:"Fiat", plate: "FHT-123", cor:"Vermelho", city: "Trindade-PE", status: "Bloqueado" },
    ]


    const data = [
        { category: "Ativo" },
        { category: "Inativos" },
        { category: "Masculino" },
        { category: "Feminino" },
        { category: "Bloqueados" },
    ];



const VehicleTracking = () => {


  const img = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const { select, setSelect } = useSelect();
  const [paginacao, setPaginacao] = useState(1);

  const itemsPerPage = 3;
  const startIndex = (paginacao - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // fiter e mimite 12 items
  const filteredItems = databody.filter(item => select !== "Todos" ? item.status === select : item)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const labels = filteredItems.slice(startIndex, endIndex).map(item => item.name);

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

      { !viewMapEntrega && <Container>
            <section className="box-filter">
                <BtnNavigate 
                    $text="Cadastrar Motorista" 
                    icon={<GiSteeringWheel  className="icon" />} 
                    // $width={"200px"}
                />
                <div className="box-icon">
                    <LuSquareEqual className="icon-square" />
                    <LuLayoutList  className="icon-list ative-icon " />
                </div>
                <Select     
                    select={select} 
                    setSelect={setSelect}
                    data={data} 
                    $width={"120px"}
                />
                <Search />
                <Pagination data={databody}
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
            </section>
            <ContainerTable>
                <section className="table">
                    <div className="header">
                        <ul className="header-list">
                            {dataHeader.map((item, index) => (
                                <li key={index}>{item.name} {item.icon}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="body">
                        { databody.map((item, index) => (
                            <ul className="body-list" key={index}>
                                <li><img src={img} alt="avatar" /></li>
                                <li>{item.name}</li>
                                <li>{item.cnh}</li>
                                <li>{item.tel}</li>
                                <li>{item.vehicle}</li>
                                <li>{item.plate}</li>
                                <li>{item.cor}</li>
                                <li><span style={{color: item.status === "Ativo" ? "green" : "red"}}>{item.status}</span></li>
                                <li className="icons">
                                    <FaInfoCircle className="icon" /> 
                                    <FaEdit className="icon" /> 
                                    <MdDeleteForever className="icon" />
                                </li>
                            </ul>
                        ))}
                    </div>
                </section>
            </ContainerTable>
        </Container>}
      
    </ContainerTracking>
  );
};

export default VehicleTracking;