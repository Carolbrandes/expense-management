import React from 'react';
import * as S from './style';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Fix: Use camelCase
    label?: string;
    labelPosition?: labelPosition;
    margin?: string;
}

export const Input = ({ value, onChange, label, labelPosition = 'top', margin, ...rest }: InputProps) => {
    return (
        <S.StyledInputContainer margin={margin} labelPosition={labelPosition}>
            {label && <label htmlFor={label}>{label}</label>}
            <S.StyledTextField
                inputwidth="100%"
                id={label}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </S.StyledInputContainer>
    );
};