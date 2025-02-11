import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: 100svh;
    width: 100%;
    background-color: #fff;
    position: relative;
    
    .sidebar {
        transition: width 0.3s ease;
        width: ${props => props.$toogleMenu ? "35vh" : "6vh"};
        height: 100svh;
        background-color: var( --color-secondary );
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 99;
        overflow: hidden;

        @media (max-width: 550px) {
            width: 6vh;
        }

        .bar {
            position: absolute;
            top: 0;
            left: 0;
            background-color: var( --color-primary );
            width: 6vh;
            height: 100svh;
            z-index: -1;
        }
    }

    .content {
        width: 100%;
        
        .main {
            height: calc( 100svh );
            padding: 10px;
            background-color: var( --color-bg-secondary );
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
            width: ${props => props.$toogleMenu ? "calc( 100% - 30vh )" : "calc( 100% - 6vh )" };
        }
    }
    
`;