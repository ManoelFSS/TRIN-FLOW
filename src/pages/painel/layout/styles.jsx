import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: 100svh;
    width: 100%;
    background-color: #fff;
    
    .sidebar {
        transition: width 0.3s ease;
        width: ${props => props.$toogleMenu ? "180px" : "50px" };
        height: 100svh;        
        background-color: var( --color-secondary );
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
        z-index: 99;
        position: absolute;
        overflow: hidden;
        overflow-y: auto;

        .bar {
            width: 50px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100svh;
            background-color: var( --color-primary );
            z-index: -1;
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
        }

        footer {
            transition: width 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var( --color-bg-primary );
            color: var( --color-text-primary );
            font-weight: 700;
            font-size: 0.6rem;
            text-align: center;
            padding: 5px 10px;
            position: fixed;
            bottom: 0;
            right: 0;
            width: ${props => props.$toogleMenu ? "calc( 100% - 180px )" : "calc( 100% - 50px )" };
        }
    }
    
`;