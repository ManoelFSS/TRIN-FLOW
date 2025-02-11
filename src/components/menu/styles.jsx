import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100svh;
    padding-top: 25vh;
    position: absolute;

    .logo {
        position: absolute;
        top: 2vh;
        right: 2.1vh;

        h3 {
            font-size: 2.5vh;
            color: var( --color-text-secondary );
            text-align: center;
        }
    }

    ul {
        list-style: none;
        display: flex;
        width: 30vh;
        flex-direction: column;

        li {
            display: flex;
            width: 100%;
            align-items: center;
            cursor: pointer;
            font-size: 2.2vh;
            gap: 2vh;
            padding: 0.8vh 0;
            transition: color 0.3s ease;
            color: var( --color-text-secondary );

            &:hover {
                background-color: var( --color-text-hover);
            }

            &:hover .icon {
                color: var( --color-icon-hover );
            }
                
            .icon {
                cursor: pointer;
                width: 6vh;
                height: 5vh;
                color: var( --color-icon-primary );
                padding: 0 0.8vh 0 0.8vh;
            }
        }
    }

`