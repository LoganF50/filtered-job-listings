import styled from "styled-components";

const StyledFilterTablet = styled.button`
  background-color: ${({ theme }) => theme.color.filter};
  border-radius: ${({ theme }) => theme.borderRadius.base100};
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: ${({ theme }) => theme.spacing.base300};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    cursor: pointer;
  }
`;

type FilterTabletProps = {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterTablet = ({ name, onClick }: FilterTabletProps) => {
  return <StyledFilterTablet onClick={onClick}>{name}</StyledFilterTablet>;
};
