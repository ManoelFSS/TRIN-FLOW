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
//db
import { entregas, vendas, clientes, Transportadores } from "../../../DB";

const data = [{value:1000000}]

const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Vendas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(3, 205, 114)"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: "rgb(3, 205, 114)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Despesas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(206, 12, 12)"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: "rgb(206, 12, 12)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Pagar Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #FF9D00"}
                    icon={
                        <RiMoneyDollarCircleFill  
                            className="icon"
                            style={{ color: " #FF9D00" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Receber Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(2, 119, 16)"}
                    icon={
                        <FaHandHoldingUsd   
                            className="icon"
                            style={{ color:"rgb(2, 119, 16)"}}
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
