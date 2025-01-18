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
    trasition: background-color 0.3s ease;

    &:hover {
        background-color: var( --color-bg-input-hover );
    }
        
    @media screen and (max-height: 500px) {
        font-size: 6vh;
        padding: 4vh;
    }

    @media screen and (max-height: 270px) {
        font-size: 10vh;
        padding: 6vh;
    }


`