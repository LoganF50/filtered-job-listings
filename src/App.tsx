import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { Themes } from "./styles/themes";
import { useState } from "react";
import { Filter } from "./components/Filter";
import { FilterSection } from "./components/FilterSection";
import { Header } from "./components/Header";
import { FilterTablet } from "./components/FilterTablet";
import { Post } from "./components/Post";
import postData from "./data/data.json";

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
  }
`;

const StyledMain = styled.main`
  padding: ${({ theme }) => theme.spacing.base600};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    align-self: center;
    width: min(1150px, 100%);
  }
`;

const PostSection = styled.div<{ isFiltersShown: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base1000};
  padding-top: ${({ isFiltersShown, theme }) =>
    isFiltersShown ? "" : theme.spacing.base700};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    gap: ${({ theme }) => theme.spacing.base700};
  }
`;

type FilterData = {
  category: string;
  name: string;
};

type PostData = {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

const initialFilters: FilterData[] = [];

const initialPosts: PostData[] = postData;

function App() {
  const [filters, setFilters] = useState<FilterData[]>(initialFilters);
  const posts = initialPosts;

  const addFilter = (addedFilter: FilterData) => {
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

  const clearFilters = () => {
    setFilters([]);
  };

  const getFiltersFromPost = (post: PostData) => {
    let filters: FilterData[] = [];
    //role
    filters.push({ category: "role", name: post.role });
    //level
    filters.push({ category: "level", name: post.level });
    //languages
    post.languages.forEach((language) =>
      filters.push({ category: "language", name: language })
    );
    //tools
    post.tools.forEach((tool) =>
      filters.push({ category: "tool", name: tool })
    );

    return filters;
  };

  const removeFilter = (clickedFilter: FilterData) => {
    const newFilters = filters.filter(
      (filter) =>
        filter.category !== clickedFilter.category ||
        filter.name !== clickedFilter.name
    );

    setFilters(newFilters);
  };

  const shouldIncludePost = (post: PostData) => {
    const postFilters = getFiltersFromPost(post);
    let shouldInclude = true;

    filters.forEach((filter) => {
      const found = postFilters.find(
        (postFilter) =>
          postFilter.category === filter.category &&
          postFilter.name === filter.name
      );
      if (found === undefined) {
        shouldInclude = false;
      }
    });

    return shouldInclude;
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
                  onClear={clearFilters}
                />
              )}
              <PostSection isFiltersShown={filters.length > 0}>
                {posts
                  .filter((post) => shouldIncludePost(post))
                  .map((post) => {
                    return (
                      <Post
                        key={post.id}
                        company={post.company}
                        logo={post.logo}
                        isNew={post.new}
                        isFeatured={post.featured}
                        position={post.position}
                        postedAt={post.postedAt}
                        contract={post.contract}
                        location={post.location}
                        filters={getFiltersFromPost(post).map((filter) => {
                          return (
                            <FilterTablet
                              key={`${filter.category}${filter.name}`}
                              name={filter.name}
                              onClick={() => addFilter({ ...filter })}
                            />
                          );
                        })}
                        onClick={() => ""}
                      />
                    );
                  })}
              </PostSection>
            </StyledMain>
          </StyledApp>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
