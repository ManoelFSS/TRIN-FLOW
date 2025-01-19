import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    background-color: var(  --color-bg-btn-secondary );
    padding: 6px;
    border-radius: 5px;
    border: solid 2px var( --color-bord-btn-primary );
    color: var( --color-text-primary );
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;

    &:hover {
        border: solid 2px var( --color-bord-btn-hover );
    }

    @media (min-width: 1550px) {
        font-size: 2vh;
        padding: 1vh;
        border: solid 0.4vh var( --color-bord-btn-primary );
    }
`