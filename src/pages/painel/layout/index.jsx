import { Container } from "./styles"
// componenmts
import Header from "../../../components/header"
import Menu from "../../../components/menu"


const Layout = ({children, $setToogleMenu, $toogleMenu}) => {

    const Year = new Date().getFullYear()
    console.log(Year)


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
                <footer><p>© 2024 - {Year} Trin-Flow | Todos os direitos reservados | Trin-codex</p></footer>
            </section>
        </Container>
    )
}

export default Layout