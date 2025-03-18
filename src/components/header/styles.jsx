import styled from "styled-components";

export const Container_header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: width 0.3s ease;
    width: ${props => props.$toogleMenu ? "calc(100% - 180px)" : "calc(100% - 50px)"};
    height: 45px;
    padding: 0 10px;
    position: fixed;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: var( --color-bg-primary );
    right: 0;

    @media (min-width:  1910px) {
        height: 5vh;
        padding: 0 1vh;
    }


    .title {
        display: flex;
        align-items: center;
        gap: 1vh;

        img {
            height: 40px;

            @media (min-width: 1910px) {
                height: 4vh;
            }
        }

        h3 {
            font-size: 1rem;
            color: var(--color-text-primary);

            @media (min-width:  1910px) {
                font-size: 2vh;
            }
        }
    }

    .box_right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        .exit {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;

            .icon {
                color: var(--color-text-primary);
                height: 20px;
                width: 20px;
            }

            button {          
                padding: 4px 10px;
                border-radius: 4px;
                font-size: 0.8rem;

                @media (min-width: 1910px) {
                    font-size: 1.5vh;
                }
            }
            
        }
    }
    

    .menu {
        color: var(--color-text-primary);
        width: 30px;
        height: 30px;
        cursor: pointer;
        
        @media (max-width: 600px){
            display: none;
        }

        @media (min-width: 1910px) {
            width: 4vh;
            height: 4vh;
        }
    }


`