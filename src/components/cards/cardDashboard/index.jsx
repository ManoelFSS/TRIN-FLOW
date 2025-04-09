import { Container } from "./styles";

const CardDashboard = ({ money = 0, icon, text, cor, cor2}) => {
    return (
        <Container 
            className="cardDashboard"
            style={{ backgroundColor: cor }}
        >
            <div className="card-header">
                <h3>{parseFloat(money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                {icon}
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


