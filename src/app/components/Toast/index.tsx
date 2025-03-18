'use client'

import * as S from './style';

interface ToastProps {
    message: string
    severity: MessageSeverity
}

export const Toast = ({ message, severity }: ToastProps) => {

    return (
        <S.ToastContainer severity={severity}>
            {message}
        </S.ToastContainer >
    );
};
