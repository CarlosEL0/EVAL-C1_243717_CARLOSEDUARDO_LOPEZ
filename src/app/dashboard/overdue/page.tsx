// app/dashboard/overdue/page.tsx
import { query } from '../../../../lib/db';

async function getOverdueLoans(minDays: number = 0, page: number = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;
  const res = await query(
    `SELECT * FROM vw_overdue_loans WHERE days_late >= $1 LIMIT $2 OFFSET $3`,
    [minDays, limit, offset]
  );
  return res.rows;
}

export default async function OverduePage({ searchParams }: { searchParams: { days?: string; page?: string } }) {
  const minDays = Number(searchParams.days) || 0;
  const currentPage = Number(searchParams.page) || 1;
  const loans = await getOverdueLoans(minDays, currentPage);
  const totalFine = loans.reduce((acc, loan) => acc + Number(loan.estimated_fine), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Préstamos Vencidos</h1>
      <p className="text-slate-500 italic">Insight: Monitoreo de morosidad y proyección de recaudación por multas.</p>
      
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-orange-700 font-bold uppercase">Multas Estimadas en esta vista</p>
        <p className="text-2xl font-bold text-orange-900">${totalFine.toFixed(2)}</p>
      </div>

      <form className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <label className="text-sm font-medium">Mínimo días de atraso:</label>
        <input type="number" name="days" defaultValue={minDays} className="border p-2 rounded w-24" />
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Filtrar</button>
      </form>

      {/* Tabla similar a la anterior con campos: Miembro, Libro, Días de Atraso y Multa */}
    </div>
  );
}