import type { MatchingQuestion as MQ } from '../../types';

interface Props {
  question: MQ;
  value: (number | null)[];
  onChange: (v: (number | null)[]) => void;
  revealed: boolean;
}

export default function MatchingQuestion({ question, value, onChange, revealed }: Props) {
  const vals = value.length ? value : Array(question.descriptions.length).fill(null);

  const updateMatch = (idx: number, personIdx: number | null) => {
    const next = [...vals];
    next[idx] = personIdx;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {question.descriptions.map((desc, idx) => {
        const isCorrect = revealed && vals[idx] === question.correct[idx];
        const isWrong = revealed && vals[idx] !== question.correct[idx];
        return (
          <div
            key={idx}
            className={`flex flex-col gap-2 rounded-xl border px-4 py-3 text-sm text-slate-100 sm:flex-row sm:items-center sm:justify-between ${
              isCorrect
                ? 'border-emerald-400/60 bg-emerald-400/10'
                : isWrong
                  ? 'border-rose-400/60 bg-rose-400/10'
                  : 'border-white/10 bg-white/5'
            }`}
          >
            <span className="flex-1">{desc}</span>
            <select
              disabled={revealed}
              value={vals[idx] ?? ''}
              onChange={(e) => updateMatch(idx, e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-lg border border-amber-300/30 bg-slate-900 px-3 py-1.5 text-amber-200 outline-none focus:border-amber-300/70 sm:w-48"
            >
              <option value="">Selecciona…</option>
              {question.people.map((p, i) => (
                <option key={i} value={i}>
                  {p}
                </option>
              ))}
            </select>
            {revealed && (
              <span className="shrink-0 text-xs text-slate-400">
                correcto: {question.people[question.correct[idx]]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
