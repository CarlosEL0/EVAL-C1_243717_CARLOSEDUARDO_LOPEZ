// app/dashboard/popular/page.tsx
import { query } from '../../../../lib/db';
import Link from 'next/link';

async function getMostBorrowedBooks(search?: string, page: number = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;
  
  // Consulta parametrizada sobre la VIEW
  let sql = `SELECT * FROM vw_most_borrowed_books`;
  const params: any[] = [];

  if (search) {
    sql += ` WHERE book_title ILIKE $1 OR book_author ILIKE $1`;
    params.push(`%${search}%`);
  }

  sql += ` ORDER BY popularity_rank ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const res = await query(sql, params);
  return res.rows;
}

export default async function PopularBooksPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const search = searchParams.q || '';
  const currentPage = Number(searchParams.page) || 1;
  const books = await getMostBorrowedBooks(search, currentPage);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Ranking de Libros más Prestados</h1>
        <p className="text-slate-500 italic">Insight: Identifica los títulos con mayor demanda para optimizar la adquisición de nuevas copias.</p>
      </header>

      {/* KPI Destacado (Requisito E) */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-blue-700 font-semibold uppercase">Libro Top del Mes</p>
        <p className="text-2xl font-bold text-blue-900">{books[0]?.book_title || 'N/A'}</p>
      </div>

      {/* Buscador (Requisito F) */}
      <form className="flex gap-2">
        <input 
          type="text" 
          name="q" 
          defaultValue={search}
          placeholder="Buscar por título o autor..." 
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-lg">Buscar</button>
      </form>

      {/* Tabla Legible (Requisito E) */}
      <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Rank</th>
              <th className="p-4 font-semibold text-slate-700">Título</th>
              <th className="p-4 font-semibold text-slate-700">Autor</th>
              <th className="p-4 font-semibold text-slate-700 text-center">Total Préstamos</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => (
              <tr key={book.book_id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-bold text-blue-600">#{book.popularity_rank}</td>
                <td className="p-4">{book.book_title}</td>
                <td className="p-4">{book.book_author}</td>
                <td className="p-4 text-center">{book.total_borrows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación Simple (Requisito F) */}
      <div className="flex justify-between items-center">
        <Link 
          href={`/dashboard/popular?q=${search}&page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 border rounded ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        > Anterior </Link>
        <span className="text-sm font-medium">Página {currentPage}</span>
        <Link 
          href={`/dashboard/popular?q=${search}&page=${currentPage + 1}`}
          className="px-4 py-2 border rounded"
        > Siguiente </Link>
      </div>
    </div>
  );
}