import { css, styled } from "styled-components"


interface TitleContainerProps {
    direction?: direction
    gap?: string
    positionAlign?: position
    positionJustify?: position
    margin?: string
    color?: string
    width?: string
}

export const TitleContainer = styled.div<TitleContainerProps>`
    margin: ${props => props.margin ? props.margin : '0 0 0.5rem 0'};
    color: ${(props) =>
        props.color ? props.color : props.theme.colors.secondaryText}; 
    width: ${props => props.width ? props.width : 'fit-content'};
    
    ${props => {
        return props.direction && props.gap && css`
                                display: flex;
                                justify-content: ${props.positionJustify};
                                align-items: ${props.positionAlign};
                                flex-direction: ${props.direction};
                                gap: ${props.gap};
                        `
    }
    }
`