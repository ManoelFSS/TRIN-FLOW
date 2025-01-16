import styled from "styled-components"; 

export const Button = styled.button`
    width: 100%;
    background-color: var( --color-bg-btn-primary );
    padding: 1vh;
    border-radius: 0.5vh;
    border: none;
    color: var( --color-text-secondary );
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 2vh;
    font-weight: 900;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var( --color-bg-btn-hover );
    }

    @media screen and (max-height: 500px) {
        font-size: 4vh;
        padding: 2vh;
    }

    @media screen and (max-height: 270px) {
        font-size: 10vh;
        padding: 6vh;
    }

`