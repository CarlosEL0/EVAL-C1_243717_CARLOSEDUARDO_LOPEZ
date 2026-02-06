// app/dashboard/fines/page.tsx
import { query } from '../../../../lib/db';

async function getFinesSummary() {
  // En este reporte la VIEW ya agrupa por mes
  const res = await query(`SELECT * FROM vw_fines_summary ORDER BY report_month DESC`);
  return res.rows;
}

export default async function FinesPage() {
  const fines = await getFinesSummary();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Resumen Mensual de Multas</h1>
      <p className="text-slate-500">Insight: Análisis de recuperación de cartera vencida[cite: 13, 39].</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fines.map((item: any) => (
          <div key={item.report_month} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-slate-700">{item.report_month}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {item.recovery_rate}% Recuperado
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">${item.total_amount}</p>
            <p className="text-sm text-slate-400">{item.paid_count} multas liquidadas</p>
          </div>
        ))}
      </div>
    </div>
  );
}