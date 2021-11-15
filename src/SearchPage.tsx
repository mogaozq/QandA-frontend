/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Page from './Page';
import { searchQuestions } from './QuestionsData';
import QuestionList from './QuestionsList';
import { AppState } from './Store';
import {
  searchedQuestionsAction,
  searchingQuestionsAction,
} from './Store/questions/QuestionActions';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get('criteria') || '';
  // const [questions, setQuestions] = useState<QuestionData[]>([]);
  const questions = useSelector((state: AppState) => state.questions.searched);
  const dispatch = useDispatch();

  useEffect(() => {
    async function doSearchQuestions() {
      dispatch(searchingQuestionsAction());
      const questions = await searchQuestions(searchString);
      dispatch(searchedQuestionsAction(questions));
    }
    doSearchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
