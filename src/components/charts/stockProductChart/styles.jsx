import styled from "styled-components";

export const Container = styled.div`
    width: 990px;
    background-color: #fff;

    @media (max-width: 1070px) {
        width: 100%;
    }

    .chart-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        gap: 20px;
    }

    .chart-main {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 10px 10px 10px;
        border-top: solid 2px #ccc;
    }

`