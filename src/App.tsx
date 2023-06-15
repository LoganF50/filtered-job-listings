import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { Themes } from "./styles/themes";
import { MouseEvent, useState } from "react";
import { Filter } from "./components/Filter";
import { FilterSection } from "./components/FilterSection";
import { Header } from "./components/Header";
import { FilterTablet } from "./components/FilterTablet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSize.base300};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    max-width: 1200px;
  }
`;

const StyledMain = styled.main`
  margin: ${({ theme }) => theme.spacing.base600};
`;

type FilterData = {
  category: string;
  name: string;
};

const initialFilters: FilterData[] = [
  { category: "role", name: "Frontend" },
  { category: "language", name: "CSS" },
  { category: "language", name: "JavaScript" },
];

function App() {
  const [filters, setFilters] = useState<FilterData[]>(initialFilters);

  const AddFilter = (addedFilter: FilterData) => {
    let shouldAdd = true;

    filters.forEach((filter) => {
      if (
        filter.category === addedFilter.category &&
        filter.name === addedFilter.name
      ) {
        shouldAdd = false;
      }
    });

    if (shouldAdd) {
      const newFilters = [...filters, addedFilter];
      setFilters(newFilters);
    }
  };

  const ClearFilters = () => {
    setFilters([]);
  };

  const removeFilter = (clickedFilter: FilterData) => {
    const newFilters = filters.filter(
      (filter) =>
        filter.category !== clickedFilter.category ||
        filter.name !== clickedFilter.name
    );

    setFilters(newFilters);
  };

  return (
    <>
      <ThemeProvider theme={Themes.light}>
        <GlobalStyle />
        <Wrapper>
          <StyledApp>
            <Header />
            <StyledMain>
              {filters.length > 0 && (
                <FilterSection
                  filters={filters.map((filter) => {
                    return (
                      <Filter
                        key={`${filter.category}${filter.name}`}
                        name={filter.name}
                        onClick={() => removeFilter(filter)}
                      />
                    );
                  })}
                  onClear={ClearFilters}
                />
              )}
            </StyledMain>
          </StyledApp>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
