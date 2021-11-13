/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Question } from './Question';
import { QuestionData } from './QuestionsData';
import { accent2, gray5 } from './Styles';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

const ulStyles = css`
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid ${accent2};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const liStyles = css`
  border-top: 1px solid ${gray5};
  :first-of-type {
    border-top: none;
  }
`;

const QuestionList = ({ data, renderItem }: Props) => (
  <ul css={ulStyles}>
    {data.map((question) => (
      <li css={liStyles} key={question.questionId}>
        {renderItem ? renderItem(question) : <Question key={question.questionId} data={question} />}
      </li>
    ))}
  </ul>
);

export default QuestionList;
