import type { ShortAnswerQuestion as SAQ } from '../../types';

interface Props {
  question: SAQ;
  value: string;
  onChange: (v: string) => void;
  revealed: boolean;
}

export default function ShortAnswerQuestion({ question, value, onChange, revealed }: Props) {
  return (
    <div className="space-y-3">
      <textarea
        disabled={revealed}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu respuesta, separando cada palabra o frase con una coma…"
        rows={3}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20 disabled:opacity-70"
      />
      {revealed && (
        <p className="rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          Respuesta esperada: <span className="font-semibold">{question.displayAnswer}</span>
        </p>
      )}
    </div>
  );
}
