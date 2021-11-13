/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from './Page';
import { QuestionData, searchQuestions } from './QuestionsData';
import QuestionList from './QuestionsList';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get('criteria') || '';
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    async function doSearchQuestions() {
      const questions = await searchQuestions(searchString);
      setQuestions(questions);
    }
    doSearchQuestions();
  }, [searchString]);
  return (
    <Page title="search results">
      {searchString && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{searchString}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
}

export default SearchPage;
