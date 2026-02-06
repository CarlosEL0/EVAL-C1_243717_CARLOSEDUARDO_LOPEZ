export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Resumen General</h1>
      <p className="text-gray-600 mb-8">Bienvenido al sistema de análisis de la biblioteca. Selecciona un reporte para ver detalles.</p>
      
      {/* Grid de KPIs - Aquí irán datos resumidos de tus VIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Préstamos Críticos</h3>
          <p className="text-3xl font-bold text-red-600">12</p>
          <span className="text-xs text-gray-400">Vencidos hace más de 7 días</span>
        </div>
        {/* Agrega más tarjetas para Multas y Disponibilidad */}
      </div>
    </div>
  );
}