import { styled } from 'styled-components';

interface ButtonContainerProps {
  widthButton?: string
  fontSize?: string
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: ${props => props.widthButton ? props.widthButton : 'fit-content'};
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondaryText};
    border: none;
    border-radius: 8px;
    font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
`;
