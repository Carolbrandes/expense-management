"use client"

import styled from "styled-components";


export const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 4.5rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: 0.5rem;
  position: relative;
  cursor: pointer;
`;

interface SwitchButtonProps {
  isdarkmode: boolean;
}

export const SwitchButton = styled.div<SwitchButtonProps>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  position: absolute;
  left: ${({ isdarkmode }) => (isdarkmode ? "5px" : "calc(100% - 35px)")}; 
  transition: left 0.3s ease;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.colors.secondaryText};
`;