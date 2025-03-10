"use client"

import styled from "styled-components";

export const SectionsTitle = styled.h3`
    font-style: italic;
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: 15rem 1rem;
`
export const Sidebar = styled.div`
    background: ${({ theme }) => theme.colors.primary};
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    padding: 1rem;

    h1{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`

export const Nav = styled.nav`
    div{
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    }

    a{
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
    }

`

export const UserSettings = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.85rem;
   
    .user{
            display: flex;
            align-items: center;
            gap: 0.5rem; 
            padding-top: 10rem;
    }

`