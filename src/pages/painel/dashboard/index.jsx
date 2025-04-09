import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
// icons
import { FaChartSimple, FaTruckFast } from "react-icons/fa6";



const Dashboard = () => {
    return (
        <Container_dashboard>
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
        </Container_dashboard>
    )
}

export default Dashboard
