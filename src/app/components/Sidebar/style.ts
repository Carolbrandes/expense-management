import { styled } from "styled-components";

export const SidebarContainer = styled.nav`
    background: ${({ theme }) => theme.colors.primary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
`

export const SidebarSections = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0;
`
