import { useState } from "react";
import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
import CardDashboard from "../../../components/cards/cardDashboard";
import StockProductChart from "../../../components/charts/stockProductChart";
// icons
import { FaChartSimple, FaTruckFast, FaArrowUpRightDots  } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCartArrowDown  } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbSteeringWheel } from "react-icons/tb";
import { GoAlertFill } from "react-icons/go";
//db
import { entregas, vendas, clientes, Transportadores } from "../../../DB";

const data = [{value:1000000}]

const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    const [alert, setAlert] = useState(
        [
            {
                id: 1,
                view: false,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O motor do forno  de 30cv queimou! ",
                name: "Felipe",
                level: "Alto",
                userId: 1,
            },
            {
                id: 2,
                view: false,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O motor do forno  de 30cv queimou! ",
                name: "Felipe",
                level: "Alto",
                userId: 1,
            },
            {
                id: 3,
                view: false,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O motor do forno  de 30cv queimou! ",
                name: "Felipe",
                level: "Alto",
                userId: 1,
            },
        ]);

    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={`${alert.length}`} 
                    text="Ver Alertas" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(219, 19, 19)"}
                    icon={
                        <GoAlertFill    
                            className="icon"
                            style={{ color:"rgb(219, 19, 19)"}}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Vendas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #1A905A"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: " #1A905A" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Despesas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #FF9D00"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: " #FF9D00" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Pagar Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(0, 10, 206)"}
                    icon={
                        <RiMoneyDollarCircleFill  
                            className="icon"
                            style={{ color: "rgb(0, 10, 206" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Receber Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(102, 119, 104)"}
                    icon={
                        <FaHandHoldingUsd   
                            className="icon"
                            style={{ color: "rgb(102, 119, 104)"}}
                        />
                    } 
                />
            </section>
            
            <section className="charts-container">
                <section className="charts">
                    <TopProductsChart 
                        title="Produtos" 
                        text="Mais vendidos"
                        icon={<FaChartSimple className="icon" />}
                    >
                        <BarChart_x />
                    </TopProductsChart>
                        {/* {chartpizza} */}
                    <TopProductsChart 
                        title="Entregas" 
                        text="do Mês"
                        icon={<FaTruckFast className="icon" />}
                        width="250px"
                        height="290px"
                    >
                        <ChartPizza data={entregas} />
                    </TopProductsChart>

                    <TopProductsChart 
                        title="Vendas" 
                        text="do Mês"
                        icon={<FaCartArrowDown  className="icon" />}
                        width="250px"
                        height="290px"
                    >
                        <ChartPizza data={vendas} />
                    </TopProductsChart>

                    <TopProductsChart 
                        title="Clientes" 
                        text="Total"
                        icon={<BsFillPersonLinesFill   className="icon" />}
                        width="250px"
                        height="290px"
                    >
                        <ChartPizza data={clientes} />
                    </TopProductsChart>

                    <TopProductsChart 
                        title="Transportadores" 
                        text="Total"
                        icon={<TbSteeringWheel   className="icon" />}
                        width="250px"
                        height="290px"
                    >
                        <ChartPizza data={Transportadores} />
                    </TopProductsChart>
                </section>
                <section className="chart-stock">
                    <StockProductChart />
                </section>
            </section>
        </Container_dashboard>
    )
}

export default Dashboard
