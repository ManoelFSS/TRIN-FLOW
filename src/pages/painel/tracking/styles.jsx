import styled from "styled-components";

export const ContainerTracking = styled.section`
    display: flex;
    width: 100%;
    height: calc(100vh - 47px );


    @media (max-width: 650px) {
        flex-direction: column;
        gap: 6px;
    }

    .tracking-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding-top: 10px;
        height: calc(100vh - 45px );
        background-color:rgb(255, 255, 255);

        @media (max-width: 650px) {
            height: 40vh;
        }

        .search {
            width: 100%;
            display: flex;
            justify-content: center;                    
            padding: 0px 5px;
        }
    }
`;

export const Map = styled.section`
    padding: 10px;
    width: 100%;
    height: calc(100vh - 47px );
    background-color:rgb(248, 248, 248);
    box-shadow: inset 1px 0px 5px rgba(0, 0, 0, 0.16);
    
    @media (max-width: 650px) {
        height: 250vh;
    }

`;

export const MenuTracking = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    max-width: 300px;
    overflow: auto;
    padding: 10px;
    background-color:rgb(255, 255, 255);
    gap: 10px;

    @media (max-width: 650px) {
        min-width: 100%;
    }

    &::-webkit-scrollbar {
        width: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FF9D00;
    }

    .card-tracking {
        display: flex;
        width: 100%;
        height: 100px;
        border-radius: 4px;
        background-color:rgba(0, 0, 0, 0.05);
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.34);
        padding: 5px;
        gap: 5px;
        cursor: pointer;
        transform: scale(0.9);
        trasition: transform 0.3s ease;

        &:hover {
            transform: scale(1);
        }

        &:nth-child(even) {
            background-color:rgba(0, 0, 0, 0.09);
        }

        .photo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 70px;
            border-radius: 4px;

            img {
                width: 60px;
                height: 60px;
                border-radius: 4px;
            }
        }

        .info-cantainer{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 8px;
        }

        .box-info {
            display: flex;
            align-items: center;
            gap: 6px;

            h4 {
                font-size: 0.8rem;
                font-weight: 700;
                width: 50px;
            }
            p {
                font-size: 0.7rem;
                font-weight: 500;
            }
        }

        .box-info-address {
            h4 {
                font-size: 0.7rem;
                font-weight: 700;
                padding-bottom: 5px;
            }
            p {
                font-size: 0.6rem;
                font-weight: 500;
            }
        }
    }

`;