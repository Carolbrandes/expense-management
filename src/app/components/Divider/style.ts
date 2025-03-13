import styled from "styled-components";

export const DividerContainer = styled.div`
   width: 12rem;
   border-bottom: 1px solid ${({ theme }) => theme.colors.diviser};
`;