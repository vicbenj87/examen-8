import type { MultipleChoiceQuestion as MCQ } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  question: MCQ;
  value: string | null;
  onChange: (v: string) => void;
  revealed: boolean;
}

export default function MultipleChoiceQuestion({ question, value, onChange, revealed }: Props) {
  return (
    <div className="space-y-3">
      {question.options.map((opt) => {
        const isSelected = value === opt.key;
        const isCorrectOpt = opt.key === question.correct;
        let style = 'border-white/10 bg-white/5 hover:bg-white/10';
        if (revealed) {
          if (isCorrectOpt) style = 'border-emerald-400/70 bg-emerald-400/10';
          else if (isSelected && !isCorrectOpt) style = 'border-rose-400/70 bg-rose-400/10';
        } else if (isSelected) {
          style = 'border-amber-300/70 bg-amber-300/10';
        }
        return (
          <button
            key={opt.key}
            disabled={revealed}
            onClick={() => {
              sound.click();
              onChange(opt.key);
            }}
            className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm text-slate-100 transition ${style}`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold uppercase text-slate-200">
              {opt.key}
            </span>
            <span>{opt.text}</span>
          </button>
        );
      })}
    </div>
  );
}
