// src/lib/reports.ts
import { query } from './db';

// 1. Reporte de Libros Populares
export async function getPopularBooksReport(search: string = '', page: number = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;
  const res = await query(
    'SELECT * FROM vw_most_borrowed_books WHERE book_title ILIKE $1 LIMIT $2 OFFSET $3',
    [`%${search}%`, limit, offset]
  );
  return res.rows;
}

// 2. Reporte de Préstamos Vencidos
export async function getOverdueLoansReport(minDays: number = 0) {
  const res = await query(
    'SELECT * FROM vw_overdue_loans WHERE days_late >= $1 ORDER BY days_late DESC',
    [minDays]
  );
  return res.rows;
}

// 3. Reporte de Resumen de Multas
export async function getFinesSummaryReport() {
  const res = await query('SELECT * FROM vw_fines_summary', []);
  return res.rows;
}

// 4. Reporte de Actividad de Socios
export async function getMemberActivityReport() {
  const res = await query('SELECT * FROM vw_member_activity ORDER BY total_loans DESC', []);
  return res.rows;
}

// 5. Reporte de Salud de Inventario
export async function getInventoryHealthReport() {
  const res = await query('SELECT * FROM vw_inventory_health', []);
  return res.rows;
}