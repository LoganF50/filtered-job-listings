import styled from "styled-components";

const StyledHeader = styled.header`
  height: 156px;
  background-color: ${({ theme }) => theme.color.primary};
  background-image: url("images/bg-header-mobile.svg");
`;

export const Header = () => {
  return <StyledHeader />;
};
