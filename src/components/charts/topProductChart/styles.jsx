import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    width: 200px;
    height: 440px;
    padding: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 480px) {
        width: 180px;
    }

    @media (max-width: 440px) {
        width: 230px;
    }

    .chart-header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: var( --color-bg-secondary-element);
        border-radius: 8px 8px 0px 0px;

        h3 {
            font-size: 0.9rem;
            font-weight: 700;
            color: var( --color-text-secondary );

            @media (max-width: 481px) {
                font-size: 0.7rem;
            }
        }

        p {
            font-size: 0.7rem;
            font-weight: 400;
            color: var( --color-text-secondary );
        }

        .icon {
            color: var( --color-icon-secondary );
            font-size: 1.6rem;
        }
    }

    .chart-main {
        padding: 10px 0px;
    }

    .chart-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px 0px 8px 8px;
        cursor: pointer;
        padding: 5px 0px;
        background-color: var( --color-bg-secondary-element);
        color: var( --color-text-secondary );
        font-weight: 900;
        font-size: 0.9rem;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #000;
        }
    }
`;
