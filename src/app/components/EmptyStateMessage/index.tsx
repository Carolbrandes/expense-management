'use client'

import * as S from './style';

interface EmptyStateMessageProps {
    message: string
}

export const EmptyStateMessage = ({ message }: EmptyStateMessageProps) => {
    return (
        <S.EmptyStateMessageContainer>
            {message}
        </S.EmptyStateMessageContainer>
    );
};
