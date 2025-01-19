import styled from "styled-components"; 

export const Button = styled.button`
    width: 100%;
    background-color: var( --color-bg-btn-primary );
    padding: 6px;
    border-radius: 5px;
    border: none;
    color: var( --color-text-secondary );
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 16px;
    font-weight: 900;
    transition: background-color 0.3s ease; 
    position: relative;

    span {
        position: absolute;
        color: var( --color-text-secondary );
        font-size: 15px;
        font-weight: 700;
        right: 10px;

        @media (min-width: 1550px) {
            font-size: 2vh;
        }
    }

    &:hover {
        background-color: var( --color-bg-btn-hover );
    }

    @media (min-width: 1550px) {
        font-size: 2vh;
        padding: 1vh;
        border: solid 0.4vh var( --color-bord-btn-primary );
    }

`