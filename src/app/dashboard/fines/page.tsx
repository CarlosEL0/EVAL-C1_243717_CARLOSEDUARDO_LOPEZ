import { getFinesSummaryReport } from '../../../../lib/reports';

export default async function FinesPage() {
  const fines = await getFinesSummaryReport();
  const topMonth = fines[0];

  return (
    <div className="report-container">
      <header className="report-header">
        <h1 className="title-main">Resumen de Multas</h1>
        <p className="subtitle-insight">Recaudación mensual y eficiencia de cobro.</p>
      </header>

      <div className="kpi-box">
        <p className="kpi-label">Mes con mayor ingreso</p>
        <p className="kpi-value">{topMonth ? `${topMonth.report_month}: $${topMonth.total_amount}` : 'N/A'}</p>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>Mes</th><th style={{ textAlign: 'right' }}>Total</th><th style={{ textAlign: 'center' }}>Recuperación</th></tr>
          </thead>
          <tbody>
            {fines.map((f: any, i: number) => (
              <tr key={i}>
                <td>{f.report_month}</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>${f.total_amount}</td>
                <td style={{ textAlign: 'center' }}>{f.recovery_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}