'use client'

import { useUserQuery } from "@/app/hooks/useUserQuery";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import * as S from "./style";


const SwitchThemeButton = () => {
    const { user, updateUser } = useUserQuery()

    const handleToggle = () => {
        updateUser({ selectedTheme: user.selectedTheme == 'light' ? 'dark' : 'light' });
    };

    return (
        <S.Switch onClick={handleToggle}>
            <S.IconWrapper>
                <RiMoonFill />
            </S.IconWrapper>
            <S.IconWrapper>
                <RiSunLine />
            </S.IconWrapper>
            <S.SwitchButton isdarkmode={user.selectedTheme} />
        </S.Switch>
    );
};

export default SwitchThemeButton