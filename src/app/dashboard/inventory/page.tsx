// app/dashboard/inventory/page.tsx
import { query } from '../../../../lib/db';

export default async function InventoryPage() {
  const { rows: inventory } = await query(`SELECT * FROM vw_inventory_health`);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Estado del Inventario</h1>
      <p className="text-slate-500">Insight: Salud operativa por categoría de libros.</p>

      <div className="overflow-x-auto bg-white rounded-xl border shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Categoría</th>
              <th className="p-4">Disponibles</th>
              <th className="p-4">Prestados</th>
              <th className="p-4">Perdidos</th>
              <th className="p-4">Salud (%)</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row: any) => (
              <tr key={row.book_category} className="border-b">
                <td className="p-4 font-medium">{row.book_category}</td>
                <td className="p-4 text-green-600 font-bold">{row.available}</td>
                <td className="p-4 text-orange-600">{row.on_loan}</td>
                <td className="p-4 text-red-600">{row.lost}</td>
                <td className="p-4">
                   <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${row.health_percentage}%` }}></div>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}