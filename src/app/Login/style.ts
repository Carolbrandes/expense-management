import styled from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  max-width: 35rem;
  min-height: 10rem;
  margin-top: 2rem;
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
    gap: 0.05rem;
    padding-bottom: 1.5rem;
`
