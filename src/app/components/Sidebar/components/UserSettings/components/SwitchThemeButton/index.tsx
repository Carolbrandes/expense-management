'use client'

import { useUserQuery } from '@/app/hooks/useUserQuery';
import { useEffect, useState } from 'react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';
import * as S from './style';

const SwitchThemeButton = () => {
    const { user, updateUser } = useUserQuery();
    const [selectedTheme, setSelectedTheme] = useState<Theme>('light'); // Default to 'light'


    useEffect(() => {
        if (user?.selectedTheme) {
            setSelectedTheme(user.selectedTheme);
        }
    }, [user?.selectedTheme]);

    const handleToggle = () => {
        const newTheme = selectedTheme === 'light' ? 'dark' : 'light';
        setSelectedTheme(newTheme);
        updateUser({ selectedTheme: newTheme });
    };

    return (
        <S.Switch onClick={handleToggle}>
            <S.IconWrapper>
                <RiMoonFill />
            </S.IconWrapper>
            <S.IconWrapper>
                <RiSunLine />
            </S.IconWrapper>
            <S.SwitchButton isdarkmode={selectedTheme} />
        </S.Switch>
    );
};

export default SwitchThemeButton;