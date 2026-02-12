import { getInventoryHealthReport } from '../../../../lib/reports';

export default async function InventoryPage() {
  const data = await getInventoryHealthReport();

  return (
    <div className="report-container">
      <header className="report-header">
        <h1 className="title-main">Salud de Inventario</h1>
        <p className="subtitle-insight">Disponibilidad de ejemplares por categoría.</p>
      </header>

      <div className="kpi-box">
        <p className="kpi-label">Categoría Crítica</p>
        <p className="kpi-value">{data.find((d: any) => d.health_percentage < 100)?.book_category || 'Todas OK'}</p>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>Categoría</th><th style={{ textAlign: 'center' }}>Total</th><th style={{ textAlign: 'center' }}>Salud</th></tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <tr key={i}>
                <td>{item.book_category}</td>
                <td style={{ textAlign: 'center' }}>{item.total_copies}</td>
                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.health_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}