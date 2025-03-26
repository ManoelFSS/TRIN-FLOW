import styled from "styled-components";

export const Container = styled.div`
    min-width: 320px;
    padding: 20px 20px 30px 20px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.6);
    border-radius: 6px;
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

        @media (min-width: 1920px) {
            gap: 0.5vh;
            padding: 0.4vh 0;
        }
    }

    .box-check {
        display: flex;
        align-items: center;

        input {
            min-width: 20px;
            min-height: 20px;
            border: none;
            box-shadow: none;

            @media (min-width: 1920px) {
                width: 4vh;
                height: 4vh;
            }
        }

        .text-check {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            justify-content: center;
            padding: 20px 4px 8px;
            
            span {
                width: 230px;
                font-weight: 800;
                font-size: 0.9rem;
                text-align: center;
                
                @media (min-width: 1920px) {
                    font-size: 2vh;
                    width: 100%;
                }
            }
        }

    }

    p {
        text-align: right;
        color: var(--color-text-primary);
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
        trasition: color 0.3s ease;
        boder: solid 2px var( --color-bord-btn-primary );
        padding: 5px 0 0;

        &:hover {
            color: var( --color-text-hover );
            text-decoration: underline;
        }

        @media (min-width: 1920px) {
            font-size: 1.8vh;
            padding: 1vh 0 0;
        }
    }

    .text {
        width: 280px;
        text-align: center;
        font-size: 1rem;
        font-weight: 700;

        &:hover {
            text-decoration:none;
            cursor: default;
            color: var( --color-text-primary );
        }

        @media (min-width: 1920px) {
            font-size: 1.8vh;
            width: 100%;
        }
    }

    .btns {
        display: flex;
        flex-direction: column;
        padding-top: 1.5vh;
        gap: 10px;

        @media (min-width: 1920px) {
            gap: 1.8vh;
        }
    }

    @media (min-width: 500px) and (max-width: 768px) {
        width: 250px;
    }

    @media (min-width: 1920px) {
        width: 40vh;
        padding: 4vh 3vh 5vh 3vh;
    }

`;