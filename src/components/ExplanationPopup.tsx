import { useEffect, useState } from 'react';
import type { QuestionType } from '../types';
import { EXPLANATION_SECONDS } from '../config';
import { sound } from '../utils/sound';

const INSTRUCTIONS: Record<QuestionType, string> = {
  multiple: 'Lee la pregunta y elige la única opción correcta (A, B, C o D). Haz clic sobre la opción y confirma tu respuesta.',
  truefalse: 'Lee la afirmación con atención y decide si es Verdadera o Falsa. Selecciona tu respuesta y confírmala.',
  fill: 'Completa cada espacio en blanco escribiendo la palabra o palabras correctas dentro de los recuadros indicados.',
  short: 'Escribe tu respuesta en el campo de texto. Si son varias palabras o frases, sepáralas usando comas (,).',
  order: 'Asigna un número del 1 al 5 a cada elemento según el orden cronológico correcto, donde 1 es el primer paso.',
  match: 'Selecciona en cada lista desplegable el personaje que corresponde a la descripción indicada.',
  map: 'Toca una etiqueta con el nombre de la región y luego toca el punto del mapa donde corresponde ubicarla.',
};

const TITLES: Record<QuestionType, string> = {
  multiple: 'Selección Múltiple',
  truefalse: 'Verdadero o Falso',
  fill: 'Completar el Texto',
  short: 'Respuesta Corta',
  order: 'Ordenar Secuencia',
  match: 'Emparejamiento',
  map: 'Ubicación en el Mapa',
};

interface ExplanationPopupProps {
  type: QuestionType;
  section: string;
  onDone: () => void;
}

export default function ExplanationPopup({ type, section, onDone }: ExplanationPopupProps) {
  const [secondsLeft, setSecondsLeft] = useState(EXPLANATION_SECONDS);

  useEffect(() => {
    sound.popup();
    setSecondsLeft(EXPLANATION_SECONDS);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onDone();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, section]);

  const pct = (secondsLeft / EXPLANATION_SECONDS) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-300/20 bg-gradient-to-br from-indigo-950/90 via-slate-900/90 to-purple-950/90 p-8 shadow-2xl shadow-indigo-900/50">
        <div className="mb-5 flex items-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - pct / 100)}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-lg font-bold text-amber-200">{secondsLeft}</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300/80">{section}</p>
            <h3 className="text-xl font-semibold text-white">{TITLES[type]}</h3>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-slate-200/90">{INSTRUCTIONS[type]}</p>

        <button
          onClick={() => {
            sound.click();
            onDone();
          }}
          className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:brightness-105 active:scale-[0.98]"
        >
          Entendido, comenzar ahora →
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Esta explicación se cerrará automáticamente en {secondsLeft}s
        </p>
      </div>
    </div>
  );
}
