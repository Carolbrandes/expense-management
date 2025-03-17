'use client'
import * as S from './style';

interface DateProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    labelPosition?: labelPosition;
}

export const DateInput = ({ label, labelPosition = 'top', ...rest }: DateProps) => {

    return (
        <S.DateInputContainer labelPosition={labelPosition}>
            {label && <label htmlFor={label}>{label}</label>}
            <input {...rest} type="date" id={label} />
        </S.DateInputContainer>
    );
};
