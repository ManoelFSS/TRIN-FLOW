import { Container } from "./styles"

const FormLayout = ({ children }) => {
    return (
        <Container>
            <form action="">
                {children}
            </form>
        </Container>
    )
}

export default FormLayout
