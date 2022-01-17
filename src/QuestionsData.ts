import { getAccessToken } from './Auth';
import { http } from './http';

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  createdAt: Date;
  answers: AnswerData[];
}

export interface QuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
  answers: AnswerDataFromServer[];
}

export function mapToQuestionData(questionDataFromServer: QuestionDataFromServer): QuestionData {
  const question: QuestionData = {
    ...questionDataFromServer,
    createdAt: new Date(questionDataFromServer.createdAt),
    answers: questionDataFromServer.answers?.map(mapToAnswerData) || [],
  };
  return question;
}

export function mapToAnswerData(answerDataFromServer: AnswerDataFromServer): AnswerData {
  return {
    ...answerDataFromServer,
    createdAt: new Date(answerDataFromServer.createdAt),
  };
}

export interface AnswerData {
  answerId: number;
  content: string;
  username: string;
  createdAt: Date;
}

export interface AnswerDataFromServer {
  answerId: number;
  content: string;
  username: string;
  createdAt: string;
}

export const getUnAnsweredQuestions = async (): Promise<QuestionData[]> => {
  const response = await http<QuestionDataFromServer[]>({ path: 'Questions/unanswered' });
  if (response.ok && response.body) return response.body.map(mapToQuestionData);
  else return [];
};

export const getQuestion = async (id: number): Promise<QuestionData | null> => {
  const response = await http<QuestionDataFromServer>({ path: 'questions/' + id });
  if (response.ok && response.body) return mapToQuestionData(response.body);
  return null;
};

export const searchQuestions = async (searchTerm: string): Promise<QuestionData[]> => {
  const response = await http<QuestionDataFromServer[]>({ path: `questions?search=${searchTerm}` });
  if (response.ok && response.body) return response.body.map(mapToQuestionData);
  else return [];
};

interface ICreateQuestionDataDto {
  title: string;
  content: string;
}

export const createQuestion = async (
  questionDto: ICreateQuestionDataDto,
): Promise<QuestionData | null> => {
  var accessToken = await getAccessToken();
  var response = await http<QuestionDataFromServer, ICreateQuestionDataDto>({
    path: 'questions',
    method: 'post',
    body: questionDto,
    accessToken,
  });

  if (response.ok && response.body) return mapToQuestionData(response.body);
  return null;
};

interface ICreateAnswerDataDto {
  questionId: number;
  content: string;
}

export const createAnswer = async (answerDto: ICreateAnswerDataDto): Promise<AnswerData | null> => {
  const accessToken = await getAccessToken();
  const response = await http<AnswerDataFromServer, ICreateAnswerDataDto>({
    path: `questions/${answerDto.questionId}/answers`,
    method: 'post',
    body: answerDto,
    accessToken,
  });

  if (response.ok && response.body) return mapToAnswerData(response.body);
  else return null;
};
