/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from './Page';
import PageTitle from './PageTitle';
import { getUnAnsweredQuestions } from './QuestionsData';
import QuestionList from './QuestionsList';
import { PrimaryButton } from './Styles';
import { AppState } from './Store';
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
} from './Store/questions/QuestionActions';

const titleContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function HomePage() {
  const questions = useSelector((state: AppState) => state.questions.unAnswered);
  const loadingData = useSelector((state: AppState) => state.questions.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function doGetUnAsnweredQuestions() {
      dispatch(gettingUnansweredQuestionsAction());
      const questions = await getUnAnsweredQuestions();
      dispatch(gotUnansweredQuestionsAction(questions));
    }
    doGetUnAsnweredQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAskQuestionClick = () => {
    console.log('TODO-go to the ask page');
    navigate('ask');
  };

  return (
    <Page>
      <div css={titleContainerStyles}>
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
      </div>
      {loadingData ? <div>Loading...</div> : <QuestionList data={questions} />}
    </Page>
  );
}

export default HomePage;
