'use client'


import * as S from './style';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    labelPosition?: labelPosition;
    options: {
        value: string
        label: string
    }[]
}

export const Select = ({ label, options, labelPosition = 'top', ...rest }: SelectProps) => {
    return (
        <S.SelectContainer labelPosition={labelPosition}>
            {label && <label htmlFor={label}>{label}</label>}

            <select {...rest} id={label} value={options[0].value}>
                {
                    options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))
                }
            </select>
        </S.SelectContainer>
    );
};
