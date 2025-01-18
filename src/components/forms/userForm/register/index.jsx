import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"

const Register = ({setSelectForm}) => {
    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Cadastro"  $cor={"var(  --color-text-primary )"}  />
            </section>
            <section className="box">
                <LabelComponent $text="Nome Completo" $htmlFor="name" />
                <InputComponent $typeText="text" $textId="name" $name="name" $placeholder="Digite seu Nome" $autoComplete="current-text" $required />
            </section>
            <section className="box">
                <LabelComponent $text="Telefone" $htmlFor="phone" />
                <InputComponent $typeText="text" $textId="nphone" $name="phone" $placeholder="Digite seu Nome" $autoComplete="current-text" $required />
            </section>
            <section className="box">
                <LabelComponent $text="CPF" $htmlFor="cpf" />
                <InputComponent $typeText="text" $textId="cpf" $name="cpf" $placeholder="Digite seu CPF" $autoComplete="current-text" $required />
            </section>
            <section className="box">
                <LabelComponent $text="Email" $htmlFor="email" />
                <InputComponent $typeText="email" $textId="email" $name="email" $placeholder="Exmplo@gmail.com" $autoComplete="current-email" $required />
            </section>
            <section className="box">
                <LabelComponent $text="Senha" $htmlFor="senha" />
                <InputComponent $typeText="password" $textId="senha" $name="senha" $placeholder="Digite sua  Senha" $autoComplete="current-password" $required />
            </section>
            <section className="box">
                <LabelComponent $text="Repita a Senha" $htmlFor="senha02" />
                <InputComponent $typeText="password" $textId="senha02" $name="senha02" $placeholder="Digite a Senha novamente" $autoComplete="current-password" $required />
            </section>
            <section className="btns">
                <BtnSubmit $text="Entrar" />
                <BtnNavigate 
                    $text="Recuperar Senha" 
                    $onClick={() => setSelectForm("password")}
                />
                <BtnNavigate 
                    $text="Voltar" 
                    $onClick={() => setSelectForm("login")}
                />
            </section>
        </FormLayout>
    )
}

export default Register
