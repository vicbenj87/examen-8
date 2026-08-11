interface TimerBarProps {
  timeLeft: number;
  total: number;
}

export default function TimerBar({ timeLeft, total }: TimerBarProps) {
  const pct = Math.max(0, Math.min(100, (timeLeft / total) * 100));
  const color =
    pct > 60 ? 'from-emerald-400 to-teal-300' : pct > 30 ? 'from-amber-400 to-yellow-300' : 'from-rose-500 to-red-400';

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-300/80">
        <span>⏱ Tiempo restante</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-linear`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
