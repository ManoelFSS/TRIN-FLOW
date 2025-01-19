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
        height: 100svh;
        min-width: 280px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
        overflow: hidden;
        
        .box-container {
            width: 100%;
            margin: auto;
            
            h1 {
                font-size: 22px;
                font-weight: 900;
                color: var( --color-title-primary );
            }
            
            p {
                font-size: 16px;
            }
            
            .icons {
                display: flex;
                justify-content: center;
                gap:10px ;
                font-size: 30px;
                padding: 10px 0px;
                
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
                
            }
        }
        
        .copyright {   
            font-size: 14px;
            font-weight: 600;
            z-index: 2;
            padding: 5px;
            width: 100%;
            background-color: var( --color-bg-secondary )
        }
    }
    
    .box-right {
        width: 100%;
        height: 100svh;
        background:  #000 url(${graficPhoto}) no-repeat right center / 100% 100%;

        .box-blu {
            flex: 1;
            display: flex;
            width: 100%;
            height: 100svh;
            background-color: rgba(0, 0, 0, 0.6);
            overflow: auto;
            padding: 15px 0;
        }
    }
    
    @media (max-width: 560px) {
        flex-direction: column;
    }

    @media (max-width: 321px) {
        
        .box-left {
            height: 48vh;
            min-width: 100%;
            align-items: flex-end;
        }

        .box-right {
            max-height: 52vh;

            .box-blu {
                max-height: 52vh;
            }
        }
    }

    @media (min-width: 321px) and (max-width: 560px) {
        
        .box-left {
            height: 30vh;
            min-width: 100%;
        }

        .box-right {
            max-height: 70vh;

            .box-blu {
                max-height: 70vh;
            }
        }
    }

`;
