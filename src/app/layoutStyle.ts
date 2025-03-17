"use client"

import styled, { css } from "styled-components";

interface LayoutStyleProps {
    isLoginPage: boolean
}

export const Container = styled.div<LayoutStyleProps>`
    ${props =>
        props.isLoginPage ?
            css`
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.35rem;
    ` :
            css`
            display: grid;
            grid-template-columns: 15rem 1rem;
    `}
`

export const Main = styled.main`
    width: 100%;
    padding: 3rem;
`