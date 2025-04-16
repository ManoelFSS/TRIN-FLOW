import { Container } from "./styles"
// componentes
import IndicadorColor from "../../indicadorColor"
import Select from "../../select"
import BarChart_y from "../barChart_y"
import useSelect from "../../../hooks/useSelect"
// db 
import { estoque }from "../../../DB"

const data = ["Todos", "A lorem", "B lorem", "C lorem"]

const StockProductChart= () => {

    const { select, setSelect  } = useSelect()

    return (
        <Container >
            <div className="chart-header">
                <Select data={data} select={select} setSelect={setSelect}/>
                <h3>Controle de Estoque</h3>
                <ul>
                    <IndicadorColor color=" #FF9D00" width="15px" height="10px" text="Baixo" />
                    <IndicadorColor color=" #c70606" width="15px" height="10px" text="Esgotado" />
                </ul>
            </div>
            <div className="chart-main">
                <BarChart_y data={estoque} />
            </div>
        </Container>
    )

}

export default StockProductChart
