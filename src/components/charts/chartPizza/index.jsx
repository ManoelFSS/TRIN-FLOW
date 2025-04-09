import { PieChart, Pie, Cell, Tooltip } from 'recharts';

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
        const radius = outerRadius + 14; // 👈 desloca 5px pra fora da fatia
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PieChart width={170} height={170}>
            <Pie
            data={data}
            cx="48%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            paddingAngle={3}
            dataKey="value"
            label={renderLabel} // 👈 usando o label customizado
            labelLine={false}
            >
            {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip
            formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                    backgroundColor: '#f2f2f2',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            />
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
        </div>
    );
};

export default ChartPizza;
