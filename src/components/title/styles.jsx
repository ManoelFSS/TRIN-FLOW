import styled from "styled-components";

export const Text = styled.h3`
    font-size: 2.5vh;
    font-weight: 700;
    color: var( --color-title-primary );
    padding-bottom: 0.6vh;
    border-bottom: solid 0.5vh var( --color-bord-btn-primary );

    @media (max-height: 550px) {
        font-size: 6vh;
    }

    @media (orientation: landscape) and (max-width: 800px) {
        font-size: 1.5rem;
    }
`