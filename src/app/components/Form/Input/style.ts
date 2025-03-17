import { css, styled } from "styled-components";


interface StyledInputContainerProps {
  labelPosition?: labelPosition
  margin?: string
}

export const StyledInputContainer = styled.div<StyledInputContainerProps>`
  width: 100%;
  margin: ${props => props.margin ? props.margin : "0.8rem"};

  label{
    text-transform: capitalize;
    color:  ${({ theme }) => theme.colors.primary};
  }

   ${props => {
    return props.labelPosition && css`
          display: flex;
          flex-direction: ${props.labelPosition === 'left' ? 'row' : 'column'};
          gap: 0.35rem;
                        `
  }
  }
`

interface StyledTextFieldProps {
  inputWidth?: string
}

export const StyledTextField = styled.input<StyledTextFieldProps>`
  width: ${props => props.inputWidth ? props.inputWidth : '12rem'};
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: none;
  }
`;