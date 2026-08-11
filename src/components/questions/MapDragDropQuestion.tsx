import { useState } from 'react';
import type { MapQuestion as MQ } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  question: MQ;
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
  revealed: boolean;
}

export default function MapDragDropQuestion({ question, value, onChange, revealed }: Props) {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const placedLabelIds = new Set(Object.values(value));
  const remainingLabels = question.labels.filter((l) => !placedLabelIds.has(l.id));

  const placeLabel = (zoneId: string, labelId: string) => {
    // remove label from any previous zone
    const next: Record<string, string> = {};
    Object.entries(value).forEach(([z, l]) => {
      if (l !== labelId) next[z] = l;
    });
    next[zoneId] = labelId;
    onChange(next);
    setSelectedLabel(null);
  };

  const clearZone = (zoneId: string) => {
    const next = { ...value };
    delete next[zoneId];
    onChange(next);
  };

  const handleZoneClick = (zoneId: string) => {
    if (revealed) return;
    if (selectedLabel) {
      sound.click();
      placeLabel(zoneId, selectedLabel);
    } else if (value[zoneId]) {
      clearZone(zoneId);
    }
  };

  const handleDrop = (zoneId: string, e: React.DragEvent) => {
    e.preventDefault();
    if (revealed) return;
    const labelId = e.dataTransfer.getData('text/plain');
    if (labelId) placeLabel(zoneId, labelId);
  };

  return (
    <div className="space-y-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-amber-300/20 bg-cover bg-center shadow-inner"
        style={{
          backgroundImage: "url('/images/ancient-map.jpg')",
          aspectRatio: '4 / 3',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/40" />
        {question.zones.map((zone) => {
          const placedLabelId = value[zone.id];
          const placedLabel = question.labels.find((l) => l.id === placedLabelId);
          const isCorrectZone = revealed && placedLabelId === zone.correctLabel;
          const isWrongZone = revealed && placedLabelId && placedLabelId !== zone.correctLabel;
          const correctLabelText = question.labels.find((l) => l.id === zone.correctLabel)?.text;

          return (
            <button
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(zone.id, e)}
              className={`absolute flex min-w-[86px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 px-3 py-2 text-[11px] font-semibold shadow-lg backdrop-blur-sm transition ${
                isCorrectZone
                  ? 'border-emerald-400 bg-emerald-400/20 text-emerald-100'
                  : isWrongZone
                    ? 'border-rose-400 bg-rose-400/20 text-rose-100'
                    : placedLabel
                      ? 'border-amber-300 bg-amber-300/20 text-amber-100'
                      : 'border-dashed border-white/60 bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              {placedLabel ? placedLabel.text : '●'}
              {revealed && !isCorrectZone && (
                <span className="mt-0.5 text-[10px] font-normal text-slate-200">({correctLabelText})</span>
              )}
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">Regiones disponibles</p>
        <div className="flex flex-wrap gap-2">
          {remainingLabels.length === 0 && (
            <span className="text-xs text-slate-500">Todas las regiones han sido ubicadas.</span>
          )}
          {remainingLabels.map((label) => (
            <button
              key={label.id}
              draggable={!revealed}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', label.id)}
              disabled={revealed}
              onClick={() => {
                sound.click();
                setSelectedLabel(selectedLabel === label.id ? null : label.id);
              }}
              className={`cursor-grab rounded-full border px-4 py-2 text-xs font-semibold transition active:cursor-grabbing ${
                selectedLabel === label.id
                  ? 'border-amber-300 bg-amber-300/30 text-amber-100'
                  : 'border-white/20 bg-white/5 text-slate-100 hover:bg-white/10'
              }`}
            >
              {label.text}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Toca una etiqueta y luego toca el mapa, o arrástrala directamente sobre el punto correcto.
        </p>
      </div>
    </div>
  );
}
