import { GOOGLE_SCRIPT_URL } from '../config';

export interface ResultPayload {
  nombre: string;
  apellido: string;
  ibm: string;
  puntaje: number;
  total: number;
  porcentaje: number;
}

export async function submitResult(payload: ResultPayload): Promise<{ ok: boolean; reason?: string }> {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('REEMPLAZA_CON_TU_ID_DE_DESPLIEGUE')) {
    return { ok: false, reason: 'no-config' };
  }
  try {
    const body = new URLSearchParams({
      nombre: payload.nombre,
      apellido: payload.apellido,
      ibm: payload.ibm,
      puntaje: String(payload.puntaje),
      total: String(payload.total),
      porcentaje: payload.porcentaje.toFixed(2),
    });
    // El Web App de Apps Script no responde con cabeceras CORS habilitadas,
    // por lo que usamos "no-cors": la petición se envía igual, solo no
    // podemos leer la respuesta (la damos por buena si no lanza excepción).
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body,
    });
    return { ok: true };
  } catch (error) {
    console.error('Error enviando a Google Sheets', error);
    return { ok: false, reason: 'network' };
  }
}

export function downloadResultBackup(payload: ResultPayload) {
  const rows = [
    ['nombre', 'apellido', 'ibm', 'puntaje', 'total', 'porcentaje'],
    [
      payload.nombre,
      payload.apellido,
      payload.ibm,
      String(payload.puntaje),
      String(payload.total),
      payload.porcentaje.toFixed(2),
    ],
  ];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resultado-${payload.apellido || 'examen'}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
