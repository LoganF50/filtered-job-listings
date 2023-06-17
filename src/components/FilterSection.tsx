import styled from "styled-components";

const StyledFilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.base200};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  padding: ${({ theme }) => theme.spacing.base700};
  transform: translate(0, -55px);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.base500};
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.darkCyan};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  &:hover {
    color: ${({ theme }) => theme.color.primary};
    cursor: pointer;
    text-decoration: underline;
  }
`;

type FilterSectionProps = {
  filters: React.ReactNode;
  onClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterSection = ({ filters, onClear }: FilterSectionProps) => {
  return (
    <StyledFilterSection>
      <FilterGroup>{filters}</FilterGroup>
      <ClearButton onClick={onClear}>Clear</ClearButton>
    </StyledFilterSection>
  );
};
