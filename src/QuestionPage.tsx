/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AnswerList from './AnswerList';
import Page from './Page';
import { getQuestion, QuestionData } from './QuestionsData';
import { gray3, gray6 } from './Styles';

function QuestionPage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    async function doGetQuestion(id: number) {
      const question = await getQuestion(id);
      setQuestion(question);
    }
    if (questionId) doGetQuestion(Number(questionId));
  }, [questionId]);
  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${
                question.username
              } on ${question.createdAt.toLocaleDateString()} ${question.createdAt.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
          </Fragment>
        )}
      </div>
    </Page>
  );
}

export default QuestionPage;
