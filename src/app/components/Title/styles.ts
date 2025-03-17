import { css, styled } from "styled-components"
import { direction, position } from "."

interface TitleContainerProps {
    direction?: direction
    gap?: string
    positionAlign?: position
    positionJustify?: position
    margin?: string
    color?: string
}

export const TitleContainer = styled.div<TitleContainerProps>`
    margin: ${props => props.margin ? props.margin : '0 0 0.5rem 0'};
    color: ${(props) =>
        props.color ? props.color : props.theme.colors.secondaryText}; 
    
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