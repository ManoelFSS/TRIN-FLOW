import styled from "styled-components";

export const Container = styled.div`
    width: 260px;
    padding: 20px 20px 30px 20px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1.5px 2px 8px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    position: relative;
    margin: auto;
    
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
    }

    .box {
        display: flex;
        flex-direction: column;
        padding: 2px 0;

        @media (min-width: 1550px) {
            gap: 0.5vh;
            padding: 0.4vh 0;
        }
    }

    p {
        text-align: right;
        color: var(--color-text-primary);
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        trasition: color 0.3s ease;
        boder: solid 2px var( --color-bord-btn-primary );
        padding: 5px 0 0;

        &:hover {
            color: var( --color-text-hover );
            text-decoration: underline;
        }

        @media (min-width: 1550px) {
            font-size: 1.8vh;
            padding: 1vh 0 0;
        }
    }

    .text {
        text-align: center;
        font-size: 12px;
        &:hover {
            text-decoration:none;
            cursor: default;
            color: var( --color-text-primary );
        }
    }

    .btns {
        display: flex;
        flex-direction: column;
        padding-top: 1.5vh;
        gap: 10px;

        @media (min-width: 1550px) {
            gap: 1.8vh;
        }
    }

    @media (min-width: 500px) and (max-width: 768px) {
        width: 240px;
    }

    @media (min-width: 1550px) {
        width: 40vh;
        padding: 4vh 3vh 5vh 3vh;
    }

`;