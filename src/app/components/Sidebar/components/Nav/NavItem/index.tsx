import Link from 'next/link';
import React from 'react';
import * as S from './style';


interface NavItemProps {
    icon: React.ReactNode
    text?: string
    link?: string
    children?: React.ReactNode
}

export const NavItem = ({ icon, text, link, children }: NavItemProps) => {

    return text && link ? (
        <S.NavItemContainer>
            <div>{icon}</div>
            <div>
                <Link href={link}>{text}</Link>
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


