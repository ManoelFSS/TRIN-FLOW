import { Button } from "./styles"

const BtnSubmit = ({$text, $marginTop, onClick, $disabled, $opacity, $timer }) => {
    return (
        <Button 
            type="submit"
            style={{marginTop: $marginTop, opacity: `${$opacity ? "0.8" : "1"}` }}
            onClick={onClick}
            disabled={$disabled}
        >
            {$text} 
            <span>{$disabled ? `${ $timer }s` : ""}</span>
        </Button>
    )
}

export default BtnSubmit
