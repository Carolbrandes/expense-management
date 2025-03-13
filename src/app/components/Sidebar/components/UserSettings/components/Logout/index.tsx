import { useAuth } from "@/app/hooks/useAuthContext";
import { signOut } from "next-auth/react";

import * as S from './style';


export const Logout = () => {
    const { updateAuthenticated, updateUserId } = useAuth();


    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        updateAuthenticated(false);
        updateUserId(null);
        signOut({ callbackUrl: "/login" });
    };


    return (
        <S.LogoutContainer onClick={handleLogout}>
            Logout
        </S.LogoutContainer>
    )
}


