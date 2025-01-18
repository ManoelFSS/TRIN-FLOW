import styled from "styled-components";
// images
import graficPhoto from "../../assets/photo-grafico3d.jpg"

export const Container_login = styled.section`
    display: flex;
    min-height: 100svh;
    width: 100%;
    background-color: #fff;
    position: relative;
    
    .box-left {
        max-width: 40vh;
        min-width: 280px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 3vh;
        text-align: center;
        
        .box-container {
            
            padding-bottom: 1.5rem;
            
            h1 {
                font-size: 3.2vh;
                font-weight: 900;
                color: var( --color-title-primary );

                @media (max-height: 580px) {
                    font-size: 5vh;
                }

                @media (orientation: landscape) {
                    font-size: 1.3rem;
                }

                @media (orientation: landscape) and (min-width: 1300px) {
                    font-size: 4vh;
                }
            
            }
            
            p {
                font-size: 2vh;

                @media (max-height: 580px) {
                    font-size: 3vh;
                }

                @media (orientation: landscape) {
                    font-size: 1rem;
                    padding: 0.2rem 0;
                }

                @media (orientation: landscape) and (min-width: 1300px) {
                    font-size: 2vh;
                }
            }
            
            .icons {
                display: flex;
                justify-content: center;
                gap: 2vh;
                font-size: 4vh;
                padding: 1.5vh;
                
                .whatsapp,
                .facebook,
                .instagram {
                    cursor: pointer;
                    transition: all 0.3s;
                    
                    &:hover {
                        transform: scale(1.1);
                    }
                }
                
                .whatsapp {
                    color: #25d366;
                }
                
                .facebook {
                    color: #4267b2;
                }
                
                .instagram {
                    color: #e1306c;
                }

                @media (max-height: 580px) {
                    font-size: 6vh;
                }

                @media (orientation: landscape) {
                    font-size: 2rem;
                    gap: 1rem;
                    padding: 1rem;
                }

                @media (orientation: landscape) and (min-width: 1300px) {
                    font-size: 5vh;
                }
            }
        }
        
        .copyright {
            position: absolute;
            bottom: 0;
            font-size: 2vh;
            font-weight: 600;
            z-index: 2;
            padding: 0.5vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var( --color-bg-secondary );

            @media (max-height: 580px) {
                font-size: 3vh;
            }

            @media (orientation: landscape) {
                font-size: 0.8rem;
            }
        }

        @media (max-height: 580px) {
            min-height: 50vh;
        }

        @media (max-width: 550px) {
            height: 40vh;
        }

        @media (orientation: landscape) {
            height: auto;
            min-width: 12rem;
        }

    }
    
    .box-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2vh;
        overflow: hidden;
        gap: 2vh;
        background:  #000 url(${graficPhoto}) no-repeat right center / 100% 100%;

        @media (orientation: landscape) {
            padding: 1rem;
        }
    }
    
    @media (max-width: 900px) {
        flex-direction: column;
        
        .box-left {
            min-width: 100%;
            padding-top: 1rem;
        }
    }
    
`;
