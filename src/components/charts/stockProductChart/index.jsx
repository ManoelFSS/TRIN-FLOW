import { useState } from "react";
import { Container } from "./styles"
// // componentes
import Select from "../../select"
import Pagination from "../../pagination"
import useSelect from "../../../hooks/useSelect"

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
    
    const items = [
        { name: 'Placa 50 x 50', stock: 3000, sold: 5000, minStock: 1000, category: 'Placas' },
        { name: 'Placa 60 x 60', stock: 1000, sold: 3000, minStock: 1000, category: 'Placas' },
        { name: 'Gesso Lento', stock: 80, sold: 500, minStock: 1000, category: 'Gesso' },
        { name: 'Gesso Rápido', stock: 5700, sold: 10000, minStock: 1000, category: 'Gesso'  },
        { name: 'Gesso Cola', stock: 10000, sold: 10, minStock: 1000, category: 'Gesso'  },
        { name: 'Bloco 20 x 40', stock: 2000, sold: 4000, minStock: 1000, category: 'Blocos'  },
        { name: 'Bloquete 50 x 100', stock: 9000, sold: 10000, minStock: 1000, category: 'Blocos'  },
        { name: 'Gesso Projetado', stock: 0, sold: 2500, minStock: 1000, category: 'Gesso'  },
        { name: 'Bag 4500 kg', stock: 4400, sold: 7000, minStock: 1000, category: 'Gesso'   },
        { name: 'Cinzal 20 kg', stock: 2000, sold: 1500, minStock: 1000, category: 'Fibras'   },
        { name: 'Gesso Cola', stock: 0, sold: 3000, minStock: 1000, category: 'Gesso'  },
        { name: 'Bloco 25 x 50', stock: 2000, sold: 4000, minStock: 1000, category: 'Blocos'  },
        { name: 'Bloquete 60 x 120', stock: 9000, sold: 10000, minStock: 1000, category: 'Blocos'  },
        { name: 'Gesso Fibra', stock: 0, sold: 2500, minStock: 1000, category: 'Gesso'  },
        { name: 'Bag 4500 kg', stock: 4400, sold: 7000, minStock: 1000, category: 'Gesso'  },

        { name: 'Smartphone Galaxy S21', stock: 300, sold: 500, minStock: 100, category: 'Eletrônicos' },
        { name: 'Smart TV 50"', stock: 100, sold: 250, minStock: 50, category: 'Eletrônicos' },
        { name: 'Notebook Dell XPS 13', stock: 50, sold: 200, minStock: 30, category: 'Eletrônicos' },
        { name: 'Camiseta Básica Branca', stock: 800, sold: 1200, minStock: 300, category: 'Camisetas' },
        { name: 'Camiseta Estampada Skull', stock: 600, sold: 1000, minStock: 300, category: 'Camisetas' },
        { name: 'Camiseta Preta Slim Fit', stock: 900, sold: 1400, minStock: 300, category: 'Camisetas' },
        { name: 'Relógio Digital Casio', stock: 120, sold: 400, minStock: 100, category: 'Acessórios' },
        { name: 'Mochila Escolar Nike', stock: 70, sold: 150, minStock: 50, category: 'Acessórios' },
        { name: 'Fone Bluetooth JBL', stock: 300, sold: 800, minStock: 200, category: 'Eletrônicos' },
        { name: 'Boné Aba Reta NY', stock: 150, sold: 500, minStock: 100, category: 'Acessórios' },
        { name: 'Calça Jeans Slim', stock: 400, sold: 700, minStock: 200, category: 'Calças' },
        { name: 'Calça Moletom Cinza', stock: 250, sold: 600, minStock: 150, category: 'Calças' },
        { name: 'Tênis Adidas RunFalcon', stock: 350, sold: 1000, minStock: 200, category: 'Calçados' },
        { name: 'Sandália Havaianas', stock: 900, sold: 1500, minStock: 300, category: 'Calçados' },
        { name: 'Óculos de Sol Ray-Ban', stock: 60, sold: 300, minStock: 50, category: 'Acessórios' },

        { name: 'Cimento CP-II 50kg', stock: 1200, sold: 3000, minStock: 500, category: 'Materiais de Construção' },
        { name: 'Areia Média Ensacada', stock: 500, sold: 800, minStock: 200, category: 'Materiais de Construção' },
        { name: 'Brita 1 Ensacada', stock: 600, sold: 1000, minStock: 300, category: 'Materiais de Construção' },
        { name: 'Telha Cerâmica 2.44m', stock: 400, sold: 700, minStock: 200, category: 'Coberturas' },
        { name: 'Bloco de Concreto 39x19x14', stock: 3000, sold: 4500, minStock: 1000, category: 'Alvenaria' },
        { name: 'Tijolo Baiano', stock: 5000, sold: 7000, minStock: 1500, category: 'Alvenaria' },
        { name: 'Tinta Acrílica 18L - Branco', stock: 120, sold: 300, minStock: 50, category: 'Tintas' },
        { name: 'Tinta Esmalte 3,6L - Preto Fosco', stock: 80, sold: 200, minStock: 40, category: 'Tintas' },
        { name: 'Lixa Dágua nº 220', stock: 1500, sold: 2500, minStock: 1000, category: 'Abrasivos' },
        { name: 'Broxa de Pintura 5"', stock: 600, sold: 1200, minStock: 400, category: 'Pintura' },
        { name: 'Martelo de Unha 27mm', stock: 150, sold: 400, minStock: 50, category: 'Ferramentas' },
        { name: 'Chave de Fenda 6mm', stock: 200, sold: 500, minStock: 100, category: 'Ferramentas' },
        { name: 'Furadeira Impacto 650W', stock: 60, sold: 150, minStock: 30, category: 'Ferramentas Elétricas' },
        { name: 'Serra Mármore 1400W', stock: 40, sold: 100, minStock: 20, category: 'Ferramentas Elétricas' },
        { name: 'Parafuso Madeira 4x40mm', stock: 8000, sold: 12000, minStock: 3000, category: 'Fixação' },
        { name: 'Bucha Plástica nº 8', stock: 5000, sold: 9000, minStock: 2000, category: 'Fixação' },
        { name: 'Canaleta PVC 2m', stock: 300, sold: 500, minStock: 100, category: 'Elétrica' },
        { name: 'Fio Flexível 2,5mm - 100m', stock: 100, sold: 250, minStock: 50, category: 'Elétrica' },
        { name: 'Interruptor Simples', stock: 400, sold: 800, minStock: 200, category: 'Elétrica' },
        { name: 'Tomada 10A 2P+T', stock: 450, sold: 750, minStock: 200, category: 'Elétrica' },
    ]

    const { select, setSelect  } = useSelect()
    const [paginacao, setPaginacao] = useState(1);

    const itemsPerPage = 16;
    const startIndex = (paginacao - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // fiter e mimite 12 items
    const filteredItems = items.filter(item => select !== "Todos" ? item.category === select : item)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const labels = filteredItems.slice(startIndex, endIndex).map(item => item.name);

    const estoque = items.map(item =>
        item.stock > item.sold || item.sold === 0 ? item.stock : item.stock > 0 ? item.stock : null
    );
    
    const vendidos = items.map(item =>
        item.stock > 0 || item.stock <= 0 ? item.sold : null
    );
    
    const faltando = items.map(item =>
        item.sold > item.stock && item.stock > 0 ? item.sold - item.stock :
        item.stock <= 0 && item.sold > 0 ? item.sold : null
    );
    
    const esgotado = items.map(item =>
        item.stock <= 0 && item.sold > 0 ? item.sold : null
    );
    

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: estoque,
                backgroundColor: 'rgba(255, 157, 0, 0)',
                minBarLength: 0, 
            },
            {
                label: 'Estoque',
                data: estoque,
                backgroundColor: 'hsl(37, 100.00%, 50.00%)',
                minBarLength: 3, 
                // barThickness: 10,
            },
            {
                label: 'Vendidos',
                data: vendidos,
                backgroundColor: ' #00df13',
                minBarLength: 3,
                // barThickness: 10,
            },
            {
                label: 'Faltando',
                data: faltando,
                backgroundColor: 'rgb(187, 186, 186)',    
                minBarLength: 3, 
                // barThickness: 10,
            },
            {
                label: 'Esgotado',
                data: esgotado,
                backgroundColor: ' #c70606',
                minBarLength: 3,
                // barThickness: 10,
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
            ctx.font = 'bold 12px sans-serif';
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
                barPercentage: 1.0,
                categoryPercentage: 0.8,
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
            },
        },
    };

    return (
        <Container >
            <div className="chart-header">
                <Select 
                    data={items} 
                    select={select} 
                    setSelect={setSelect}
                    $setPaginacao={setPaginacao}
                />
                <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
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



