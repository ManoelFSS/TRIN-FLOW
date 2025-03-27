import React, { useState, useEffect } from 'react'
// components
import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
import Loading from "../../../loading"
// hooks
import useFormValue from "../../../../pages/hooks/useFormValue"
// context
import { useAuthContext } from "../../../../context/AuthContext"

const Password_Recovery = ({setSelectForm}) => {

    const { sendEmail,  loading, setMessege } = useAuthContext();

    const { email, setEmail, password, setPassword, passwordRepeat, setPasswordRepeat, codigo, setCodigo } = useFormValue();

    const [simulaApi, setSimulaApi] = useState(false)
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);
    const [coutTime, setCountTime] = useState(240)
    const [controlerTime, setControlerTime] = useState(false)
    const [fromPassword, setFromPassword] = useState(true)
    const [validaCodigo, setValidaCodigo] = useState(null)

    const handleFormUpdate = async () => {
        function gerarCodigo() {
            const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
            let codigo = "";
            for (let i = 0; i < 8; i++) {
              const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                codigo += caracteres[indiceAleatorio];
            }
            return codigo;
        }
        
        const codigoGerado = gerarCodigo();
        setValidaCodigo(codigoGerado)
        const result = await sendEmail(email, codigoGerado);
        if (!result.success) {
            setMessege({success: false, title: result.title, message: result.message});
            return
        }
        
        setSimulaApi(true);
        setIsDisabledBtn(true);
        setControlerTime(!controlerTime)
        
    };

    const hendleInpassword = () => {
        if (validaCodigo !== codigo){
            setMessege({success: false, title: "Codigo Invalido", message: "Verifique o Codigo e Tente Novamente"});
            return console.log("Codigo Invalido");
        };
        setFromPassword(true) 
    }

    useEffect(() => {
        if (simulaApi) {
            const interval = setInterval(() => {
                setCountTime((prevCount) => {
                    if (prevCount === 0) {
                        clearInterval(interval);
                        setIsDisabledBtn(false);
                        return 240; // Reseta o contador
                    }
                    return prevCount - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [simulaApi, controlerTime]);


    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Recuperar senha"  $cor={"var(  --color-text-primary )"}  />
            </section>
            { fromPassword && 
                <>
                    <section className="box">
                        <LabelComponent $text="Email" $htmlFor="email" />
                        <InputComponent 
                            $typeText="email" 
                            $textId="email"
                            $value={email}
                            $onchange={(e) => setEmail(e.target.value)} 
                            $name="email" 
                            $placeholder="Exmplo@gmail.com" 
                            $autoComplete="current-email" 
                            $required 
                        />
                    </section>
                    <BtnSubmit 
                        $typeText="button"
                        $text={simulaApi ? ` Reenviar Codigo` : 'Enviar Codigo'}
                        $marginTop="1vh"
                        onClick={(event) =>{ event.preventDefault();  handleFormUpdate()}} 
                        $disabled={isDisabledBtn}
                        $opacity={isDisabledBtn}
                        $timer={coutTime}
                    /> 
                    
                    { simulaApi && 
                        <>
                            <p className="text"> Por Favor Verifique seu Email envianos um codigo</p>
                            <section className="box">
                                <LabelComponent $text="Codigo" $htmlFor="codigo" />
                                <InputComponent 
                                    $typeText="text" 
                                    $textId="codigo"
                                    $value={codigo}
                                    $onchange={(e) => setCodigo(e.target.value)} 
                                    $name="codigo" 
                                    $placeholder="Digite o Codigo" 
                                    $autoComplete="current-text" 
                                    $required 
                                />
                                <BtnSubmit 
                                    $typeText="button"
                                    $text="Verificar Codigo"
                                    $marginTop="1.5vh" 
                                    onClick={(event) => {simulaApi && event.preventDefault();  hendleInpassword()}}
                                />
                            </section>
                        </>
                    }
                </>
            }

            {!fromPassword && 
                <>
                    <section className="box">
                        <LabelComponent $text="Senha" $htmlFor="senha" />
                        <InputComponent 
                            $typeText="password" 
                            $textId="senha"
                            $value={password}
                            $onchange={(e) => setPassword(e.target.value)} 
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
                            $textId="senha02"
                            $value={passwordRepeat}
                            $onchange={(e) => setPasswordRepeat(e.target.value)} 
                            $name="senha02" 
                            $placeholder="Digite a Senha novamente" 
                            $autoComplete="current-password" 
                            $required 
                        />
                        <BtnSubmit 
                            $text="Alterar Senha"
                            $marginTop="1.5vh" 
                            $typeText="submit"
                            onClick={(e) => {!simulaApi && e.preventDefault() ,  hendleInpassword()}}
                        />
                    </section>
                </>
            }
            <section className="btns">
                {!simulaApi && 
                    <BtnNavigate 
                        $text="Cadastre-se"
                        onClick={() => setSelectForm("register")} 
                    />
                }
                <BtnNavigate 
                    $text="Fazer Login" 
                    onClick={() => setSelectForm("login")}
                />
            </section>
            
            {loading && <Loading />}
        </FormLayout>
    )
}

export default Password_Recovery
