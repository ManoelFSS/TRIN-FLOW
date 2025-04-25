import { Button } from "./styles"

const BtnNavigate = ({$text, onClick, icon,  $width}) => {
    return (
        <Button 
            type="button"
            onClick={onClick}
            style={{width: $width}}
        >
            {$text}
            {icon}
        </Button>
    )
}

export default BtnNavigate
