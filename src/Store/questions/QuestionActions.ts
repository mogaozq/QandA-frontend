import { QuestionData } from '../../QuestionsData';

export const GETTING_UNANSWERED_QUESTIONS = 'GETTING_UNANSWERED_QUESTIONS';
export const GOT_UNANSWERED_QUESTIONS = 'GOT_UNANSWERED_QUESTIONS';

export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTING_UNANSWERED_QUESTIONS,
  } as const);

export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOT_UNANSWERED_QUESTIONS,
    questions,
  } as const);

export const GETTING_QUESTION = 'GETTING_QUESTION';
export const GOT_QUESTION = 'GOT_QUESTION';

export const gettingQuestionAction = () =>
  ({
    type: GETTING_QUESTION,
  } as const);

export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOT_QUESTION,
    question,
  } as const);

export const SEARCHING_QUESTIONS = 'SEARCHING_QUESTIONS';
export const SEARCHED_QUESTIONS = 'SEARCHED_QUESTIONS';

export const searchingQuestionsAction = () =>
  ({
    type: SEARCHING_QUESTIONS,
  } as const);

export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHED_QUESTIONS,
    questions,
  } as const);
