import styled from "styled-components";

export const Container_search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 260px;
    height: 30px;
    padding-right:10px;
    background: #fff;
    box-shadow: inset 1px 1px 4px #7979797c;
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: 610px) {
        min-width: 120px;
    }


    input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        cursor: pointer;
        padding: 0 10px;
        color: #000;
        box-shadow: inset 1px 1px 4px #7979797c;
    }

    input::placeholder {
        color: #000;
    }

    .icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: #000;
    }
`