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
import useLoading from "../../../../pages/hooks/useLoading"
import useFormValue from "../../../../pages/hooks/useFormValue"


const Password_Recovery = ({setSelectForm}) => {

    const { loading, setLoading } = useLoading();
    const { email, setEmail, password, setPassword, passwordRepeat, setPasswordRepeat, codigo, setCodigo } = useFormValue();

    const [simulaApi, setSimulaApi] = useState(false)
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);
    const [coutTime, setCountTime] = useState(240)
    const [controlerTime, setControlerTime] = useState(false)
    const [fromPassword, setFromPassword] = useState(true)


    const handleFormUpdate = () => {
        setLoading(true);
        
    };

    const hendleInpassword = () => {
        setLoading(true);
        setFromPassword(false)
    }



    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setSimulaApi(true);
                setIsDisabledBtn(true);
                setLoading(false);
                setControlerTime(!controlerTime)
            }, 3000);
        }
    }, [loading]);

    useEffect(() => {
        if (simulaApi) {
            const interval = setInterval(() => {
                setCountTime((prevCount) => {
                    if (prevCount === 0) {
                        clearInterval(interval);
                        setIsDisabledBtn(false);
                        setLoading(false);
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
                        $text={simulaApi ? ` Reenviar Codigo` : 'Enviar Codigo'}
                        $marginTop="1vh"
                        onClick={() => handleFormUpdate()} 
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
                                    $text="Verificar Codigo"
                                    $marginTop="1.5vh" 
                                    $typeText="submit"
                                    onClick={(e) => {simulaApi && e.preventDefault() ,  hendleInpassword()}}
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
                    $text="Voltar" 
                    onClick={() => setSelectForm("login")}
                />
            </section>
            
            {loading && <Loading />}
        </FormLayout>
    )
}

export default Password_Recovery
