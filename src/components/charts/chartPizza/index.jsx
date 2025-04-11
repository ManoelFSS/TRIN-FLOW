import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Container_chart_pizza } from "./styles";
import IndicadorColor from "../../indicadorColor";

const COLORS = [
    'rgb(0, 179, 0)',
    'rgb(0, 64, 191)',
    'rgb(97, 80, 167)',
    'rgb(82, 194, 254)',
    'rgb(255, 160, 77)',
    'rgb(219, 0, 0)',
];

// ✅ Label customizado — só o número, centralizado
const renderLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    if (value === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10; // 👈 desloca 5px pra fora da fatia
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontWeight="bold"
        >
            {value}
        </text>
    );
};

const ChartPizza = ({data}) => {
    return (
        <Container_chart_pizza>
            <PieChart width={170} height={170}>
                <Pie
                    data={data}
                    cx="48%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    label={renderLabel} // 👈 usando o label customizado
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <ul style={{ width: "100%" }}>
                {data.map((entry, index) => (
                    <IndicadorColor
                        color={COLORS[index % COLORS.length]}
                        width="10px"
                        height="10px"
                        text={entry.name}
                        key={index}
                    />
                ))}
            </ul>
        </Container_chart_pizza>
    );
};

export default ChartPizza;
