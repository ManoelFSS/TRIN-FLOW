import { Button } from "./styles"

const BtnNavigate = ({$text, onClick}) => {
    return (
        <Button 
            type="button"
            onClick={onClick}
        >
            {$text}
        </Button>
    )
}

export default BtnNavigate
