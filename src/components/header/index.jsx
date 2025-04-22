import { useState } from "react"
import  { Container_header } from "./styles"
// components
import Logo from "../../assets/logo.png"
import  Title from "../../components/title"
import Btn from "../../components/btns/btnSubmit"
// icons
import { IoMenu, IoArrowUndo, IoToggle } from "react-icons/io5";
import { VscBellDot } from "react-icons/vsc";

// context
import { useAuthContext } from "../../context/AuthContext"

const Header = ({$setToogleMenu, $toogleMenu}) => {

    const { logoutUser } = useAuthContext()

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
        <Container_header 
            $toogleMenu={$toogleMenu} 
            $alert={alert.length}
        > 
            <IoMenu className="menu" onClick={() => $setToogleMenu(!$toogleMenu)} />
            <div className="title">
                <img src={Logo} alt="logo" />
                <Title 
                    $text="TRIN-FLOW" 
                    $cor={"var( --color-text-primary )"} 
                    $bord={"none"}
                    padd={"0"}
                    
                />
            </div>
            <div className="box_right">
                <div className="notification">
                    <VscBellDot className="icon-notification" />
                </div>
                <div className="exit">
                    <IoArrowUndo className="icon" />
                    <Btn 
                        $text="Sair"
                        onClick={logoutUser}
                    />
                </div>
            </div>
        </Container_header>
    )
}

export default Header
