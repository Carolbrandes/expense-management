import React from 'react'
import * as S from './style'

interface SectionProps {
    children: React.ReactNode
}

export const Section = ({ children }: SectionProps) => {
    return (
        <S.SectionContainer>
            {children}
        </S.SectionContainer>
    )
}


