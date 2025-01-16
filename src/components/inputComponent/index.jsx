import { Input } from "./styles"

const InputComponent = ({$typeText, $placeholder, $textId, $name, $autoComplete, $required}) => {
    return (
        <Input 
            type={$typeText} 
            id={$textId} 
            name={$name} 
            placeholder={$placeholder} 
            autoComplete={$autoComplete}
            required
        />
    )
}

export default InputComponent
