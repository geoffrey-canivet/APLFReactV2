import React from "react";
import styled, { keyframes } from "styled-components";
// Importez votre icône en SVG
import Icon from "../assets/react.svg";

// Animation pour faire apparaître progressivement le contenu
const fadeIn = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

// Animation pour faire flotter l'icône de haut en bas
const floatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`;

// Animation pour agrandir et rétrécir la hauteur des barres
const grow = keyframes`
  0% { 
    transform: scaleY(1); 
  }
  100% { 
    transform: scaleY(1.5); 
  }
`;

// Conteneur principal
const Container = styled.div`
  background-color: #0d0d0d;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Conteneur de l'icône et du titre
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 2s ease forwards;
`;

// Icône stylisée
const StyledIcon = styled.img`
  width: 80px;
  height: 80px;
  animation: ${floatAnimation} 2s ease-in-out infinite;
`;

// Titre
const Title = styled.h2`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 600;
`;

// Conteneur pour le "mini-chart"
const ChartContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
`;

// Barres animées
const Bar = styled.div`
  width: 20px;
  background-color: #00ffcc;
  animation: ${grow} 2s infinite alternate;
  border-radius: 4px;
  transform-origin: bottom; 
`;

// Variantes de barres avec hauteurs différentes et décalage dans l’animation
const Bar1 = styled(Bar)`
  height: 50px;
  animation-delay: 0.2s;
`;

const Bar2 = styled(Bar)`
  height: 80px;
  animation-delay: 0.4s;
`;

const Bar3 = styled(Bar)`
  height: 30px;
  animation-delay: 0.6s;
`;

const Bar4 = styled(Bar)`
  height: 60px;
  animation-delay: 0.8s;
`;

// Composant principal
const FinancialAnimation = () => {
    return (
        <Container>
            <IconContainer>
                <StyledIcon src={Icon} alt="Finance Icon" />
                <Title>Gestion Financière</Title>
            </IconContainer>
            <ChartContainer>
                <Bar1 />
                <Bar2 />
                <Bar3 />
                <Bar4 />
            </ChartContainer>
        </Container>
    );
};

export default FinancialAnimation;
