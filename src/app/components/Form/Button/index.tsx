'use client'

import { Spinner } from '../../Spinner';
import * as S from './style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onclick: () => void;
    isLoading?: boolean
    children: React.ReactNode
    widthButton?: string
    fontSize?: string
}

export const Button = ({ onclick, isLoading = false, children, widthButton, fontSize, ...rest }: ButtonProps) => {
    return (
        <S.ButtonContainer fontSize={fontSize} widthButton={widthButton} onClick={onclick} {...rest}>
            {
                isLoading ? <Spinner /> : <>{children}</>
            }
        </S.ButtonContainer>
    );
};
