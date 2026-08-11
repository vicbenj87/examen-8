import type { OrderingQuestion as OQ } from '../../types';

interface Props {
  question: OQ;
  value: (number | null)[];
  onChange: (v: (number | null)[]) => void;
  revealed: boolean;
}

export default function OrderingQuestion({ question, value, onChange, revealed }: Props) {
  const vals = value.length ? value : Array(question.items.length).fill(null);

  const updateRank = (idx: number, rank: number | null) => {
    const next = [...vals];
    next[idx] = rank;
    onChange(next);
  };

  const usedRanks = new Set(vals.filter((v): v is number => v !== null));

  return (
    <div className="space-y-3">
      {question.items.map((item, idx) => {
        const isCorrectRank = revealed && vals[idx] === question.correctOrder[idx];
        const isWrongRank = revealed && vals[idx] !== question.correctOrder[idx];
        return (
          <div
            key={idx}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-slate-100 ${
              isCorrectRank
                ? 'border-emerald-400/60 bg-emerald-400/10'
                : isWrongRank
                  ? 'border-rose-400/60 bg-rose-400/10'
                  : 'border-white/10 bg-white/5'
            }`}
          >
            <select
              disabled={revealed}
              value={vals[idx] ?? ''}
              onChange={(e) => updateRank(idx, e.target.value ? Number(e.target.value) : null)}
              className="w-16 rounded-lg border border-amber-300/30 bg-slate-900 px-2 py-1.5 text-center text-amber-200 outline-none focus:border-amber-300/70"
            >
              <option value="">–</option>
              {question.items.map((_, r) => (
                <option
                  key={r + 1}
                  value={r + 1}
                  disabled={usedRanks.has(r + 1) && vals[idx] !== r + 1}
                >
                  {r + 1}
                </option>
              ))}
            </select>
            <span className="flex-1">{item}</span>
            {revealed && (
              <span className="shrink-0 text-xs text-slate-400">correcto: {question.correctOrder[idx]}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
