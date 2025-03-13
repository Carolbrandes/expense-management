'use client'

import { useState } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import { useThemeContext } from "../../../../../../hooks/useThemeMode";
import * as S from "./style";

export enum SwitchThemeButtonOptions {
    LIGHT = "light",
    DARK = "dark",
}



export const SwitchThemeButton = () => {
    const { toggleTheme } = useThemeContext();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        toggleTheme(!isDarkMode ? SwitchThemeButtonOptions.DARK : SwitchThemeButtonOptions.LIGHT);
    };

    return (
        <S.Switch onClick={handleToggle}>
            <S.IconWrapper>
                <RiMoonFill />
            </S.IconWrapper>
            <S.IconWrapper>
                <RiSunLine />
            </S.IconWrapper>
            <S.SwitchButton isdarkmode={isDarkMode} />
        </S.Switch>
    );
};


