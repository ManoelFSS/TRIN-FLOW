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
import { IoMdPerson } from "react-icons/io";
import { PiUserListFill , PiHandTapFill  } from "react-icons/pi";
import { FaAddressCard } from "react-icons/fa6";
import { BsCreditCard,  BsFillTelephonePlusFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { HiMiniStar } from "react-icons/hi2";

import { FaEdit, FaInfoCircle  } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// hooks
import useSelect from "../../../hooks/useSelect"

const Client = () => {
    
    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Nome", icon: <PiUserListFill  className="icon" /> },
        { name: "CPF | CNPJ", icon: <BsCreditCard className="icon" /> },
        { name: "RG | NIRE", icon: <FaAddressCard className="icon" /> },
        { name: "TEL", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Cidade", icon: <BiSolidCity className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}
        
    ]

    const databody = [
        { name: "João pereira da silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Joaquim alencar de souza", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Bloqueado" },
        { name: "Maria celina da silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Maicon oliveira de souza", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Bloqueado" },
        { name: "Pedro herrique da silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Paulo jose dos santos", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Ronaldo silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Roberto rodrigues da silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Roney da silva", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Ativo" },
        { name: "Ronaldo santos", cpf_cnpj: "123.456.789-00", rg_nire: "123.456.789-00", tel: "(11) 1234-5678", city: "Trindade-PE", status: "Bloqueado" },
    ]


    const data = [
        { category: "Ativo" },
        { category: "Masculino" },
        { category: "Feminino" },
        { category: "Bloqueados" },
    ];

    const img = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

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
                                <li>{item.cpf_cnpj}</li>
                                <li>{item.rg_nire}</li>
                                <li>{item.tel}</li>
                                <li>{item.city}</li>
                                <li><span style={{color: item.status === "Ativo" ? "green" : "red"}}>{item.status}</span></li>
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
