import { Container_search } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Search = ({valueSearch, setValueSearch}) => {
    return (
        <Container_search>
            <input 
                type="text" 
                placeholder="Pesquisar" 
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </Container_search>
    )
}

export default Search;