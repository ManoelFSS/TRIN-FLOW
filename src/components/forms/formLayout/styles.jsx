import styled from "styled-components";

export const Container = styled.div`
    width: 45vh;
    padding: 3vh 5vh 5vh 5vh ;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 1.5px 2px 8px rgba(0, 0, 0, 0.4);
    border-radius: 1vh;
    position: relative;

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

        @media (orientation: landscape) and (max-width: 950px) {
            gap: 0.5rem;
            margin-bottom: 3vh;
            
        }
    }

    p {
        width: 100%;
        text-align: center;
        color: var(--color-text-primary);
        font-weight: 600;
        cursor: pointer;
        font-size: 1.8vh;
        padding: 0 0 1.6vh 0;
        trasition: color 0.3s ease;
        boder: solid 0.2rem var( --color-bord-btn-primary );

        &:hover {
            color: var( --color-text-hover );
            text-decoration: underline;
        }

        @media (max-height: 580px) {
            font-size: 2vh;
            padding-bottom: 2vh;
        }

        @media (orientation: landscape) {
            font-size: 0.8rem;
        }

    }

    .btns {
        display: flex;
        flex-direction: column;
        gap: 2vh;

        @media (orientation: landscape) and (max-width: 950px) {
            gap: 1rem;
            padding-top: 3vh;
        }

        @media screen and (max-height: 270px) {
            padding-top: 10vh;
        }

    }


    @media (min-width: 1600px) {
        min-width: 42vh;
        
    }


    @media (orientation: landscape) and (max-width: 1000px) {
        width: 60vw;
        padding: 8vh;
    }

    @media (orientation: landscape) and (max-width: 950px) {
        padding: 3rem 2rem;
        
    }

    @media screen and (max-width: 440px) {
        width: 100%;
    }
        
    @media screen and (max-height: 270px) {
        min-width: 60vh;
    }

`;