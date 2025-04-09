import { Container_bar_x, BarActive  } from "./styles"

const data = [
    { name: 'Placa 50 x 50', value: 10000 },
    { name: 'Placa 60 x 60', value: 8000 },
    { name: 'Gesso Lento', value: 6700 },
    { name: 'Gesso Rapido', value: 5700 },
    { name: 'Gesso Cola', value: 4400 },
    { name: 'Bloco 20 x 40', value: 2400 },
    { name: 'Bloquete 50 x 100', value: 900 },
    { name: 'Gesso Projetado', value: 5700 },
    { name: 'Bag 4500 kg', value: 4400 },
    { name: 'Cinzal 20 kg', value: 4400 },
];

const maxValue = Math.max(...data.map(item => item.value)) || 1;

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
                {data.sort((a, b) => b.value - a.value).map((item, i) => {
                    const percent = (item.value / maxValue) * 100;
                    console.log(percent);
                    return (
                        <>
                            <h3>{item.name}</h3>
                            <section className="bar-area" $delay={i * 0.1}>
                                <div className="value-hover">
                                    <p>{item.value}</p>
                                </div>
                                <div className="bar">
                                    <div className="bar-fill">
                                        <BarActive style={{ width: `${percent}%` }} $delay={i * 0.1} ></BarActive>
                                    </div>
                                </div>
                                <p className="value">{formatValue(item.value)}</p>
                            </section>    
                        </>                 
                    );
                })}
        </Container_bar_x>
    )
}

export default BarChart_x

