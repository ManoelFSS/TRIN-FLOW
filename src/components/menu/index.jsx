import { Nav } from "./styles"
// icons
import { MdDashboardCustomize, MdGroupAdd, MdAdminPanelSettings } from "react-icons/md";
import 
    { FaTruckFast, 
        FaProductHunt, 
        FaLayerGroup, 
        FaMoneyBillTransfer, 
        FaSquarePollVertical, 
        FaBuildingCircleExclamation,
        FaMapLocationDot,
        FaGear
    } from "react-icons/fa6";

import Logo from "../logo";


const Menu = () => {
    return (
        <Nav>
            <div className="logo">
                <Logo $width={"20vh"} />
                <h3>TRIN-FLOW</h3>
            </div>
            <ul>
                <li> 
                    <MdDashboardCustomize className="icon" /> 
                    Dashboard
                </li>
                <li>
                    <MdGroupAdd className="icon" />
                    Clientes
                </li>
                <li>
                    <FaTruckFast className="icon" />
                    Transportadores
                </li>
                <li>
                    <FaMapLocationDot className="icon" />
                    Rastreamento
                </li>
                <li>
                    <FaProductHunt className="icon" />
                    Produtos
                </li>
                <li>
                    <FaLayerGroup className="icon" />
                    Vendas
                </li>
                <li>
                    <FaMoneyBillTransfer className="icon" />
                    Finanças
                </li>
                <li>
                    <FaSquarePollVertical className="icon" />
                    Relatórios
                </li>
                <li>
                    <FaBuildingCircleExclamation className="icon" />
                    Empresa
                </li>
                <li>
                    <MdAdminPanelSettings className="icon" />
                    Administrador
                </li>
                <li>
                    <FaGear className="icon gear" />
                    Configurações
                </li>
            </ul>
        </Nav>
    )
}

export default Menu
