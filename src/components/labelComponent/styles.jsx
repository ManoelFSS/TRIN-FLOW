import styled from "styled-components"

export const Label = styled.label`
    color: var( --color-text-primary );
    font-size: 2vh;
    font-weight: 700;
    cursor: pointer;

    @media (max-height: 550px) {
        font-size: 4vh;
    }

    @media (orientation: landscape) and (max-width: 800px) {
        font-size: 1rem;
        padding-top: 0.3rem;
    }

`