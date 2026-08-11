export type QuestionType =
  | 'multiple'
  | 'truefalse'
  | 'fill'
  | 'short'
  | 'order'
  | 'match'
  | 'map';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  section: string;
  prompt: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple';
  options: { key: string; text: string }[];
  correct: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'truefalse';
  correct: boolean;
  feedback?: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill';
  segments: string[]; // text chunks; blanks live between them
  accepted: string[][]; // acceptable answers per blank
  displayAnswer: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short';
  accepted: string[];
  minMatches: number;
  displayAnswer: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'order';
  items: string[];
  correctOrder: number[]; // rank (1..n) for each item at same index
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'match';
  people: string[];
  descriptions: string[];
  correct: number[]; // index into people[] for each description
}

export interface MapLabel {
  id: string;
  text: string;
}

export interface MapZone {
  id: string;
  x: number; // percentage
  y: number; // percentage
  correctLabel: string; // label id
}

export interface MapQuestion extends BaseQuestion {
  type: 'map';
  labels: MapLabel[];
  zones: MapZone[];
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | ShortAnswerQuestion
  | OrderingQuestion
  | MatchingQuestion
  | MapQuestion;

export interface Registration {
  nombre: string;
  apellido: string;
  ibm: string;
}
