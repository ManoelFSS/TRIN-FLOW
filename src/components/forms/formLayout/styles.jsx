import styled from "styled-components";

export const Container = styled.div`
    padding: 5vh ;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 1.5px 2px 8px rgba(0, 0, 0, 0.4);
    border-radius: 1vh;

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 2vh;
    }

    .box {
        display: flex;
        flex-direction: column;
        gap: 1vh;

        @media (orientation: landscape) {
            gap: 0.5rem;
        }
    }

    p {
        text-align: right;
        color: var(--color-text-primary);
        font-weight: 500;
        cursor: pointer;
        font-size: 2vh;
        padding-bottom: 1vw;
        trasition: color 0.3s ease;

        &:hover {
            color: var( --color-text-hover );
            text-decoration: underline;
        }

        @media (max-height: 580px) {
            font-size: 3vh;
            padding-bottom: 2vh;
        }

    }

    .btns {
        display: flex;
        flex-direction: column;
        gap: 2vh;

        @media (orientation: landscape) {
            gap: 1rem;
        }

    }

    @media (orientation: landscape) {
        padding: 3rem 2rem;
    }


`;