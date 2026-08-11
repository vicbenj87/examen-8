import { useState } from 'react';
import type { Registration } from './types';
import StarField from './components/StarField';
import RegistrationForm from './components/RegistrationForm';
import IntroScreen from './components/IntroScreen';
import ExamRunner from './components/ExamRunner';
import ResultsScreen from './components/ResultsScreen';
import { sound } from './utils/sound';

type Stage = 'register' | 'intro' | 'exam' | 'results';

export default function App() {
  const [stage, setStage] = useState<Stage>('register');
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    sound.setMuted(next);
  };

  const handleRestart = () => {
    setStage('register');
    setRegistration(null);
    setFinalScore(0);
    setFinalTotal(0);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <StarField />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-200/90">
          <span className="text-xl">🕎</span>
          <span>Examen Nocturno · Era de los Jueces</span>
        </div>
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-md transition hover:bg-white/10"
        >
          {muted ? '🔇 Sonido apagado' : '🔊 Sonido activo'}
        </button>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 pb-16">
        {stage === 'register' && (
          <RegistrationForm
            onSubmit={(data) => {
              setRegistration(data);
              setStage('intro');
            }}
          />
        )}

        {stage === 'intro' && registration && (
          <IntroScreen registration={registration} onStart={() => setStage('exam')} />
        )}

        {stage === 'exam' && (
          <ExamRunner
            onFinish={(score, total) => {
              setFinalScore(score);
              setFinalTotal(total);
              setStage('results');
            }}
          />
        )}

        {stage === 'results' && registration && (
          <ResultsScreen registration={registration} score={finalScore} total={finalTotal} onRestart={handleRestart} />
        )}
      </main>

      <footer className="relative z-10 pb-6 text-center text-[11px] text-slate-500">
        Diseñado para el estudio de la Era de los Jueces · Tema nocturno 🌌
      </footer>
    </div>
  );
}
