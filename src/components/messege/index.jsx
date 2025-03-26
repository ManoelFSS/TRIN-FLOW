import { Container_messege } from "./styles"
// context 
import { useAuthContext } from "../../context/AuthContext"
import Btn from "../btns/btnSubmit"

const Messege = ({$title, $text}) => {
    
    const { setMessege } = useAuthContext();
    
    return (
        <Container_messege>
            <div className="messege-container">
                <h3>{$title}</h3>
                <p>{$text}</p>
                <Btn 
                    $text="Ok"
                    onClick={() => setMessege(null)}
                />
            </div>
        </Container_messege>
    )
}

export default Messege;
