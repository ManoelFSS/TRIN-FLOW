import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
    overflow: hidden;

    .card-header {
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 40px;
        padding: 0 15px;

        @media (max-width: 570px) {
            justify-content: space-between;
        }
        

        h3 {
            font-size: 1rem;
            font-weight: 900;
            color: var(  --color-text-primary );
        }

        .icon {
            height: 60px;
            width: 60px;
        }

        .rotate-icon {
            transform: rotate(180deg);
        }
    }

    p {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: var( --color-text-secondary );
        
    }

`