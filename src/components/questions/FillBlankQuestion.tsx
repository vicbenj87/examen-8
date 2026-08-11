import type { FillBlankQuestion as FBQ } from '../../types';

interface Props {
  question: FBQ;
  value: string[];
  onChange: (v: string[]) => void;
  revealed: boolean;
}

export default function FillBlankQuestion({ question, value, onChange, revealed }: Props) {
  const blanksCount = question.segments.length - 1;
  const vals = value.length ? value : Array(blanksCount).fill('');

  const updateBlank = (idx: number, text: string) => {
    const next = [...vals];
    next[idx] = text;
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <p className="flex flex-wrap items-center gap-2 text-base leading-loose text-slate-100">
        {question.segments.map((seg, i) => (
          <span key={i} className="flex flex-wrap items-center gap-2">
            <span>{seg}</span>
            {i < blanksCount && (
              <input
                disabled={revealed}
                value={vals[i] ?? ''}
                onChange={(e) => updateBlank(i, e.target.value)}
                placeholder="…"
                className="w-40 rounded-lg border border-amber-300/30 bg-white/5 px-3 py-1.5 text-center text-amber-200 outline-none focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/20 disabled:opacity-70"
              />
            )}
          </span>
        ))}
      </p>
      {revealed && (
        <p className="rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          Respuesta correcta: <span className="font-semibold">{question.displayAnswer}</span>
        </p>
      )}
    </div>
  );
}
