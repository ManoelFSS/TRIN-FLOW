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
    font-size: 2.2vh;
    font-weight: 900;
    transition: background-color 0.3s ease; 
    position: relative;

    span {
        position: absolute;
        color: var( --color-text-secondary );
        font-size: 2vh;
        font-weight: 700;
        width: 10vh;

        @media screen and (max-height: 500px) {
            font-size: 5vh;
            right: 5vh;
        }

        @media screen and (max-height: 270px) {
            font-size: 11vh;
            right: 25vh;
        }

    }

    &:hover {
        background-color: var( --color-bg-btn-hover );
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