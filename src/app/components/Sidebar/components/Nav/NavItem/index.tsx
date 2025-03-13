import React from 'react'
import * as S from './style'

interface NavItemProps {
    icon: React.ReactNode
    text?: string
    children?: React.ReactNode
}

export const NavItem = ({ icon, text, children }: NavItemProps) => {
    return text ? (
        <S.NavItemContainer>
            <div>{icon}</div>
            <div>
                <a href="">{text}</a>
            </div>
        </S.NavItemContainer>
    ) : (
        (
            <S.NavItemContainer>
                <div>{icon}</div>
                <div>
                    {children}
                </div>
            </S.NavItemContainer>
        )
    )
}


