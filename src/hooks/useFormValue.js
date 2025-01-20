import { useState } from 'react';

const useFormValue = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [codigo, setCodigo] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    
    return { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        passwordRepeat, 
        setPasswordRepeat, 
        codigo, 
        setCodigo, 
        name, 
        setName, 
        phone, 
        setPhone, 
        cpf, 
        setCpf };
};

export default useFormValue;
