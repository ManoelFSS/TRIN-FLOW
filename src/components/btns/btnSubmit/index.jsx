import { Button } from "./styles"

const BtnSubmit = ({$text, $marginBottom, onClick, $disabled, $opacity, $timer }) => {
    return (
        <Button 
            type="submit"
            style={{marginBottom: $marginBottom, opacity: `${$opacity ? "0.8" : "1"}` }}
            onClick={onClick}
            disabled={$disabled}
        >
            {$text} 
            <span>{$disabled ? `${ $timer }s` : ""}</span>
        </Button>
    )
}

export default BtnSubmit
