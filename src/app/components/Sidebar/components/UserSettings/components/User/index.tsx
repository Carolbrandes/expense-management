import { useUserQuery } from "@/app/hooks/useUserQuery";
import * as S from './style';

export const User = () => {
    const { user } = useUserQuery();
    console.log("🚀 ~ User ~ user:", user)

    return (
        <S.UserContainer>
            Hi, {user.email}
        </S.UserContainer>
    )
}


