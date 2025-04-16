import styled from "styled-components";

export const Container_dashboard = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
    padding: 15px 10px 50px 10px;

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 240px;
        gap: 10px;

        @media (max-width: 1310px) {
            width: 100%;
        }
    }

    .charts-container {
        width: 1000px;
        gap: 10px;
        overflow: hidden;

        .charts {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        
        .chart-stock {
            flex: 1;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
            overflow: auto;
        }
    }
    
`