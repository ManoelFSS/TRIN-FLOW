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

        @media (max-width: 570px) {
            width: 100%;
        }
    }

    .charts {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 10px;
        justify-content: center;
    }
    
`