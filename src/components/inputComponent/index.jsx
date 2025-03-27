import { Input } from "./styles"

const InputComponent = (
    {
        $typeText, 
        $placeholder, 
        $textId, 
        $name, 
        $autoComplete, 
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
            required
        />
    )
}

export default InputComponent
