import { Container } from "./styles"

const FormLayout = ({ children, $height }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Container style={{ height: $height }}> 
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </Container>
    )
}

export default FormLayout
