import styled from "styled-components";

export const Container_header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: width 0.3s ease;
    width: ${props => props.$toogleMenu ? "calc( 100% - 30vh )" : "calc( 100% - 6vh )" };
    min-height: 8vh;
    padding: 0 2vh;
    position: fixed;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: var( --color-bg-primary );

    @media (max-width: 550px) {
        .menu {
            display: none;
        }
    }

    .title {
        display: flex;
        align-items: center;
        gap: 1vh;
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
                font-size: 6vh;
            }
        }
    }
    

    .icon {
        color: var(--color-text-primary);
        font-size:6vh;
        cursor: pointer;
    }
`