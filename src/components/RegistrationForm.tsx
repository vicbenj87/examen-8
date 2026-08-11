import { useState } from 'react';
import type { Registration } from '../types';
import { sound } from '../utils/sound';

interface Props {
  onSubmit: (data: Registration) => void;
}

export default function RegistrationForm({ onSubmit }: Props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ibm, setIbm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !ibm.trim()) {
      setError('Por favor completa todos los campos antes de continuar.');
      sound.incorrect();
      return;
    }
    setError('');
    sound.correct();
    onSubmit({ nombre: nombre.trim(), apellido: apellido.trim(), ibm: ibm.trim() });
  };

  return (
    <div className="mx-auto w-full max-w-md animate-fade-in">
      <div className="rounded-3xl border border-amber-300/20 bg-white/5 p-8 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-200 text-2xl shadow-lg shadow-amber-500/30 animate-float-slow">
            🌙
          </div>
          <h1 className="text-2xl font-bold text-white">Era de los Jueces</h1>
          <p className="mt-1 text-sm text-slate-300/80">Examen nocturno interactivo — registro de participante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300/80">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300/80">Apellido</label>
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Tu apellido"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300/80">IBM (identificación)</label>
            <input
              value={ibm}
              onChange={(e) => setIbm(e.target.value)}
              placeholder="Número o código IBM"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20"
            />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:brightness-105 active:scale-[0.98]"
          >
            Registrarme y continuar →
          </button>
        </form>
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Tus datos se usarán únicamente para registrar tu puntaje del examen.
        </p>
      </div>
    </div>
  );
}
