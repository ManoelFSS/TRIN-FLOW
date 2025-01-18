

// components
import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"

const LoginForm = ({setSelectForm}) => {

    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Login"  $cor={"var(  --color-text-primary )"}  />
            </section>
            <section className="box">
                <LabelComponent $text="Email" $htmlFor="email" />
                <InputComponent $typeText="email" $textId="email" $name="email" $placeholder="Exmplo@gmail.com" $autoComplete="current-email" $required />
            </section>
            <section className="box">
                <LabelComponent $text="Senha" $htmlFor="senha" />
                <InputComponent $typeText="password" $textId="senha" $name="senha" $placeholder="Digite sua  Senha" $autoComplete="current-password" $required />
            </section>

            <p onClick={() => setSelectForm("password")}>
                Esqueci minha senha
            </p>

            <section className="btns">
                <BtnSubmit $text="Entrar" />
                <BtnNavigate 
                    $text="Registre-se" 
                    $onClick={() => setSelectForm("register")}
                />
            </section>
        </FormLayout>
    )
}

export default LoginForm