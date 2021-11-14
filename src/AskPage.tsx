import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Page from './Page';
import { createQuestion } from './QuestionsData';
import {
  FieldContainer,
  FieldError,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess,
} from './Styles';

interface IAskFormData {
  title: string;
  content: string;
}

function AskPage() {
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAskFormData>({
    mode: 'onBlur',
  });

  const submit = async (data: IAskFormData) => {
    const result = await createQuestion({
      content: data.content,
      title: data.title,
      username: 'Moga',
      createdAt: new Date(),
    });
    setSuccessfullyCreated(Boolean(result));
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submit)}>
        <Fieldset disabled={isSubmitting || successfullyCreated}>
          <FieldContainer>
            <FieldLabel htmlFor="title">title</FieldLabel>
            <FieldInput id="title" {...register('title', { required: true, minLength: 10 })} />
            {errors.title?.type === 'required' && (
              <FieldError>You must enter the question title</FieldError>
            )}
            {errors.title?.type === 'minLength' && (
              <FieldError>The title must be at least 10 characters</FieldError>
            )}
            <FieldError>{errors.title?.message}</FieldError>
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">content</FieldLabel>
            <FieldTextArea
              id="content"
              {...register('content', {
                required: true,
                minLength: 50,
              })}
            />
            {errors.content?.type === 'required' && (
              <FieldError>You must enter the question content</FieldError>
            )}
            {errors.content?.type === 'minLength' && (
              <FieldError>The content must be at least 50 characters</FieldError>
            )}
            <FieldError>{errors.content?.type}</FieldError>
            <FieldError>{errors.content?.message}</FieldError>
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit your question</PrimaryButton>
          </FormButtonContainer>
          {successfullyCreated && (
            <SubmissionSuccess>Your question was successfully submitted</SubmissionSuccess>
          )}
        </Fieldset>
      </form>
    </Page>
  );
}

export default AskPage;
