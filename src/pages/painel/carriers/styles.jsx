import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 10px;
    
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
        width: 98%;
        background-color: #fff;
        padding: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
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
    height: calc(100vh - 130px);
    overflow: auto;
    
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 1040px;
        height: calc(100vh - 130px);
        
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 98.5%;
            border-radius: 6px;
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
            background-color: #302F2F;
            
            .header-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 100%;
                padding:  10px;
                
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
                    background-color:rgb(0, 0, 0);
                    border-radius: 4px;
                    color: var( --color-text-secondary );
                    
                    
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
                padding: 5px 10px;

                &:nth-child(even) {
                    background-color:rgba(208, 205, 205, 0.95);
                }


                li {
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    color: var( --color-text-primary );
                }
                
                li:nth-child(1) {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    padding: 0;
                    
                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
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
                
                li:nth-child(7) {
                    justify-content: center;
                    
                    span {    
                        font-weight: 900;
                        font-size: 0.8rem;
                    }
                }
                
                .icons {
                    justify-content: center;
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
