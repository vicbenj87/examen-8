import type { Question } from '../types';
import { fuzzyMatch, normalize } from './normalize';

export type AnswerValue =
  | string // multiple
  | boolean // truefalse
  | string[] // fill (per blank)
  | string // short (comma separated raw text)
  | number[] // order (rank per item) OR match (person index per description)
  | Record<string, string>; // map (zoneId -> labelId)

export function isAnswerComplete(question: Question, value: any): boolean {
  switch (question.type) {
    case 'multiple':
      return typeof value === 'string' && value.length > 0;
    case 'truefalse':
      return typeof value === 'boolean';
    case 'fill':
      return Array.isArray(value) && value.length === question.segments.length - 1 && value.every((v) => (v ?? '').trim().length > 0);
    case 'short':
      return typeof value === 'string' && value.trim().length > 0;
    case 'order':
      return Array.isArray(value) && value.length === question.items.length && new Set(value).size === question.items.length;
    case 'match':
      return Array.isArray(value) && value.length === question.descriptions.length && value.every((v) => v !== null && v !== undefined);
    case 'map':
      return (
        value &&
        typeof value === 'object' &&
        question.zones.every((z) => !!(value as Record<string, string>)[z.id])
      );
    default:
      return false;
  }
}

export function checkAnswer(question: Question, value: any): boolean {
  switch (question.type) {
    case 'multiple':
      return value === question.correct;
    case 'truefalse':
      return value === question.correct;
    case 'fill': {
      if (!Array.isArray(value)) return false;
      return question.accepted.every((acceptedList, i) => acceptedList.some((a) => fuzzyMatch(value[i] ?? '', a)));
    }
    case 'short': {
      if (typeof value !== 'string') return false;
      const tokens = value
        .split(',')
        .map((t) => normalize(t))
        .filter(Boolean);
      const matched = question.accepted.filter((acceptedAnswer) =>
        tokens.some((t) => fuzzyMatch(t, acceptedAnswer)),
      );
      return matched.length >= question.minMatches;
    }
    case 'order': {
      if (!Array.isArray(value)) return false;
      return question.correctOrder.every((rank, i) => value[i] === rank);
    }
    case 'match': {
      if (!Array.isArray(value)) return false;
      return question.correct.every((personIdx, i) => value[i] === personIdx);
    }
    case 'map': {
      if (!value || typeof value !== 'object') return false;
      const placements = value as Record<string, string>;
      return question.zones.every((z) => placements[z.id] === z.correctLabel);
    }
    default:
      return false;
  }
}
