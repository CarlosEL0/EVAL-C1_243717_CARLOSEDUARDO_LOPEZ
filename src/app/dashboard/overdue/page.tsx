import { getOverdueLoansReport } from '../../../../lib/reports';

export default async function OverduePage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const params = await searchParams;
  const minDays = Number(params.days) || 0;

  // Solo llamamos a la función
  const loans = await getOverdueLoansReport(minDays);

  return (
    <div className="report-container">
      <header className="report-header">
        <h1 className="title-main">Préstamos Vencidos</h1>
        <p className="subtitle-insight">Monitoreo de morosidad y cálculo automático de multas.</p>
      </header>

      <div className="kpi-box" style={{ borderColor: '#f59e0b', backgroundColor: '#fffbeb' }}>
        <p className="kpi-label" style={{ color: '#d97706' }}>Multas Estimadas Totales</p>
        <p className="kpi-value" style={{ color: '#92400e' }}>
          ${loans.reduce((acc: number, l: any) => acc + Number(l.estimated_fine), 0).toFixed(2)}
        </p>
      </div>

      <form className="filter-group">
        <input type="number" name="days" defaultValue={minDays} className="input-text" placeholder="Días mínimos..." />
        <button type="submit" className="btn-action">Filtrar</button>
      </form>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>Socio</th><th>Libro</th><th style={{ textAlign: 'center' }}>Días</th><th style={{ textAlign: 'right' }}>Multa</th></tr>
          </thead>
          <tbody>
            {loans.map((l: any, i: number) => (
              <tr key={i}>
                <td>{l.member_name}</td>
                <td>{l.book_title}</td>
                <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 'bold' }}>{l.days_late}</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${l.estimated_fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}