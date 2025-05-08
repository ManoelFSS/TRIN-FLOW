import styled from "styled-components";

export const ContainerTracking = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 10px;
    height: calc(100vh - 47px );
    overflow: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FF9D00;
        cursor: pointer;
    }


    @media (max-width: 650px) {
        flex-direction: column;
        gap: 6px;
    }

    .tricking-header {
        display: flex;
        gap: 15px;
        width: 100%;
        padding: 10px;
        background-color:rgb(255, 255, 255);
        box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.43);
    }

    .tracking-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap; ;
        gap: 10px;
        width: 100%;
        
        .tracking {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding-top: 15px;
            height: calc(100vh - 65px );
            background-color:rgb(255, 255, 255);
            box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.28);

            @media (max-width: 690px) {
                width: 100%;
                height: 34vh;
            }

            .search {
                width: 100%;
                display: flex;
                justify-content: center;                    
                padding: 0px 5px;
            }
        }
    }

`;

export const Map = styled.section`
    flex: 1;
    width: 100%;
    min-width: 230px;
    background-color:rgb(248, 248, 248);
    box-shadow:  1px 0px 5px rgba(0, 0, 0, 0.28);
    
    @media (max-width: 690px) {
        height: 47vh;
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

    @media (max-width: 690px) {
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
        border: solid 1px transparent;

        &:hover {
            border: solid 1px var( --color-bord-btn-primary );
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




export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 10px;
        // border:solid 2px red;
    
    .box-right {
        display: flex;
        flex-direction: column;
        
        p {
            font-size: 0.7rem;
            color: #000;
        }
    }
    
    .box-filter {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 15px;
        width: 100%;
        background-color: #fff;
        padding: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.28);
        border-radius: 4px;
        
        .box-icon {
            display: flex;
            margin-left: 10px;
            gap: 15px;
            
            .icon-square, .icon-list {
                cursor: pointer;
                font-size: 1.7rem;
                trasition: color 0.3s ease;
                box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.4);
                padding: 4px;
                border-radius: 4px;
                
                &:hover {
                    color: var( --color-icon-hover );
                    transform: scale(1.1);
                }
            }
            
            .ative-icon  {
                color: var( --color-icon-hover );
            }
        }
        
        
    }
`

export const ContainerTable = styled.section`
    margin-top: 10px;
    width: 100%;
    overflow: auto;
        // border:solid 3px blue;

    
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 1140px;
        height: calc(100vh - 130px);
            // border:solid 3px yellow;


        @media (max-width: 1065px) {
            height: calc(100vh - 170px);
        }

        @media (max-width: 605px) {
            height: calc(100vh - 213px);
        }

        @media (max-width: 433px) {
            height: calc(100vh - 258px);
        }

        @media (max-width: 309px) {
            height: calc(100vh - 299px);
        }
        
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 98.3%;
            border-radius: 6px;
            
            .header-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 100%;
                padding:  10px 0;
                
                li {
                    display: flex;
                    height: 40px;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    gap: 10px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    background-color: #FF9D00;
                    border-radius: 4px;
                    color: var( --color-text-secondary );
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                    
                    .icon  {
                        width: 18px;
                        height: 18px;
                    }
                }
                
                li:nth-child(1) {
                    width: 50px;
                    justify-content: center;
                }

                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 160px;
                }

                li:nth-child(4){
                    width: 150px;
                }

                li:nth-child(5), li:nth-child(6), li:nth-child(7), li:nth-child(8), li:nth-child(9) {
                    width: 120px;
                }
                
            }
        }

        .body {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            gap: 10px;
            list-style: none;
            width: 100%;
            padding: 10px;
            overflow: auto;
            height: calc(100vh - 192px);
            
            &::-webkit-scrollbar {
                width: 3px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(241, 241, 241, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #FF9D00;
            }

            .body-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 100%;
                background-color: #f2f2f2;     
                border-radius: 6px;    
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.22);
                padding: 5px 0px;

                &:nth-child(even) {
                    background-color:rgba(208, 205, 205, 0.95);
                }


                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 10px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    color: var( --color-text-primary );
                }
                
                li:nth-child(1) {
                    display: flex;
                    align-items: center;
                    width: 50px;
                    padding: 0;
                    
                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                }
                
                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 160px;
                }
                
                li:nth-child(4) {
                    width: 150px;
                }
                
                li:nth-child(5), li:nth-child(6), li:nth-child(7), li:nth-child(8), li:nth-child(9) {
                    width: 120px;
                }
                
                li:nth-child(8) {
                    
                    span {    
                        font-weight: 900;
                        font-size: 0.8rem;
                    }
                }
                
                .icons {
                    gap: 10px;
                    
                    .icon {
                        font-size: 1.5rem;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        
                        &:hover {
                            color: var( --color-icon-hover );
                        }
                    }
                }
            }
        }
    }

`
