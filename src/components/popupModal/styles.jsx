import styled from "styled-components";

export const Container_popup = styled.div`
    text-align: center;

    .vehicle {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        
        .logo {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
        }

        h2 {
            text-align: center;
            color: #FF9D00;
        }
    }

    h4 {
        text-align: center;
        color: #000000;
    }

    .plate {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 5px;
    }

    .location {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;

        span {
            font-weight: bold;
            padding-top: 5px;
        }
    }
    
    .buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
        padding-top: 10px;
        
        button {
            
            padding: 1vh;
            background-color: var( --color-bg-btn-primary );
            border-radius: 4px;
            border: none;
            color: var( --color-text-secondary );
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 800;
            transition: background-color 0.3s ease; 
            position: relative;
        }
    }
    
    
`