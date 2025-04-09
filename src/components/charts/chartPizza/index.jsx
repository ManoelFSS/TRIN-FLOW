import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Container_chart_pizza } from "./styles";

const data = [
    { name: 'Total', value: 200},
    { name: 'Entregues', value: 50 },
    { name: 'Acaminho', value: 70 },
    { name: 'No prazo', value: 35 },
    { name: 'Atrasadas', value: 25 },
    { name: 'Canceladas', value: 15 },
];

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


const ChartPizza = () => {
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

            <ul style={{width: '90%', fontSize: '14px', marginTop: '12px', listStyle: 'none', padding: 0 }}>
                {data.map((entry, index) => (
                <li
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}
                >
                    <span
                    style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: COLORS[index],
                        display: 'inline-block',
                        fontSize: '10px',
                        fontWeight: 'bold',
                    }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{entry.name}</span>
                </li>
                ))}
            </ul>
        </Container_chart_pizza>
    );
};

export default ChartPizza;
