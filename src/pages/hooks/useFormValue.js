import { useState } from 'react';

const useFormValue = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [codigo, setCodigo] = useState('');

    return { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        name, 
        setName, 
        phone, 
        setPhone, 
        checkbox,
        setCheckbox,
        codigo, setCodigo
    };
};

export default useFormValue;
