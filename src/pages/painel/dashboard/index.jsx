import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
import CardDashboard from "../../../components/cards/cardDashboard";
// icons
import { FaChartSimple, FaTruckFast, FaArrowUpRightDots  } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";

import { RiMoneyDollarCircleFill } from "react-icons/ri";


const data = [{value:235687}]

const Dashboard = () => {
    return (
        <Container_dashboard>
            <section className="cards">
                <CardDashboard 
                    money={data[0]?.value} 
                    text="Pagar Hoje" 
                    cor={"rgba(255, 157, 0, 0.09)"}
                    cor2={" #FF9D00"}
                    icon={
                        <RiMoneyDollarCircleFill  
                            className="icon"
                            style={{ color: " #FF9D00" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    money={data[0]?.value} 
                    text="Receber Hoje" 
                    cor={"rgba(18, 124, 205, 0.1)"}
                    cor2={" #127CCD"}
                    icon={
                        <FaHandHoldingUsd   
                            className="icon"
                            style={{ color: " #127CCD" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    money={data[0]?.value} 
                    text="Despesas Total | Mês" 
                    cor={"rgba(135, 0, 0, 0.12)"}
                    cor2={" #a70303"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: " #a70303" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    money={data[0]?.value} 
                    text="Vendas Total | Mês" 
                    cor={"rgba(26, 144, 91, 0.1)"}
                    cor2={" #1A905A"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: " #1A905A" }}
                        />
                    } 
                />
            </section>

            <section className="charts">
                <TopProductsChart 
                    title="Produtos" 
                    text="Mais vendidos"
                    icon={<FaChartSimple className="icon" />}
                >
                    <BarChart_x />
                </TopProductsChart>
                <TopProductsChart 
                    title="Entregas" 
                    text="do Mês"
                    icon={<FaTruckFast className="icon" />}
                >
                    <ChartPizza />
                </TopProductsChart>
            </section>
        </Container_dashboard>
    )
}

export default Dashboard
