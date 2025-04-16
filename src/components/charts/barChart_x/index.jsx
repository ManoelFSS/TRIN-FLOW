import { Container_bar_x, BarActive  } from "./styles"
// db 
import { produtos } from "../../../DB"

const maxValue = Math.max(...produtos .map(item => item.value)) || 1;

const BarChart_x = () => {

    const formatValue = (value) => {
        if (value >= 1_000_000_000_000) return (value / 1_000_000_000_000).toFixed(1).replace('.0', '') + 'T';
        if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace('.0', '') + 'B';
        if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace('.0', '') + 'M';
        if (value >= 1_000) return (value / 1_000).toFixed(1).replace('.0', '') + 'K';
        return value.toString();
    }

    return (
        <Container_bar_x>
                {produtos.sort((a, b) => b.value - a.value).map((item, i) => {
                    const percent = (item.value / maxValue) * 100;
                    return (
                        <div key={i}>
                            <h3>{item.name}</h3>
                            <section className="bar-area">
                                <div className="value-hover">
                                    <p>{item.value}</p>
                                </div>
                                <div className="bar">
                                    <div className="bar-fill">
                                        <BarActive style={{ width: `${percent}%` }} $delay={i * 0.2} ></BarActive>
                                    </div>
                                </div>
                                <p className="value">{formatValue(item.value)}</p>
                            </section>    
                        </div>                 
                    );
                })}
        </Container_bar_x>
    )
}

export default BarChart_x

