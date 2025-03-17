import { css, styled } from 'styled-components'; // Use `css` from styled-components
import { labelPosition } from '../Input';

interface StyledSelectContainerProps {
  labelPosition?: labelPosition;
  margin?: string;
}

export const SelectContainer = styled.div<StyledSelectContainerProps>`
  width: 100%;
  margin: ${props => props.margin || "0.8rem"}; // Simplified margin logic

  label {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.primary};
  }

  ${props =>
    props.labelPosition &&
    css`
      display: flex;
      flex-direction: ${props.labelPosition === 'left' ? 'row' : 'column'};
      gap: 0.35rem;
    `}

  select {
    height: 3rem;
    border: 1px solid #8e9399;
    border-radius: 8px;
    padding-left: 0.5rem;
    color: ${({ theme }) => theme.colors.primary}; 
  }
`;