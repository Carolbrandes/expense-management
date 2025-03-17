import { TbPigMoney } from "react-icons/tb";
import { Title } from '../../../Title';
import * as S from './style';

export const Logo = () => {
    return (
        <S.LogoContainer>
            <Title
                tag="h1"
                text="Transaction Management"
                icon={<TbPigMoney size={45} />}
                gap="0.8rem"
                direction="column"
                fontSize="1.5rem"
            />
        </S.LogoContainer>
    )
}

