import styled from "styled-components"; 

export const Button = styled.button`
    width: 100%;
    background-color: var( --color-bg-btn-primary );
    padding: 1vh;
    border-radius: 5px;
    border: none;
    color: var( --color-text-secondary );
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 2vh;
    font-weight: 800;
    transition: background-color 0.3s ease; 
    position: relative;

    span {
        position: absolute;
        color: var( --color-text-secondary );
        font-size: 12px;
        font-weight: 700;
        right: 10px;
        top: 5px;

        @media (min-width: 1550px) {
            font-size: 2vh;
        }
    }

    &:hover {
        background-color: var( --color-bg-btn-hover );
    }

    @media (min-width: 1550px) {
        font-size: 2.2vh;
        padding: 0.8vh;
        border-radius: 1.2vh;
        border: solid 0.4vh var( --color-bord-btn-primary );
    }

`