import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;

    @media (max-width: 768px) {
        width: 700px;
    }

    .chart-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        gap: 20px;

        h3 {
            font-size: 1rem;
            font-weight: 900;
            color: #000;
            text-align: center;
        }

        .custom-legend {
            display: flex;
            gap: 15px;

            .legend-item {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 0.7rem;
            }

            .legend-color {
                width: 12px;
                height: 12px;
                margin-right: 6px;
                border-radius: 2px;
            }
        }
    }

    .chart-main {
        display: flex;
        height: 130px;
        justify-content: center;
        width: 100%;
        padding: 10px 10px 0px;
        border-top: solid 2px #ccc;
    }

`