import { Container_popup } from "./styles"
import CartImage from "../../assets/carImage.png"

const PopupModal = ({name, plate, latitude, longitude, date, veiclePhoto} ) => {
    return (
        <Container_popup>
                <div className="vehicle">
                    <div className="logo">
                        <img src={veiclePhoto ? veiclePhoto : CartImage} alt="logo" />
                    </div>
                    <h2>
                        {name}
                    </h2>
                    </div>
                <div className="plate">
                    <h4>Placa: </h4>
                    <span>{plate}</span>
                </div>
                <div className="location">
                    <h4>Localização</h4>
                    {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    <span>{date}</span>
                </div>
                <div className="buttons">
                    <button
                        onClick={() =>
                            window.open(
                                `https://www.google.com/maps?q=${latitude},${longitude}`,
                                '_blank'
                            )
                        }
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
                    >
                        Ver Rota
                    </button>
                </div>
        </Container_popup>
    )
}

export default PopupModal