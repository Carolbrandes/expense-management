import * as S from './style';

interface SpinnerProps {
    color?: string
}

export const Spinner = ({ color }: SpinnerProps) => {
    return (
        <S.SpinnerContainer>
            <S.Spinner color={color} />
        </S.SpinnerContainer>
    )
}


