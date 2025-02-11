import { Text } from "./styles"

const Title = ({$text, $cor, $textCenter, $bord, padd, $fontSize}) => {
    return (
        <Text style={
            {   
                color: $cor, 
                textAlign: $textCenter,
                border: $bord,
                padding: padd,
                fontSize: $fontSize
            }
        }>{$text}</Text>
    )
}

export default Title
