export function formatStudentId(raw: string): string {
  if (!raw) return '';

  let value = raw.toUpperCase();

  if (value.length === 1) {
    value = value.replace(/[^A-Z]/g, '');
  } else if (value.length > 1) {
    value = value[0].replace(/[^A-Z]/g, '') + value.slice(1).replace(/[^0-9]/g, '');
  }

  return value.slice(0, 7);
}

export function validateStudentId(id: string): boolean {
  return /^[A-Z][0-9]{6}$/.test(id);
}
