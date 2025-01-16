import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    background-color: var( --color-bg-input );
    padding: 1vh;
    margin-bottom: 2vh;
    border-radius: 0.5vh;
    border: none;
    color: var( --color-text-primary );
    box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    font-size: 2vh;
    font-weight: 500;
    outline: none;

    @media screen and (max-height: 580px) {
        font-size: 4vh;
        padding: 2vh;
    }

    @media screen and (max-height: 270px) {
        font-size: 10vh;
        padding: 6vh;
    }

    @media (orientation: landscape) {
        min-width: 200px;
    }


`