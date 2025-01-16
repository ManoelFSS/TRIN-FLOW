import styled from "styled-components";

export const Text = styled.h3`
    font-size: 3vh;
    font-weight: 900;
    color: var( --color-title-primary );

    @media (max-height: 550px) {
        font-size: 5vh;
    }

    @media (orientation: landscape) {
        font-size: 1.3rem;
    }
`