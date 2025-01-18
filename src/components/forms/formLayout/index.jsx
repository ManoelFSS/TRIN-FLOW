import { Container } from "./styles"

const FormLayout = ({ children }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </Container>
    )
}

export default FormLayout
