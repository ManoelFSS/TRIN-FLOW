import { Container } from "./styles";

const CardDashboard = ({ $money, icon, text, cor, cor2, toogleMenu}) => {
    console.log(typeof($money));
    return (
        <Container 
            $money={ $money }
            style={{ backgroundColor: cor, flex : toogleMenu ? "1" : "" }}
        >
            <div className="card-header ">
                <h3>{typeof $money === "number" ? parseFloat($money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : $money + " Alertas"}</h3>
                <span>{icon}</span>
            </div>
            <p
                style={{ backgroundColor: cor2 }}
            >
                {text}
            </p>
        </Container>
    )
}

export default CardDashboard;


