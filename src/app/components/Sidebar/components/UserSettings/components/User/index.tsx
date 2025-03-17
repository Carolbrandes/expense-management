import { useUserQuery } from "@/app/hooks/useUserQuery";
import * as S from './style';

export const User = () => {
    const { user } = useUserQuery();


    return (
        <S.UserContainer>
            Hi, {user.email}
        </S.UserContainer>
    )
}


