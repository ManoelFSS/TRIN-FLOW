import { Container } from "./styles"
// // componentes
import IndicadorColor from "../../indicadorColor"
import Select from "../../select"
import BarChart_y from "../barChart_y"
import useSelect from "../../../hooks/useSelect"
// // db 
import { estoque }from "../../../DB"

const dataText = ["Todos", "A lorem", "B lorem", "C lorem"]

// const StockProductChart= () => {


//     return (
//         <Container >
//             <div className="chart-header">
//                 <Select data={data} select={select} setSelect={setSelect}/>
//                 <h3>Controle de Estoque</h3>
//                 <ul>
//                     <IndicadorColor color=" #FF9D00" width="15px" height="10px" text="Baixo" />
//                     <IndicadorColor color=" #c70606" width="15px" height="10px" text="Esgotado" />
//                 </ul>
//             </div>
//             <div className="chart-main">
//                 <BarChart_y data={estoque} />
//             </div>
//         </Container>
//     )

// }

// export default StockProductChart

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StockProductChart = () => {

    const { select, setSelect  } = useSelect()
    
    const items = [
        { name: 'Placa 50 x 50', stock: 3000, sold: 5000 },
        { name: 'Placa 60 x 60', stock: 1000, sold: 3000 },
        { name: 'Gesso Lento', stock: 80, sold: 200 },
        { name: 'Gesso Rápido', stock: 5700, sold: 10000 },
        { name: 'Gesso Cola', stock: 0, sold: 3000 },
        { name: 'Bloco 20 x 40', stock: 2000, sold: 4000 },
        { name: 'Bloquete 50 x 100', stock: 9000, sold: 10000 },
        { name: 'Gesso Projetado', stock: 0, sold: 2500 },
        { name: 'Bag 4500 kg', stock: 4400, sold: 7000 },
        { name: 'Cinzal 20 kg', stock: 200, sold: 1000 },
        { name: 'Gesso Cola', stock: 0, sold: 3000 },
        { name: 'Bloco 20 x 40', stock: 2000, sold: 4000 },
        { name: 'Bloquete 50 x 100', stock: 9000, sold: 10000 },
        { name: 'Gesso Projetado', stock: 0, sold: 2500 },
        { name: 'Bag 4500 kg', stock: 4400, sold: 7000 },
        { name: 'Cinzal 20 kg', stock: 200, sold: 1000 },

    ];

    const labels = items.map(item => item.name);

    const estoqueBaixo = items.map(item =>
        item.stock > 0 && item.stock < item.sold ? item.stock : null
    );
    
    const vendidos = items.map(item =>
        item.stock > 0 || item.stock <= 0 ? item.sold : null
    );
    
    const faltando = items.map(item =>
        item.sold > item.stock && item.stock > 0 ? item.sold - item.stock :
        item.stock <= 0 && item.sold > 0 ? item.sold : null
    );
    
    const esgotado = items.map(item =>
        item.stock <= 0 ? item.sold : null
    );

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: estoqueBaixo,
                backgroundColor: 'rgba(255, 157, 0, 0)',
                minBarLength: 0, 
                // barThickness: 10,
            },
            {
                label: 'Estoque Baixo',
                data: estoqueBaixo,
                backgroundColor: ' #FF9D00',
                minBarLength: 5, 
            },
            {
                label: 'Vendidos',
                data: vendidos,
                backgroundColor: ' #00df13',
                minBarLength: 5,
            },
            {
                label: 'Faltando',
                data: faltando,
                backgroundColor: 'rgb(180, 180, 180)',
                minBarLength: 5, 
            },
            {
                label: 'Esgotado',
                data: esgotado,
                backgroundColor: ' #c70606',
                minBarLength: 5,
            },
        ],
    };

    // Plugin para desenhar os nomes na vertical
    const verticalLabelPlugin = {
        id: 'verticalLabels',
        afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const datasetMeta = chart.getDatasetMeta(0); // Índice 2 = 'Vendidos'
    
        ctx.save();
    
        chart.data.labels.forEach((label, index) => {
            const bar = datasetMeta.data[index];
    
            if (bar) {
            const barX = bar.x ;
    
            ctx.save();
            ctx.translate(barX , chart.chartArea.bottom);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'left';
            ctx.fillStyle = '#000';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText(label, 0, 0);
            ctx.restore();
            }
        });
    
        ctx.restore();
        }
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            tooltip: {
                callbacks: {
                label: function (context) {
                    const label = context.dataset.label || '';
                    const value = context.raw;
        
                    // Se for o dataset "Esgotado", mostra valor negativo
                    if (label === 'Esgotado') {
                    return `${label}: -${value}`;
                    }
        
                    // Outros normais
                    return `${label}: ${value}`;
                },
                },
            },
        },
        scales: {
        x: {
            ticks: {
            display:false, // esconde os nomes padrões
            },
            grid: {
            display: false,
            },
        },
        y: {
            beginAtZero:true,
        },
        },
    };

    return (
        <Container >
            <div className="chart-header">
                <Select data={dataText} select={select} setSelect={setSelect}/>
                <h3>Controle de Estoque</h3>

                <div className="custom-legend">
                    {data.datasets.map((dataset, index) => (
                    dataset.label && (
                        <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: dataset.backgroundColor }}
                        ></span>
                        {dataset.label}
                        </div>
                    )
                    ))}
                </div>

            </div>
            <div className="chart-main">
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default StockProductChart;



