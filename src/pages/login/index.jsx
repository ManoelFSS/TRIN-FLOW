import { Container_login} from "./styles";
//components
import Logo from "../../components/logo"
import LoginForm from "../../components/forms/userForm/loginForm"
import Register from "../../components/forms/userForm/register"
import Password_Recovery from "../../components/forms/userForm/password_recovery"
//Hooks
import useLFormSelect from "../../pages/hooks/useFormSelect";

// icons
import { FaWhatsapp, FaFacebook, FaInstagram  } from "react-icons/fa";

const Login = () => {

    const { selectForm, setSelectForm   } = useLFormSelect();

    return (
        <Container_login>
            <section className="box-left">
                <div className="box-container">
                    <Logo  $width="20vh"/>
                    <h1>TRIN-FLOW</h1>
                    <p>Tudo que sua Empresa precisa.</p>
                    <div className="icons">
                        <FaWhatsapp className="whatsapp" onClick={() => window.open('https://wa.me/5574935050160', '_blank')} />
                        <FaFacebook className="facebook" onClick={() => window.open('https://www.facebook.com/manoel.fernando.50', '_blank')} />
                        <FaInstagram className="instagram" onClick={() => window.open('https://www.instagram.com/manoelfernandoplk/', '_blank')} />
                    </div>
                </div>
            </section>
            <section className="box-right">
                <div className="box-blu">
                    { selectForm === "login" && <LoginForm  setSelectForm={setSelectForm}/>}
                    { selectForm === "register" && <Register  setSelectForm={setSelectForm} /> }
                    { selectForm === "password" && <Password_Recovery  setSelectForm={setSelectForm} />}
                </div>
                <p className="copyright"> © 2024 Trin-Flow.</p>
            </section>
        </Container_login>
    )
}

export default Login;