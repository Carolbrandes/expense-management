import { styled } from "styled-components";

export const NavItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    height: 3rem;

    a{
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
    }
`