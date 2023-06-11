import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { Themes } from "./styles/themes";
import { useState } from "react";

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

function App() {
  const [currentTheme, setCurrentTheme] = useState(Themes.light);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Wrapper>
          <StyledApp>
            <h1>Template: Vite React TS</h1>
            <button>Theme Toggle</button>
          </StyledApp>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
