import { Button } from "./styles"

const BtnNavigate = ({$text, onClick, icon,  $width, $height, $background, $color}) => {
    return (
        <Button 
            type="button"
            onClick={onClick}
            style={{
                width: $width,
                height: $height,
                background: $background,
                color: $color,
            }}
        >
            {$text}
            {icon}
        </Button>
    )
}

export default BtnNavigate
