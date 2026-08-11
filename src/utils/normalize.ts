export function normalize(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

export function fuzzyMatch(userText: string, accepted: string): boolean {
  const a = normalize(userText);
  const b = normalize(accepted);
  if (!a) return false;
  return a === b || a.includes(b) || b.includes(a);
}
