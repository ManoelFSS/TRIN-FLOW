import { Container } from "./styles"
// context
import { useAuthContext } from "../../../context/AuthContext"


const FormLayout = ({ children, $height }) => {
    const { signInUser, registerUser, selectForm } = useAuthContext()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name: event.target.name?.value || "",
            phone: event.target.phone?.value || "",
            email: event.target.email?.value || "",
            password: event.target.senha?.value || "",
            acceptTerms: event.target.termo?.checked || true, // Checkbox usa checked
            isAdmin: true,
            createdAt: new Date(),
            lastPaymentDate: new Date(),
            status: "active"
        };


        switch (selectForm) {
            case "login":
                await signInUser(user.email, user.password);
                break;
            case "register":
                await registerUser(user);
                break;
            case "password":
                console.log("formulário de troca de senha");
                break;
            default:
                break;
        }
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
