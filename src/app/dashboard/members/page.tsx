import { query } from '../../../../lib/db';

async function getMemberActivity() {
  // Consumimos la VIEW obligatoria con HAVING y COALESCE
  const res = await query(`SELECT * FROM vw_member_activity ORDER BY total_loans DESC`);
  return res.rows;
}

export default async function MembersPage() {
  const members = await getMemberActivity();
  const topMember = members[0];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Análisis de Actividad de Socios</h1>
        <p className="text-slate-500 italic">Insight: Monitoreo de lealtad y puntualidad de los usuarios de la biblioteca.</p>
      </header>

      {/* KPI Destacado */}
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
        <p className="text-sm text-emerald-700 font-semibold uppercase">Socio más Activo</p>
        <p className="text-2xl font-bold text-emerald-900">
          {topMember ? `${topMember.member_name} (${topMember.total_loans} préstamos)` : 'N/A'}
        </p>
      </div>

      <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Socio</th>
              <th className="p-4 font-semibold text-slate-700 text-center">Total Préstamos</th>
              <th className="p-4 font-semibold text-slate-700 text-center">Devoluciones Tardías</th>
              <th className="p-4 font-semibold text-slate-700 text-center text-red-500">Tasa de Retraso</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m: any) => (
              <tr key={m.member_id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{m.member_name}</td>
                <td className="p-4 text-center">{m.total_loans}</td>
                <td className="p-4 text-center">{m.late_returns}</td>
                <td className="p-4 text-center font-mono">
                  {(m.delay_rate * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}