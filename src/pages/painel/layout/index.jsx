import { Container } from "./styles"
// componenmts
import Header from "../../../components/header"
import Menu from "../../../components/menu"
import Messege from "../../../components/messege"
// context 
import { useAuthContext } from "../../../context/AuthContext"

const Layout = ({children, $setToogleMenu, $toogleMenu}) => {
    
    const { messege, selectForm, setSelectForm } = useAuthContext();
    const Year = new Date().getFullYear()

    return (
        <Container $toogleMenu={$toogleMenu} >
            <section className="sidebar" >
                <Menu />
            </section>
            <section className="content">
                <Header $setToogleMenu={$setToogleMenu} $toogleMenu={$toogleMenu} />
                <div className="main">
                    {children}
                </div>
                {/* <footer><p>© 2024 - {Year} Trin-Flow | Todos os direitos reservados - Trin-Codex</p></footer> */}
            </section>
            { messege && <Messege $title={messege.title} $text={messege.message} /> }
        </Container>
    )
}

export default Layout