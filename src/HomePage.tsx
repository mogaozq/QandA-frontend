/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from './Page';
import PageTitle from './PageTitle';
import { getUnAnsweredQuestions, QuestionData } from './QuestionsData';
import QuestionList from './QuestionsList';
import { PrimaryButton } from './Styles';

const titleContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function HomePage() {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function doGetUnAsnweredQuestions() {
      const questions = await getUnAnsweredQuestions();
      setQuestions(questions);
      setLoadingData(false);
    }
    doGetUnAsnweredQuestions();
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
