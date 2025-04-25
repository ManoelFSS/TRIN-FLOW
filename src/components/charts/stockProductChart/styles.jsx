import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 1068px) {
        width: 990px;
    }

    .chart-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        gap: 10px;

        h3 {
            font-size: 1rem;
            font-weight: 900;
            color: #000;
            text-align: center;
        }

        .custom-legend {
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            gap: 3px;

            .legend-item {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 0.7rem;
                margin-right: 10px;
            }

            .legend-item:nth-child(2) {
                margin-left: 4px;
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
        height: 135px;
        justify-content: center;
        width: 100%;
        padding: 10px 10px 0px;
        border-top: solid 2px #ccc;

        @media (max-width: 1320px) {
            height: 200px;
        }
    }

`