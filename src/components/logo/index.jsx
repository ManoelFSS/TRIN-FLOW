import { Image } from "./styles"
import LogoTipo from "../../assets/logo.svg"

const Logo = ({$width}) => {
    return (
        <Image 
            $width={$width}
            src={LogoTipo}
            alt="Logo tipo do Trin-Flow, uma ingrenagem com grafico de financas em 2d" 
        />
    )
}

export default Logo
