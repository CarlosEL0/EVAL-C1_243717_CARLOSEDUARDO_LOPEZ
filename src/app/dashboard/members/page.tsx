import { getMemberActivityReport } from '../../../../lib/reports';

export default async function MembersPage() {
  const members = await getMemberActivityReport();

  return (
    <div className="report-container">
      <header className="report-header">
        <h1 className="title-main">Actividad de Socios</h1>
        <p className="subtitle-insight">Seguimiento de puntualidad y uso del sistema.</p>
      </header>

      <div className="kpi-box" style={{ backgroundColor: '#f0fdf4', borderColor: '#22c55e' }}>
        <p className="kpi-label" style={{ color: '#166534' }}>Socio más activo</p>
        <p className="kpi-value" style={{ color: '#14532d' }}>{members[0]?.member_name || 'N/A'}</p>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>Nombre</th><th style={{ textAlign: 'center' }}>Préstamos</th><th style={{ textAlign: 'center' }}>Tasa Atraso</th></tr>
          </thead>
          <tbody>
            {members.map((m: any, i: number) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{m.member_name}</td>
                <td style={{ textAlign: 'center' }}>{m.total_loans}</td>
                <td style={{ textAlign: 'center', fontWeight: 'bold', color: m.delay_rate > 0.3 ? '#dc2626' : '#0f172a' }}>
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