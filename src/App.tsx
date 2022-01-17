/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './Auth';
import AuthorizedPage from './AuthorizedPage';
// import AskPage from './AskPage';
import Header from './Header';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import QuestionPage from './QuestionPage';
import SearchPage from './SearchPage';
import SignInPage from './SignInPage';
import SignOutPage from './SignOutPage';
import { configureState } from './Store';
import { fontFamily, fontSize, gray2 } from './Styles';

const AskPage = lazy(() => import('./AskPage'));

const cssStyles = css`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  color: ${gray2};
`;

const appStore = configureState();

function App() {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <BrowserRouter>
          <div css={cssStyles}>
            <Header />
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="signIn" element={<SignInPage action="signin" />} />
              <Route path="signIn-callback" element={<SignInPage action="signin-callback" />} />
              <Route path="signout" element={<SignOutPage action="signout" />} />
              <Route path="signout-callback" element={<SignOutPage action="signout-callback" />} />
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
                    <AuthorizedPage>
                      <AskPage />
                    </AuthorizedPage>
                  </Suspense>
                }
              />
              <Route path="question/:questionId" element={<QuestionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
