import styled from "styled-components";

export const Text = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: var( --color-title-primary );
    border-bottom: solid 4px var( --color-bord-btn-primary );
    padding-bottom: 5px;

    @media (min-width: 1550px) {
        font-size: 3vh;
        padding-bottom: 1vh;
        border-bottom: solid 0.5vh var( --color-bord-btn-primary );
    }

`
