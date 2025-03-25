import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    height: 35px;
    background-color: var(  --color-bg-btn-secondary );
    border-radius: 4px;
    border: solid 2px var( --color-bord-btn-primary );
    color: var( --color-text-primary );
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;

    &:hover {
        border: solid 2px var( --color-bord-btn-hover );
    }

    @media (min-width: 1550px) {
        font-size: 2vh;
        padding: 1vh;
        border: solid 0.4vh var( --color-bord-btn-primary );
    }
`