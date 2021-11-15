import { combineReducers, createStore, Store } from 'redux';
import { questionsReducer, QuestionsState } from './questions/QuestionReducer';

export interface AppState {
  questions: QuestionsState;
}

export const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export const configureState = (): Store<AppState> => {
  return createStore(rootReducer, undefined);
};
