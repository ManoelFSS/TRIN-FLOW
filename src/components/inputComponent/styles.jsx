import styled from "styled-components";

export const Input = styled.input`
    height: 35px;
    background-color: var( --color-bg-input );
    padding-left: 10px;
    border-radius: 5px;
    border: none;
    color: var( --color-text-primary );
    box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    outline: none;
    trasition: background-color 0.3s ease;

    &:hover {
        background-color: var( --color-bg-input-hover );
    }

    @media (min-width: 1920px) {
        font-size: 2vh;
        padding: 1vh;
        height: 5vh;
    }
    
`