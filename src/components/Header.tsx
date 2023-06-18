import styled from "styled-components";

const StyledHeader = styled.header`
  height: 156px;
  background-color: ${({ theme }) => theme.color.primary};
  background-image: url("images/bg-header-mobile.svg");

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    background-image: url("images/bg-header-desktop.svg");
  }
`;

export const Header = () => {
  return <StyledHeader />;
};
