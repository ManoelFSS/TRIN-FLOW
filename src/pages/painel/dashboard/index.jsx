import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
// icons
import { FaChartSimple } from "react-icons/fa6";


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
        </Container_dashboard>
    )
}

export default Dashboard
