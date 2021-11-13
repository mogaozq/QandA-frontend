/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { QuestionData } from './QuestionsData';
import { gray2, gray3 } from './Styles';

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question = ({ data, showContent = true }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <Link
      css={css`
        text-decoration: none;
        color: ${gray2};
      `}
      to={`question/${data.questionId}`}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 19px;
        `}
      >
        {data.title}
      </div>
    </Link>
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {data.content.length > 50 ? `${data.content.substring(0, 50)}...` : data.content}
      </div>
    )}

    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${data.username} on
        ${data.createdAt.toLocaleDateString()} ${data.createdAt.toLocaleTimeString()}`}
    </div>
  </div>
);
