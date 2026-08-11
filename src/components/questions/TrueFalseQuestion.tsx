import type { TrueFalseQuestion as TFQ } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  question: TFQ;
  value: boolean | null;
  onChange: (v: boolean) => void;
  revealed: boolean;
}

export default function TrueFalseQuestion({ question, value, onChange, revealed }: Props) {
  const options: { label: string; val: boolean; icon: string }[] = [
    { label: 'Verdadero', val: true, icon: '✔' },
    { label: 'Falso', val: false, icon: '✘' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => {
        const isSelected = value === opt.val;
        const isCorrectOpt = question.correct === opt.val;
        let style = 'border-white/10 bg-white/5 hover:bg-white/10';
        if (revealed) {
          if (isCorrectOpt) style = 'border-emerald-400/70 bg-emerald-400/10';
          else if (isSelected && !isCorrectOpt) style = 'border-rose-400/70 bg-rose-400/10';
        } else if (isSelected) {
          style = 'border-amber-300/70 bg-amber-300/10';
        }
        return (
          <button
            key={opt.label}
            disabled={revealed}
            onClick={() => {
              sound.click();
              onChange(opt.val);
            }}
            className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-6 text-sm font-semibold text-slate-100 transition ${style}`}
          >
            <span className="text-2xl">{opt.icon}</span>
            {opt.label}
          </button>
        );
      })}
      {revealed && question.feedback && (
        <p className="col-span-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-slate-300">{question.feedback}</p>
      )}
    </div>
  );
}
