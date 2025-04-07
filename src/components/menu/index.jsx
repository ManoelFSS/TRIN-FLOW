import { useState, useEffect } from "react"
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
    } from "react-icons/fa6";
import Logo from "../logo";
// context
import { useAuthContext } from "../../context/AuthContext";
import {Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const {user} = useAuthContext();
    const navigate = useLocation();

    const [activeLink, setActiveLink] = useState("dashboard");

    useEffect(() => {
        setActiveLink(navigate.pathname);
    }, [navigate.pathname]);

    return (
        <Nav>
            <div className="logo">
                <Logo />
                <h3>{user?.name.split(" ")[0]}</h3>
            </div>
            <ul>
                <Link to="/dashboard">
                    <li className={activeLink === "/" || activeLink === "/dashboard" ? "active" : ""}> 
                        <MdDashboardCustomize className="icon" /> 
                        Dashboard
                    </li>
                </Link>
                <Link to="/clients">
                    <li className={activeLink === "/clients" ? "active" : ""} >
                        <MdGroupAdd className="icon" />
                        Clientes
                    </li>
                </Link>
                <Link to="/drivers">
                    <li className={activeLink === "/drivers" ? "active" : ""}>
                        <FaTruckFast className="icon" />
                        Transportadores
                    </li>
                </Link>
                <Link to="/rastreamento">
                    <li className={activeLink === "/rastreamento" ? "active" : ""}>
                        <FaMapLocationDot className="icon" />
                        Rastreamento
                    </li>
                </Link>
                <Link to="/products">
                    <li className={activeLink === "/products" ? "active" : ""}>
                        <FaProductHunt className="icon" />
                        Produtos
                    </li>
                </Link>
                <Link to="/sales">
                    <li className={activeLink === "/sales" ? "active" : ""}>
                        <FaLayerGroup className="icon" />
                        Vendas
                    </li>
                </Link>
                <Link to="/finances">
                    <li className={activeLink === "/finances" ? "active" : ""}>
                        <FaMoneyBillTransfer className="icon" />
                        Finanças
                    </li>
                </Link>
                <Link to="/reports">
                    <li className={activeLink === "/reports" ? "active" : ""}>
                        <FaSquarePollVertical className="icon" />
                        Relatórios
                    </li>
                </Link>
                <Link to="/settings">
                    <li className={activeLink === "/settings" ? "active" : ""}>
                        <FaBuildingCircleExclamation className="icon" />
                        Empresa
                    </li>
                </Link>
                <Link to="/users">
                    <li className={activeLink === "/users" ? "active" : ""}>
                        <MdAdminPanelSettings className="icon" />
                        Administrador
                    </li>
                </Link>
            </ul>
        </Nav>
    )
}

export default Menu
