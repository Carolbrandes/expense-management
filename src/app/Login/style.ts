import styled from 'styled-components';
import { Severity } from './page';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 16px;
  background-color: #f5f5f5;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  width: 100%;
  max-width: 25rem;
  min-height: 10rem;
`;

export const StyledTypography = styled.h5`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const StyledFormContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1.5rem;
`

export const StyledTextField = styled.input`
  width: 12rem;
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.button`
  width: fit-content;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;



interface StyledAlertProps {
    severity: Severity
}

export const StyledAlert = styled.div<StyledAlertProps>`
  width: fit-content;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ severity, theme }) =>
        severity === 'error' ? theme.colors.error :
            severity === 'success' ? theme.colors.success :
                theme.colors.info};
  color: #fff;
  position: absolute;
    right: 3rem;
    bottom: 4rem;
`;