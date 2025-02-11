import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
// hooks 
import useFormValue from "../../../../pages/hooks/useFormValue"
const Register = ({setSelectForm}) => {

    const { 
        name, 
        setName, 
        phone, 
        setPhone, 
        cpf, 
        setCpf, 
        email, 
        setEmail, 
        password, 
        setPassword,
        passwordRepeat, 
        setPasswordRepeat 
    } = useFormValue();
    
    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Cadastro"  $cor={"var(  --color-text-primary )"}  />
            </section>
            <section className="box">
                <LabelComponent $text="Nome Completo" $htmlFor="name" />
                <InputComponent 
                    $typeText="text"
                    $value={name} 
                    $onchange={(e) => setName(e.target.value)} 
                    $textId="name" 
                    $name="name" 
                    $placeholder="Digite seu Nome" 
                    $autoComplete="current-text" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Telefone" $htmlFor="phone" />
                <InputComponent 
                    $typeText="text"
                    $value={phone} 
                    $onchange={(e) => setPhone(e.target.value)} 
                    $textId="nphone" 
                    $name="phone" 
                    $placeholder="(xx) xxxxx-xxxx" 
                    $autoComplete="current-text" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="CPF | CNPJ" $htmlFor="cpf" />
                <InputComponent 
                    $typeText="text"
                    $value={cpf}
                    $onchange={(e) => setCpf(e.target.value)} 
                    $textId="cpf" 
                    $name="cpf" 
                    $placeholder="Digite seu CPF" 
                    $autoComplete="current-text" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Email" $htmlFor="email" />
                <InputComponent 
                    $typeText="email"
                    $value={email} 
                    $onchange={(e) => setEmail(e.target.value)} 
                    $textId="email" 
                    $name="email" 
                    $placeholder="Exmplo@gmail.com" 
                    $autoComplete="current-email" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Senha" $htmlFor="senha" />
                <InputComponent 
                    $typeText="password"
                    $value={password} 
                    $onchange={(e) => setPassword(e.target.value)} 
                    $textId="senha" 
                    $name="senha" 
                    $placeholder="Digite sua  Senha" 
                    $autoComplete="current-password" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Repita a Senha" $htmlFor="senha02" />
                <InputComponent 
                    $typeText="password"
                    $value={passwordRepeat} 
                    $onchange={(e) => setPasswordRepeat(e.target.value)}
                    $textId="senha02" 
                    $name="senha02" 
                    $placeholder="Digite a Senha novamente" 
                    $autoComplete="current-password" 
                    $required 
                />
            </section>
            <section className="btns">
                <BtnSubmit $text="Cadastrar" />
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
