import type { Registration } from '../types';
import { TOTAL_QUESTIONS } from '../data/questions';
import { EXPLANATION_SECONDS, QUESTION_SECONDS } from '../config';
import { sound } from '../utils/sound';

interface Props {
  registration: Registration;
  onStart: () => void;
}

export default function IntroScreen({ registration, onStart }: Props) {
  return (
    <div className="mx-auto w-full max-w-xl animate-fade-in">
      <div className="rounded-3xl border border-amber-300/20 bg-white/5 p-8 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-amber-300/80">Bienvenido/a, {registration.nombre}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">Examen: La Era de los Jueces</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
          Este examen contiene <strong className="text-amber-300">{TOTAL_QUESTIONS} preguntas</strong> de distintos
          tipos: selección múltiple, verdadero/falso, completar texto, respuesta corta, ordenar secuencias,
          emparejamiento y ubicación en el mapa.
        </p>

        <ul className="mt-5 space-y-3 text-sm text-slate-200">
          <li className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
            <span>🔀</span>
            <span>Las preguntas aparecerán en <strong>orden aleatorio</strong> en cada intento.</span>
          </li>
          <li className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
            <span>💡</span>
            <span>
              Antes de cada pregunta verás una <strong>explicación de {EXPLANATION_SECONDS} segundos</strong> sobre
              cómo resolverla.
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
            <span>⏱</span>
            <span>
              Tendrás <strong>{QUESTION_SECONDS} segundos</strong> por pregunta, con una barra de tiempo visible.
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
            <span>➡️</span>
            <span>Al responder, verás la respuesta correcta y avanzarás automáticamente.</span>
          </li>
          <li className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
            <span>📊</span>
            <span>Al finalizar, tu puntaje se registrará automáticamente en la hoja de cálculo del examen.</span>
          </li>
        </ul>

        <button
          onClick={() => {
            sound.startAmbient();
            sound.click();
            onStart();
          }}
          className="mt-7 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:brightness-105 active:scale-[0.98]"
        >
          Comenzar examen 🌟
        </button>
      </div>
    </div>
  );
}
