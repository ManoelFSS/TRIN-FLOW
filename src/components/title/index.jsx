import { Text } from "./styles"

const Title = ({$text, $cor, $textCenter}) => {
    return (
        <Text style={
            {   
                color: $cor, 
                textAlign: $textCenter
            }
        }>{$text}</Text>
    )
}

export default Title
