'use client';

import { useTheme } from 'styled-components';
import { Title } from '../Title';
import { Button } from './Button';
import { DateInput } from './DateInput';
import { Input } from './Input';
import { Select } from './Select';
import * as S from './style';

interface FormProps {
    title: string;
    fields: Field[];
    buttons: {
        label: string;
        onClick: (opt?: any) => void;
    }[];
}

export const Form = ({ title, fields, buttons }: FormProps) => {
    const theme = useTheme();

    return (
        <S.FormContainer>
            <Title
                tag="h1"
                text={title}
                margin="0 0 3rem 0"
                fontSize="2rem"
                color={theme.colors.text}
            />

            <S.InputsContainer>
                {fields.map((field) => {
                    if (field.type === 'text') {
                        return (
                            <Input
                                key={field.label}
                                type={field.type}
                                label={field.label}
                                value={field.value}
                                onchange={field.onChange}
                            />
                        );
                    }

                    if (field.type === 'select' && field.selectOptions) {
                        return (
                            <Select
                                key={field.label}
                                value={field.value}
                                onChange={field.onChange}
                                label={field.label}
                                options={field.selectOptions}
                            />
                        );
                    }

                    if (field.type === 'date') {
                        return (
                            <DateInput
                                key={field.label}
                                label={field.label}
                                value={field.value}
                                onChange={field.onChange} // Pass the event handler
                            />
                        );
                    }

                    // Fallback for unsupported field types
                    console.warn(`Unsupported field type: ${field.type}`);
                    return null;
                })}
            </S.InputsContainer>

            <S.ButtonContainer>
                {buttons.map((btn) => (
                    <Button key={btn.label} widthButton="8rem" onclick={btn.onClick}>
                        {btn.label}
                    </Button>
                ))}
            </S.ButtonContainer>
        </S.FormContainer>
    );
};