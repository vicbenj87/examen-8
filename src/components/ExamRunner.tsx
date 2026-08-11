import { useEffect, useMemo, useRef, useState } from 'react';
import type { Question } from '../types';
import { questions as allQuestions } from '../data/questions';
import { shuffle } from '../utils/shuffle';
import { checkAnswer, isAnswerComplete } from '../utils/checkAnswer';
import { QUESTION_SECONDS, FEEDBACK_SECONDS } from '../config';
import { sound } from '../utils/sound';
import ExplanationPopup from './ExplanationPopup';
import TimerBar from './TimerBar';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import TrueFalseQuestion from './questions/TrueFalseQuestion';
import FillBlankQuestion from './questions/FillBlankQuestion';
import ShortAnswerQuestion from './questions/ShortAnswerQuestion';
import OrderingQuestion from './questions/OrderingQuestion';
import MatchingQuestion from './questions/MatchingQuestion';
import MapDragDropQuestion from './questions/MapDragDropQuestion';

type Phase = 'explain' | 'answer' | 'feedback';

interface Props {
  onFinish: (score: number, total: number) => void;
}

function defaultAnswer(question: Question): any {
  switch (question.type) {
    case 'multiple':
      return null;
    case 'truefalse':
      return null;
    case 'fill':
      return Array(question.segments.length - 1).fill('');
    case 'short':
      return '';
    case 'order':
      return Array(question.items.length).fill(null);
    case 'match':
      return Array(question.descriptions.length).fill(null);
    case 'map':
      return {};
    default:
      return null;
  }
}

export default function ExamRunner({ onFinish }: Props) {
  const order = useMemo(() => shuffle(allQuestions), []);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('explain');
  const [answer, setAnswer] = useState<any>(() => defaultAnswer(order[0]));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const question = order[index];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Reset per-question state whenever we move to a new question
  useEffect(() => {
    setAnswer(defaultAnswer(question));
    setPhase('explain');
    setTimeLeft(QUESTION_SECONDS);
    setWasCorrect(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Countdown while answering
  useEffect(() => {
    clearTimer();
    if (phase !== 'answer') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          submitAnswer();
          return 0;
        }
        if (t <= 6) sound.tick();
        return t - 1;
      });
    }, 1000);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index]);

  const submitAnswer = () => {
    clearTimer();
    setAnswer((current: any) => {
      const correct = checkAnswer(question, current);
      setWasCorrect(correct);
      if (correct) {
        setScore((s) => s + 1);
        sound.correct();
      } else {
        sound.incorrect();
      }
      setPhase('feedback');
      return current;
    });
  };

  // Track the latest score in a ref so the finish callback always reads the up-to-date value
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Auto-advance after feedback (or finish the exam on the last question)
  useEffect(() => {
    if (phase !== 'feedback') return;
    const t = setTimeout(() => {
      if (index + 1 >= order.length) {
        onFinish(scoreRef.current, order.length);
      } else {
        setIndex((i) => i + 1);
      }
    }, FEEDBACK_SECONDS * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const revealed = phase === 'feedback';
  const complete = isAnswerComplete(question, answer);

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple':
        return <MultipleChoiceQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'truefalse':
        return <TrueFalseQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'fill':
        return <FillBlankQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'short':
        return <ShortAnswerQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'order':
        return <OrderingQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'match':
        return <MatchingQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      case 'map':
        return <MapDragDropQuestion question={question} value={answer} onChange={setAnswer} revealed={revealed} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl animate-fade-in">
      {phase === 'explain' && (
        <ExplanationPopup type={question.type} section={question.section} onDone={() => setPhase('answer')} />
      )}

      <div className="rounded-3xl border border-amber-300/20 bg-white/5 p-6 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl sm:p-8">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
          <span className="rounded-full bg-white/5 px-3 py-1 uppercase tracking-widest text-amber-300/80">
            {question.section}
          </span>
          <span>
            Pregunta {index + 1} / {order.length}
          </span>
        </div>

        {phase !== 'explain' && (
          <div className="mb-5">
            <TimerBar timeLeft={timeLeft} total={QUESTION_SECONDS} />
          </div>
        )}

        <h2 className="mb-5 text-lg font-semibold leading-relaxed text-white sm:text-xl">{question.prompt}</h2>

        <div className={phase === 'explain' ? 'pointer-events-none opacity-30 blur-sm' : ''}>{renderQuestion()}</div>

        {phase === 'answer' && (
          <button
            disabled={!complete}
            onClick={() => {
              sound.click();
              submitAnswer();
            }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirmar respuesta
          </button>
        )}

        {phase === 'feedback' && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
              wasCorrect ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'
            }`}
          >
            <span className="text-xl">{wasCorrect ? '✅' : '❌'}</span>
            <span>
              {wasCorrect ? '¡Correcto! Avanzando a la siguiente pregunta…' : 'Respuesta incorrecta. Revisa la corrección arriba.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
