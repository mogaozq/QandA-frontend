/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import AnswerList from './AnswerList';
import Page from './Page';
import { createAnswer, getQuestion, QuestionData } from './QuestionsData';
import {
  FieldContainer,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  gray3,
  gray6,
  PrimaryButton,
  SubmissionSuccess,
} from './Styles';

interface IAnswerFormData {
  content: string;
}

function QuestionPage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAnswerFormData>({
    mode: 'onBlur',
  });

  useEffect(() => {
    async function doGetQuestion(id: number) {
      const question = await getQuestion(id);
      setQuestion(question);
    }
    if (questionId) doGetQuestion(Number(questionId));
  }, [questionId]);

  const submitAnswer = (data: IAnswerFormData) => {
    const result = createAnswer({
      content: data.content,
      questionId: question!.questionId,
      createdAt: new Date(),
      username: 'Moga',
    });
    setSuccessfullyCreated(Boolean(result));
  };

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
            <form
              css={css`
                margin-top: 20px;
              `}
              onSubmit={handleSubmit(submitAnswer)}
            >
              <Fieldset disabled={isSubmitting || successfullyCreated}>
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...register('content', { required: true, minLength: 30 })}
                  />
                  {errors.content?.type === 'required' && (
                    <FieldError>You must enter the question content</FieldError>
                  )}
                  {errors.content?.type === 'minLength' && (
                    <FieldError>The content must be at least 30 characters</FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">Submit your answer</PrimaryButton>
                </FormButtonContainer>
                {successfullyCreated && (
                  <SubmissionSuccess>Your answer was successfuly submitted</SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </Fragment>
        )}
      </div>
    </Page>
  );
}

export default QuestionPage;
