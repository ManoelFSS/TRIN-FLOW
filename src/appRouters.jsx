import {Routes, Route} from "react-router-dom"
// pages
import Dashboard from "./pages/painel/dashboard"
// import Client from "./pages/painel/client"
// import Carriers from "./pages/painel/carriers"
// import Tracking from "./pages/painel/tracking"
// import Product from "./pages/painel/products"
// import Sales from "./pages/painel/sales"
// import Finances from "./pages/painel/finances"
// import Reportes from "./pages/painel/reportes"
// import Company from "./pages/painel/company"
// import Adm from "./pages/painel/adm"

const AppRouters = ({$toogleMenu, $setToogleMenu}) => {
    return (
        <Routes>
            <Route exact path="/" element={<Dashboard $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route exact path="/dashboard" element={<Dashboard $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
        </Routes>
    )
}

export default AppRouters
