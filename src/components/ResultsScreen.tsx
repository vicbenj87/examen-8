import { useEffect, useState } from 'react';
import type { Registration } from '../types';
import { submitResult, downloadResultBackup } from '../utils/sheetSubmit';
import { sound } from '../utils/sound';

interface Props {
  registration: Registration;
  score: number;
  total: number;
  onRestart: () => void;
}

type SubmitState = 'sending' | 'sent' | 'error';

export default function ResultsScreen({ registration, score, total, onRestart }: Props) {
  const [status, setStatus] = useState<SubmitState>('sending');
  const porcentaje = (score / total) * 100;

  const payload = {
    nombre: registration.nombre,
    apellido: registration.apellido,
    ibm: registration.ibm,
    puntaje: score,
    total,
    porcentaje,
  };

  useEffect(() => {
    sound.stopAmbient();
    sound.complete();
    let cancelled = false;
    (async () => {
      const result = await submitResult(payload);
      if (cancelled) return;
      setStatus(result.ok ? 'sent' : 'error');
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tier =
    porcentaje >= 90
      ? { label: '¡Excelente!', color: 'from-emerald-400 to-teal-300', emoji: '🏆' }
      : porcentaje >= 70
        ? { label: '¡Muy bien!', color: 'from-amber-400 to-yellow-300', emoji: '⭐' }
        : porcentaje >= 50
          ? { label: 'Aprobado', color: 'from-sky-400 to-indigo-300', emoji: '📘' }
          : { label: 'Sigue practicando', color: 'from-rose-400 to-orange-300', emoji: '🌙' };

  const circumference = 2 * Math.PI * 54;
  const dashoffset = circumference * (1 - porcentaje / 100);

  return (
    <div className="mx-auto w-full max-w-lg animate-fade-in">
      <div className="rounded-3xl border border-amber-300/20 bg-white/5 p-8 text-center shadow-2xl shadow-indigo-950/60 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-amber-300/80">Resultado final</p>
        <h1 className="mt-1 text-2xl font-bold text-white">
          {tier.emoji} {tier.label}
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          {registration.nombre} {registration.apellido}
        </p>

        <div className="relative mx-auto my-6 flex h-40 w-40 items-center justify-center">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#resultGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-white">{porcentaje.toFixed(0)}%</span>
            <span className="text-xs text-slate-400">
              {score} / {total} correctas
            </span>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-white/5 px-4 py-3 text-sm">
          {status === 'sending' && <p className="text-slate-300">📡 Enviando resultados a la hoja de cálculo…</p>}
          {status === 'sent' && <p className="text-emerald-300">✅ Resultado registrado correctamente en Google Sheets.</p>}
          {status === 'error' && (
            <div className="space-y-2 text-amber-300">
              <p>⚠️ No se pudo enviar automáticamente (configura el Apps Script en src/config.ts).</p>
              <button
                onClick={() => downloadResultBackup(payload)}
                className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-300/20"
              >
                Descargar respaldo en CSV
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            sound.click();
            onRestart();
          }}
          className={`w-full rounded-xl bg-gradient-to-r ${tier.color} px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:brightness-105 active:scale-[0.98]`}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
