import { css, styled } from 'styled-components';


interface StyledDateInputContainerProps {
  labelPosition?: labelPosition;
  margin?: string;
}

export const DateInputContainer = styled.div<StyledDateInputContainerProps>`
  width: 100%;
  margin: ${props => props.margin ? props.margin : "0.8rem"};

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

  input[type='date'] {
    width: 100%;
    height: 3rem;
    border: 1px solid #8e9399;
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primary};
    padding-left: 0.5rem;
    font-family: 'Arial', sans-serif;
  }
`;