import { Input } from "./styles"

const InputComponent = (
    {
        $typeText, 
        $placeholder, 
        $textId, 
        $name, 
        $autoComplete, 
        $required,
        $value,
        $onchange
    }) => {
    return (
        <Input 
            type={$typeText} 
            id={$textId} 
            name={$name} 
            placeholder={$placeholder} 
            autoComplete={$autoComplete}
            value={$value}
            onChange={$onchange}
            required={$required}
        />
    )
}

export default InputComponent
