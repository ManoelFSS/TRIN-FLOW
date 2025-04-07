import styled from "styled-components";

export const Container_bar_x = styled.div`
    
    h3 {
        font-size: 0.7rem;
        font-weight: 700;
        color: var( --color-text-primary );
    }

    .bar-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 0px;

        .bar {
            width: 100px;
            height: 10px;
            background-color: var( --color-bg-secondary-element);
            border-radius: 5px;
            margin-right: 10px;

            .bar-fill {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                background-color: #f2f2f2;
                transition: width 0.3s  ease;
                box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
                position: relative;

                .bar-fill-active {
                    max-width: 120px;
                    height: 100%;
                    border-radius: 5px;
                    background-color: var(  --color-primary );
                    transition: width 0.3s  ease;
                    position: absolute;
                    z-index: 2;
                    cursor: pointer;
                }
                
            }
        }

        p {
            font-size: 0.8rem;
            font-weight: 900;
            color: var( --color-text-primary );
        }
    }

`