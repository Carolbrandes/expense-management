import React from 'react';
import * as S from './style';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    labelPosition?: labelPosition
    margin?: string
}

export const Input = ({ value, onchange, label, labelPosition = 'top', margin, ...rest }: InputProps) => {

    return (
        <S.StyledInputContainer margin={margin} labelPosition={labelPosition} >
            {
                label && <label htmlFor={label}>{label}</label>
            }
            <S.StyledTextField
                inputWidth='100%'
                id={label}
                placeholder="Email"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onchange(e.target.value)}
                {...rest}
            />
        </S.StyledInputContainer>
    );
};


