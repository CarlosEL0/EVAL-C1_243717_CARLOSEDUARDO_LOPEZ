// src/app/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="report-container">
      <h1 className="title-main">Resumen General</h1>
      <p className="subtitle-insight">
        Bienvenido al sistema de análisis de la biblioteca. Selecciona un reporte para ver detalles.
      </p>
      
      {/* Grid de KPIs usando clases nativas y CSS estándar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {/* KPI 1: Préstamos Críticos */}
        <div className="kpi-box">
          <h3 className="kpi-label">Préstamos Críticos</h3>
          <p className="kpi-value" style={{ color: '#dc2626' }}>12</p>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Vencidos hace más de 7 días
          </span>
        </div>

        {/* KPI 2: Multas por Recaudar */}
        <div className="kpi-box">
          <h3 className="kpi-label">Recaudación de Multas</h3>
          <p className="kpi-value">$4,520.00</p>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Total acumulado este mes
          </span>
        </div>

        {/* KPI 3: Salud del Inventario */}
        <div className="kpi-box">
          <h3 className="kpi-label">Disponibilidad General</h3>
          <p className="kpi-value">92%</p>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Ejemplares listos para préstamo
          </span>
        </div>
      </div>
    </div>
  );
}