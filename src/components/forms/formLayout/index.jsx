import { Container } from "./styles"
// context
import { useAuthContext } from "../../../context/AuthContext"
//Hooks
import useLFormSelect from "../../../pages/hooks/useFormSelect";

const FormLayout = ({ children, $height }) => {

    const {  setLoading, signInUser } = useAuthContext()
    const { selectForm } = useLFormSelect();

    const handleSubmit = async (event) => {
        event.preventDefault();

        switch (selectForm) {
            case "login":
                const { success, message } =  await signInUser(event.target.email.value, event.target.senha.value);
                if (!success) return alert(message);
                setLoading(true);
                break;
            case "register":

                break;
            case "password":

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
