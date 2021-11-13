/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AnswerData } from './QuestionsData';
import { gray3 } from './Styles';

interface Props {
  data: AnswerData;
}

function Answser({ data }: Props) {
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 13px;
        `}
      >
        {data.content}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Answered by ${data.username} on
  ${data.createdAt.toLocaleDateString()}
  ${data.createdAt.toLocaleTimeString()}`}
      </div>
    </div>
  );
}

export default Answser;
