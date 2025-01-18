import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    background-color: var(  --color-bg-btn-secondary );
    padding: 1vh;
    border-radius: 0.5vh;
    border: solid 0.2rem var( --color-bord-btn-primary );
    color: var( --color-text-primary );
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 2vh;
    font-weight: 600;

    &:hover {
        border: solid 0.2rem var( --color-bord-btn-hover );
    }

    @media screen and (max-height: 500px) {
        font-size: 6vh;
        padding: 4vh;
        border: solid 0.8vh var( --color-bord-btn-primary );
    }

    @media screen and (max-height: 270px) {
        font-size: 10vh;
        padding: 6vh;
    }


`