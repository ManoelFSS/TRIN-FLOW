import styled from "styled-components";

export const Input = styled.input`
    height: 35px;
    width: 100%;
    background-color: var( --color-bg-input );
    padding-left: 15px;
    border-radius: 5px;
    border: none;
    color: var( --color-text-primary );
    box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.47);
    cursor: pointer;
    font-size: 1rem;
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
export const Container = styled.div`
    width: 100%;
    position: relative;

    .icon {
        position: absolute;
        top: 9px;
        right: 10px;
        cursor: pointer;
        trasition: color 0.3s ease;
        font-size: 1.2rem;

        @media (min-width: 1920px) {
            top: 1.4vh;
            right: 1.4vh;
            font-size: 2.5vh;
        }

        &:hover {
            color: var( --color-icon-hover );
        }
    }
`