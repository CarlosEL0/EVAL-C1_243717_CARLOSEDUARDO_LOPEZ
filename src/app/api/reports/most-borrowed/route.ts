import { NextResponse } from 'next/server';
import { query } from '@/'
import { z } from 'zod';

// Esquema de validación para cumplir con el Hito F de la rúbrica
const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, search } = QuerySchema.parse(Object.fromEntries(searchParams));
    
    const offset = (page - 1) * limit;
    
    // Consulta parametrizada sobre la VIEW para evitar Inyección SQL
    let sql = `SELECT * FROM vw_most_borrowed_books`;
    const params: any[] = [];

    if (search) {
      sql += ` WHERE book_title ILIKE $1 OR book_author ILIKE $1`;
      params.push(`%${search}%`);
    }

    sql += ` ORDER BY popularity_rank ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(sql, params);
    
    return NextResponse.json({
      data: result.rows,
      page,
      limit
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el reporte' }, { status: 400 });
  }
}