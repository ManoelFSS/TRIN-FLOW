import  { Container_header } from "./styles"

// components
import Logo from "../../components/logo"
import  Title from "../../components/title"
import Btn from "../../components/btns/btnSubmit"
// icons
import { IoMenu, IoArrowUndo, IoToggle } from "react-icons/io5";

const Header = ({$setToogleMenu, $toogleMenu}) => {

    return (
        <Container_header $toogleMenu={$toogleMenu} > 
            <IoMenu className="menu" onClick={() => $setToogleMenu(!$toogleMenu)} />
            <div className="title">
                <Logo  />
                <Title 
                    $text="TRIN-FLOW" 
                    $cor={"var( --color-text-primary )"} 
                    $bord={"none"}
                    padd={"0"}
                    
                />
            </div>
            <div className="box_right">
                <div className="exit">
                    <IoArrowUndo className="icon" />
                    <Btn $text="Sair" />
                </div>
            </div>
        </Container_header>
    )
}

export default Header
