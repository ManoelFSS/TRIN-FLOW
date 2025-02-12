import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: 100svh;
    width: 100%;
    background-color: #fff;
    
    .sidebar {
        transition: width 0.3s ease;
        width: ${props => props.$toogleMenu ? "170px" : "40px" };
        height: 100svh;        
        background-color: var( --color-secondary );
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
        z-index: 99;
        position: absolute;
        overflow: hidden;

        @media (max-height: 500px) {
            width: ${props => props.$toogleMenu ? "170px" : "30px" };
            // height: 140svh;
        }

        .bar {
            min-width: 40px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100svh;
            background-color: var( --color-primary );
            z-index: -1;

            @media (max-height: 530px) {
                padding-top: 100px;
                min-width: 30px;
            }
        }
    }

    .content {
        width: 100%;
        
        .main {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: padding 0.3s ease;
            height: 100svh ;
            width: 100%;
            background-color: var( --color-bg-secondary );
            overflow: auto;
            padding: ${props => props.$toogleMenu ? "10px 10px 10px 190px" : "10px 10px 10px 50px" };

            @media (max-height: 530px) {
                min-height: 100svh;  /////////  aqui e o container que vai receber as rotas | pages  //////////
            }
        }

        footer {
            transition: width 0.3s ease;
            display: flex;
            height: 3.5vh;
            justify-content: center;
            align-items: center;
            background-color: var( --color-bg-primary );
            color: var( --color-text-primary );
            font-weight: 700;
            font-size: 2vh;
            position: fixed;
            bottom: 0;
            right: 0;
            width: ${props => props.$toogleMenu ? "calc( 100% - 150px )" : "calc( 100% - 40px )" };

            @media (max-height: 500px) {
                width: ${props => props.$toogleMenu ? "calc( 100% - 150px )" : "calc( 100% - 30px )" };
            }
        }
    }
    
`;