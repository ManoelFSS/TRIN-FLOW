import styled from "styled-components";

export const Container_messege = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.66);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .messege-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        gap: 15px;
        min-width: 290px;
        max-width: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        padding: 20px 20px;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
        background-color: var(  --color-bg-secondary );

        h3 {
            font-size: 0.9rem;
            text-transform: uppercase;
        }

        p {
            font-size: 0.8rem;
            font-weight: 500;
            color: #FF0000;
            text-align: center;
        }
    }

    button {
        width: 50%;
    }
    
`