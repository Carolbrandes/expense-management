import styled, { keyframes } from 'styled-components';

// Utility function to convert hex to rgba with transparency
const hexToRgba = (hex: string, alpha: number): string => {
  // Remove the '#' if it exists
  const hexColor = hex.replace('#', '');

  // Parse the hex color into RGB components
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);


  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

interface SpinnerProps {
  color?: string
}

export const Spinner = styled.div<SpinnerProps>`
  border: 4px solid ${({ color }) => color ? hexToRgba(color, 0.1) : 'rgba(0, 0, 0, 0.1)'};
  border-top: 4px solid ${({ color, theme }) => color || theme.colors.primary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: ${spin} 1s linear infinite;
`;