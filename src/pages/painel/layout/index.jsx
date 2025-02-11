import { Container } from "./styles"
// componenmts
import Header from "../../../components/header"
import Menu from "../../../components/menu"

const Layout = ({children, $setToogleMenu, $toogleMenu}) => {
    return (
        <Container $toogleMenu={$toogleMenu} >
            <section className="sidebar" >
                <div className="bar"></div>
                <Menu />
            </section>
            <section className="content">
                <Header $setToogleMenu={$setToogleMenu} $toogleMenu={$toogleMenu} />
                <div className="main">
                    {children}
                </div>
                <footer><p>© 2023 Trin-Flow | MF-Tech</p></footer>
            </section>
        </Container>
    )
}

export default Layout