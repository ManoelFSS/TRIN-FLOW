import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    trasition: width 0.3s ease;
    flex-direction: column;
    height: 100svh;
    
    .logo {
        display: flex;
        gap: 10px;
        flex-direction: column;
        position: ;
        width:190px;
        padding-left: 55px;
        padding-top: 10px;
        padding-bottom: 10px;

        @media (max-height: 530px) {
            // display: none;
        }

        img {
            height: 70px;
        }

        h3 {
            font-size: 0.7rem;
            font-weight: 700;
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
            width: 190px;
            align-items: center;
            cursor: pointer;
            font-size: 0.8rem;
            gap: 30px;
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
                padding: 5px;
                left: 4px;
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