import styled from "styled-components";

export const Container_select = styled.div`
    cursor: pointer;
    position: relative;
    max-width: 180px;
    min-width: 250px;

    .select_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        width: 100%;
        height: 30px;
        background: #fff;
        padding: 0px 15px;
        border-radius: 4px;
        box-shadow: inset 1px 1px 4px #7979797c;
    }

    .select_header h3 {
        font-size: 0.9rem;
        color: #000;
    }

    .select_list {
        overflow: hidden;
        overflow-y:auto;
        transition: all 0.5s;
        position: absolute;
        min-width: 250px;
        max-height: 125px;
        top: 35px;
        left: 0px;
        background-color: #fff;
        box-shadow: 0px 1px 6px #7979797c;
        z-index: 99;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background:rgb(179, 179, 179);   
        }

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0px 14px;
            width: 100%;
            height: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            trasition: all 0.3s;
            border-top: solid 1px #7979797c;

            &:hover {
                background-color: #f2f2f2;
            }
        }
    }

    .icone_select {
        color: #000;
    }

`