import styled from "styled-components";

export const Container_dashboard = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
    padding: 5px;

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 240px;
        gap: 10px;

        @media (max-width: 1320px) {
            width: 100%;
        }
    }

    .charts-container {
        width: 1000px;
        overflow: hidden;

        .charts {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            padding-bottom: 6px;
        }
        
        .chart-stock {
            flex: 1;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
            overflow: auto;
            padding-bottom: 10px;
        }
    }
    
`