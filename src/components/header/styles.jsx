import styled from "styled-components";

export const Container_header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: width 0.3s ease;
    width: ${props => props.$toogleMenu ? "calc(100% - 168px)" : "calc(100% - 40px)"};
    padding: 2px 10px;
    position: fixed;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: var( --color-bg-primary );
    right: 0;

    @media (max-height: 500px) {
        width: ${props => props.$toogleMenu ? "calc(100% - 168px)" : "calc(100% - 30px)"};
    }

    .title {
        display: flex;
        align-items: center;
        gap: 1vh;

        img {
            height: 30px;
        }

        h3 {
            font-size: 0.8rem;
            color: var(--color-text-primary);
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
                width: 30px;
            }

            button {
                font-size: 0.7rem;
                padding: 4px 10px;
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
    }


`