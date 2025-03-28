import { useState } from "react"
import {Container,  Input } from "./styles"
import { FaEye, FaEyeSlash  } from "react-icons/fa";

const InputComponent = (
    {
        $typeText, 
        $placeholder, 
        $textId, 
        $name, 
        $autoComplete, 
        $value,
        $onchange,
    }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container>
            <Input 
                type={$typeText === "password" ? showPassword ? $typeText : "text" : $typeText} 
                id={$textId} 
                name={$name} 
                placeholder={$placeholder} 
                autoComplete={$autoComplete}
                value={$value}
                onChange={$onchange}
                required
                className="checkd"
            />
            {$typeText === "password" && 
                <>
                    { showPassword ? (
                            <FaEyeSlash 
                                className="icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEye 
                                className="icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )
                    }
                </> 
            }
        </Container>
    )
}

export default InputComponent
