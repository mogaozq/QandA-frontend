export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  username: string;
  createdAt: Date;
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  username: string;
  createdAt: Date;
}

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    username: 'Bob',
    createdAt: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        username: 'Jane',
        createdAt: new Date(),
      },
      {
        answerId: 2,
        content: 'So, that you can use the JavaScript features of tomorrow, today',
        username: 'Fred',
        createdAt: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
    username: 'Bob',
    createdAt: new Date(),
    answers: [],
  },
];

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getUnAnsweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

export const getQuestion = async (id: number): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === id);
  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (searchTerm: string): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0,
  );
};

interface ICreateQuestionDataDto {
  title: string;
  content: string;
  username: string;
  createdAt: Date;
}

export const createQuestion = async (
  questionDto: ICreateQuestionDataDto,
): Promise<QuestionData | null> => {
  await wait(500);

  const newQuestionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...questionDto,
    questionId: newQuestionId,
    answers: [],
  };

  questions.push(newQuestion);
  return newQuestion;
};

interface ICreateAnswerDataDto {
  questionId: number;
  content: string;
  username: string;
  createdAt: Date;
}

export const createAnswer = async (answerDto: ICreateAnswerDataDto): Promise<AnswerData | null> => {
  await wait(500);
  const question = questions.filter((q) => q.questionId === answerDto.questionId)[0];
  if (!question) return null;

  const newAnswer: AnswerData = {
    ...answerDto,
    answerId: 99,
  };
  question.answers.push(newAnswer);

  return newAnswer;
};
