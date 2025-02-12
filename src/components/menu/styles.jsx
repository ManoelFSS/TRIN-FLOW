import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    trasition: width 0.3s ease;
    flex-direction: column;
    min-height: 100svh;
    padding-top: 100px;

    @media (max-height: 530px) {
        padding-top: 35px;
    }
    
    .logo {
        display: flex;
        flex-direction: column;
        position: absolute;
        width:165px;
        top: 1vh;
        padding-left: 34px;

        @media (max-height: 530px) {
            display: none;
        }

        img {
            height: 70px;
        }

        h3 {
            font-size: 0.7rem;
            color: var( --color-text-secondary );
            text-align: center;
        }
    }

    ul {
        trasition: width 0.3s ease;
        list-style: none;
        display: flex;
        width: 170px;
        max-width: 170px;
        flex-direction: column;

        li {
            display: flex;
            width: 100%;
            align-items: center;
            cursor: pointer;
            font-size: 0.8rem;
            gap: 16px;
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
                width: 40px;
                height: 40px;
                color: var( --color-icon-primary );
                position: relative;
                padding: 6px;

                @media (max-height: 530px) {
                    width: 25px;
                    height: 25px;
                    padding: 4px;
                    position: relative;
                    left: 3px;
                }
            }
        }

        .active {
            background-color: var( --color-text-hover);
            color: var(  --color-text-secondary);
            
            .icon {
                color: var( --color-icon-hover );
            }
        }
        
    }

`