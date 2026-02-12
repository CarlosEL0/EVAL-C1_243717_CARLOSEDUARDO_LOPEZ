import { getPopularBooksReport } from '../../../../lib/reports'; // Importamos la función, NO el SQL
import Link from 'next/link';

export default async function PopularBooksPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const search = params.q || '';
  const page = Number(params.page) || 1;

  // Llamada limpia a la capa de datos
  const books = await getPopularBooksReport(search, page);

  return (
    <div className="report-container">
      <header className="report-header">
        <h1 className="title-main">Ranking de Popularidad</h1>
        <p className="subtitle-insight">Reporte analítico de los títulos con mayor demanda.</p>
      </header>

      <div className="kpi-box">
        <p className="kpi-label">Libro más solicitado</p>
        <p className="kpi-value">{books[0]?.book_title || 'N/A'}</p>
      </div>

      <form className="filter-group">
        <input type="text" name="q" defaultValue={search} className="input-text" placeholder="Buscar libro..." />
        <button type="submit" className="btn-action">Buscar</button>
      </form>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>Rank</th><th>Título</th><th>Autor</th><th style={{ textAlign: 'center' }}>Total</th></tr>
          </thead>
          <tbody>
            {books.map((b: any) => (
              <tr key={b.book_id}>
                <td style={{ color: '#2563eb', fontWeight: 'bold' }}>#{b.popularity_rank}</td>
                <td>{b.book_title}</td>
                <td>{b.book_author}</td>
                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{b.total_borrows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}