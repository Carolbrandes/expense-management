import { styled } from "styled-components";

interface ToastContainerProps {
    severity: MessageSeverity
}

export const ToastContainer = styled.div<ToastContainerProps>`
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