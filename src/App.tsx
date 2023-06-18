import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { Themes } from "./styles/themes";
import { useState } from "react";
import { Filter } from "./components/Filter";
import { FilterSection } from "./components/FilterSection";
import { Header } from "./components/Header";
import { FilterTablet } from "./components/FilterTablet";
import { Post } from "./components/Post";

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

const initialPosts: PostData[] = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["Ruby", "Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

function App() {
  const [filters, setFilters] = useState<FilterData[]>(initialFilters);
  const [posts, setPosts] = useState<PostData[]>(initialPosts);

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
