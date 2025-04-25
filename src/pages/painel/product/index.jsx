import { useState } from "react";
import { Container, ContainerTable } from "./styles"
// components
import BtnNavigate from "../../../components/btns/btnNavigate"
import Select from "../../../components/select"
import Search from "../../../components/search"
import Pagination from "../../../components/pagination"
// icons
import { FaUserPlus } from "react-icons/fa";
import { LuSquareEqual, LuLayoutList } from "react-icons/lu";
import {  PiHandTapFill  } from "react-icons/pi";
import { HiMiniStar } from "react-icons/hi2";
import { FaEdit, FaInfoCircle  } from "react-icons/fa";
import { MdDeleteForever, MdAttachMoney } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import { GiWeight } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { AiOutlineAlignRight } from "react-icons/ai";
import { IoBagHandleSharp } from "react-icons/io5";
// hooks
import useSelect from "../../../hooks/useSelect"

const Client = () => {
    
    const dataHeader = [
        {icon: <IoBagHandleSharp className="icon" />},
        { name: "Nome", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Descrição", icon: <RiFileList2Fill className="icon" /> },
        { name: "Preço", icon: <MdAttachMoney className="icon" /> },
        { name: "Kg", icon: <GiWeight  className="icon" /> },
        { name: "Estoque", icon: <GrMoney className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}
        
    ]

    const databody = [
        { name: "Gesso cola", descricao: "Gesso para colar premodados", preco: 5, kg: "1kg", stock: 2000, status: "Disponivel" },
        { name: "Gesso lento", descricao: "Gesso de revestimento", preco: 20, kg: "40kg", stock: 5000, status: "Disponivel" },
        { name: "Gesso rapido", descricao: "Gesso de revestimento", preco: 10, kg: "40kg", stock: 10000, status: "Disponivel" },
        { name: "Gesso projetado", descricao: "Gesso de revestimento", preco: 10, kg: "40kg", stock: 10000, status: "Disponivel" },
        { name: "Placa 50 x 50", descricao: "premodado para forro", preco: 5, kg: "2kg", stock: 20000, status: "Disponivel" },
        { name: "Placa 60 x 60", descricao: "premodado para forro", preco: 5, kg: "2,5kg", stock: 0, status: "Indisponivel" },
        { name: "Bloco 20 x 40", descricao: "premodado para parede", preco: 1.5, kg: "2kg", stock: 20000, status: "Disponivel" },
        { name: "Bloco 50 x 100", descricao: "premodado para parede", preco: 5, kg: "4kg", stock: 30000, status: "Disponivel" },
    ]


    const data = [
        { category: "Ativo" },
        { category: "Masculino" },
        { category: "Feminino" },
        { category: "Bloqueados" },
    ];

    const img = "https://tangerin.vteximg.com.br/arquivos/ids/165110/Saco-Gesso-Valvula-115mm-109x77cm_4.png?v=638465371970170000"

    const { select, setSelect } = useSelect();
    const [paginacao, setPaginacao] = useState(1);

    const itemsPerPage = 3;
    const startIndex = (paginacao - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // fiter e mimite 12 items
    const filteredItems = databody.filter(item => select !== "Todos" ? item.status === select : item)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const labels = filteredItems.slice(startIndex, endIndex).map(item => item.name);

    return (
        <Container>
            <section className="box-filter">
                <BtnNavigate 
                    $text="Cadastrar Cliente" 
                    icon={<FaUserPlus className="icon" />} 
                    // $width={"200px"}
                />
                <div className="box-icon">
                    <LuSquareEqual className="icon-square" />
                    <LuLayoutList  className="icon-list ative-icon " />
                </div>
                <Select     
                    select={select} 
                    setSelect={setSelect}
                    data={data} 
                    $width={"120px"}
                />
                <Search />
                <Pagination data={databody}
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
            </section>
            <ContainerTable>
                <section className="table">
                    <div className="header">
                        <ul className="header-list">
                            {dataHeader.map((item, index) => (
                                <li key={index}>{item.name} {item.icon}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="body">
                        { databody.map((item, index) => (
                            <ul className="body-list" key={index}>
                                <li><img src={img} alt="avatar" /></li>
                                <li>{item.name}</li>
                                <li>{item.descricao}</li>
                                <li>{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                                <li>{item.kg}</li>
                                <li>{item.stock}</li>
                                <li><span style={{color: item.status === "Disponivel" ? "green" : "red"}}>{item.status}</span></li>
                                <li className="icons">
                                    <FaInfoCircle className="icon" /> 
                                    <FaEdit className="icon" /> 
                                    <MdDeleteForever className="icon" />
                                </li>
                            </ul>
                        ))}
                    </div>
                </section>
            </ContainerTable>
        </Container>
    )
}

export default Client
