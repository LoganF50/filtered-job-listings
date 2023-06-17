import styled from "styled-components";

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.base200};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  gap: ${({ theme }) => theme.spacing.base500};
  padding: ${({ theme }) => theme.spacing.base700};

  & a {
    color: ${({ theme }) => theme.color.veryDarkCyan};
    font-size: ${({ theme }) => theme.fontSize.base200};
    font-weight: ${({ theme }) => theme.fontWeight.bold};

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.primary};
    }
  }

  & img {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50%, -50%);
  }
`;

const Featured = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.base200};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.base200};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base500};
  padding-top: ${({ theme }) => theme.spacing.base500};
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.base500};
`;

const FlexRowGray = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.darkCyan};
  gap: ${({ theme }) => theme.spacing.base300};
`;

const PillSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.base300};
`;

const Company = styled.div`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.base200};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Pill = styled.div<PillProps>`
  background-color: ${({ isFeatured, isNew, theme }) =>
    isNew
      ? theme.color.primary
      : isFeatured
      ? theme.color.veryDarkCyan
      : theme.color.darkCyan};
  border-radius: ${({ theme }) => theme.borderRadius.circular};
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.base200};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: ${({ theme }) =>
    `${theme.spacing.base200} ${theme.spacing.base300}`};
  text-transform: uppercase;
`;

const Splitter = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.color.darkCyan};
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.base500};
`;

type PostProps = {
  company: string;
  logo: string;
  isNew: boolean;
  isFeatured: boolean;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  filters: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type PillProps = {
  isFeatured?: boolean;
  isNew?: boolean;
};

export const Post = ({
  company,
  logo,
  isNew,
  isFeatured,
  position,
  postedAt,
  contract,
  location,
  filters,
  onClick,
}: PostProps) => {
  return (
    <StyledPost>
      {isFeatured && <Featured />}
      <img src={logo} alt="" />
      <Info>
        <FlexRow>
          <Company>{company}</Company>
          <PillSection>
            {isNew && <Pill isNew>new!</Pill>}
            {isFeatured && <Pill isFeatured>featured</Pill>}
          </PillSection>
        </FlexRow>
        <a onClick={onClick}>{position}</a>
        <FlexRowGray>
          <div>{postedAt}</div>
          <span>&#183;</span>
          <div>{contract}</div>
          <span>&#183;</span>
          <div>{location}</div>
        </FlexRowGray>
      </Info>
      <Splitter />
      <Filters>{filters}</Filters>
    </StyledPost>
  );
};
