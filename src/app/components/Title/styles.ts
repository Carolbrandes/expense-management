import { css, styled } from "styled-components"
import { direction, position } from "."

interface TitleContainerProps {
    direction?: direction
    gap?: string
    positionAlign?: position
    positionJustify?: position
}

export const TitleContainer = styled.div<TitleContainerProps>`
    margin-bottom:0.5rem;
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