import styled from "styled-components";

export const Container_dashboard = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
    padding: 15px 10px 50px 10px;
    cursor: pointer;

    .cards {
        display: flex;
        flex-wrap: wrap;
        width: 250px;
        gap: 10px;
        justify-content: center;

        @media screen and (orientation: landscape) and (max-width: 680px) {
            width: 100%;
        }

        @media (max-width: 570px) {
            width: 100%;
        }
    }

    .charts {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        border:solid 1px red;
    }
    
`