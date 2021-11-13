/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AskPage from './AskPage';
import Header from './Header';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import QuestionPage from './QuestionPage';
import SearchPage from './SearchPage';
import SignInPage from './SignInPage';
import { fontFamily, fontSize, gray2 } from './Styles';
const AskPage = lazy(() => import('./AskPage'));
const cssStyles = css`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  color: ${gray2};
`;
function App() {
  return (
    <BrowserRouter>
      <div css={cssStyles}>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="signIn" element={<SignInPage />} />
          <Route
            path="ask"
            element={
              <Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </Suspense>
            }
          />
          <Route path="question/:questionId" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
