import * as S from './styles';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type direction = 'column' | 'row'
export type position = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'

interface TitleProps {
    text: string;
    tag: HeadingTag;
    fontSize?: string
    icon?: React.ReactNode
    direction?: direction
    gap?: string
    positionAlign?: position
    positionJustify?: position

}

export const Title = ({ text, tag: Tag, fontSize = '1rem', icon, direction, gap, positionAlign, positionJustify }: TitleProps) => {
    const validTags: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    if (!validTags.includes(Tag)) {
        throw new Error(`Invalid tag: ${Tag}. Only h1-h6 are allowed.`);
    }

    return <S.TitleContainer
        direction={direction}
        gap={gap}
        positionAlign={positionAlign}
        positionJustify={positionJustify}
    >
        {icon && icon}
        <Tag style={{ fontSize }}>{text}</Tag>
    </S.TitleContainer>;
};


