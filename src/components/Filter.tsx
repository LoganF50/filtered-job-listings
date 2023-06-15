import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.filter};
  border-radius: ${({ theme }) => theme.borderRadius.base100};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  div {
    display: grid;
    place-content: center;
    border-top-left-radius: ${({ theme }) => theme.borderRadius.base100};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.base100};
    color: ${({ theme }) => theme.color.primary};
    padding: ${({ theme }) => theme.spacing.base300};
  }

  button {
    background-color: ${({ theme }) => theme.color.primary};
    border: none;
    border-top-right-radius: ${({ theme }) => theme.borderRadius.base100};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.base100};
    padding: ${({ theme }) => theme.spacing.base300};

    &:hover {
      background-color: ${({ theme }) => theme.color.veryDarkCyan};
      cursor: pointer;
    }
  }
`;

type FilterProps = {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Filter = ({ name, onClick }: FilterProps) => {
  return (
    <StyledFilter>
      <div>{name}</div>
      <button onClick={onClick}>
        <img src="images/icon-remove.svg" alt="remove filter" />
      </button>
    </StyledFilter>
  );
};
