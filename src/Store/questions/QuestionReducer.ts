import { QuestionData } from '../../QuestionsData';
import {
  gettingQuestionAction,
  gettingUnansweredQuestionsAction,
  GETTING_QUESTION,
  GETTING_UNANSWERED_QUESTIONS,
  gotQuestionAction,
  gotUnansweredQuestionsAction,
  GOT_QUESTION,
  GOT_UNANSWERED_QUESTIONS,
  searchedQuestionsAction,
  SEARCHED_QUESTIONS,
  searchingQuestionsAction,
  SEARCHING_QUESTIONS,
} from './QuestionActions';

export interface QuestionsState {
  isLoading: boolean;
  unAnswered: QuestionData[];
  searched: QuestionData[];
  viewing: QuestionData | null;
}

const initialQuestionState: QuestionsState = {
  isLoading: false,
  unAnswered: [],
  searched: [],
  viewing: null,
};

type QuestionAction =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

export const questionsReducer = (
  state: QuestionsState = initialQuestionState,
  action: QuestionAction,
): QuestionsState => {
  switch (action.type) {
    case GETTING_UNANSWERED_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case GOT_UNANSWERED_QUESTIONS:
      return {
        ...state,
        unAnswered: action.questions,
        isLoading: false,
      };
    case GETTING_QUESTION:
      return {
        ...state,
        isLoading: true,
      };
    case GOT_QUESTION:
      return {
        ...state,
        viewing: action.question,
        isLoading: false,
      };
    case SEARCHING_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCHED_QUESTIONS:
      return {
        ...state,
        searched: action.questions,
        isLoading: false,
      };

    default:
      return state;
  }
};
