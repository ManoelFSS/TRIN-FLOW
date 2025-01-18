import styled, { keyframes } from 'styled-components';

// Animação de aparecimento e desaparecimento (fade-in e fade-out)
const fade = keyframes`
    0%, 100% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
`;

// Container para alinhar as bolinhas em linha
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Espaçamento entre as bolinhas */
    width: 100%;
    position: absolute;
    bottom: 1.5vh;
    left: 0;
    right: 0;

    @media screen and (max-height: 500px) {
        bottom: 5vh;
    }

    @media screen and (max-height: 270px) {
        bottom: 10vh;
    }
`;

// Estilos das bolinhas com a animação de fade-in/fade-out
export const Dot = styled.div`
    width: 2vh;
    height: 2vh;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    animation: ${fade} 1.4s linear infinite;
    animation-delay: ${(props) => props.$delay}; 

    @media screen and (max-height: 500px) {
        width: 5vh;
        height: 5vh;
    }

    @media screen and (max-height: 270px) {
        width: 10vh;
        height: 10vh;
    }
`;
