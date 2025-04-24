// Utilidad para exportar registros a CSV
export function exportToCSV(registros: any[], filename = 'registros_eventos.csv') {
  if (!registros || registros.length === 0) return;
  const header = Object.keys(registros[0]);
  const csvRows = [
    header.join(','),
    ...registros.map(row => header.map(field => `"${(row[field] ?? '').toString().replace(/"/g, '""')}"`).join(','))
  ];
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
