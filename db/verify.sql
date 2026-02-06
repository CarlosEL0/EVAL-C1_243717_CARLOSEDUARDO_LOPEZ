-- ======================================================
-- PRUEBAS DE VERIFICACIÓN DE VISTAS ANALÍTICAS
-- ======================================================

-- 1. Verificar Ranking de Libros (Window Functions)
-- Objetivo: Comprobar que el RANK() se calcula correctamente por popularidad.
SELECT * FROM vw_most_borrowed_books 
ORDER BY popularity_rank ASC 
LIMIT 5;

-- 2. Verificar Morosidad (CTE + CASE)
-- Objetivo: Ver préstamos con más de 7 días de atraso y su multa proyectada.
SELECT member_name, book_title, days_late, estimated_fine 
FROM vw_overdue_loans 
WHERE days_late > 7;

-- 3. Verificar Resumen de Multas (HAVING)
-- Objetivo: Comprobar la tasa de recuperación mensual.
SELECT report_month, total_amount, recovery_rate 
FROM vw_fines_summary;

-- 4. Verificar Actividad de Socios (HAVING + COALESCE)
-- Objetivo: Identificar socios con mayor índice de puntualidad.
SELECT member_name, total_loans, delay_rate 
FROM vw_member_activity 
ORDER BY delay_rate ASC;

-- 5. Verificar Salud de Inventario (CASE/COALESCE)
-- Objetivo: Comprobar disponibilidad por categoría.
SELECT book_category, total_copies, health_percentage 
FROM vw_inventory_health 
WHERE health_percentage < 100;

-- ======================================================
-- PRUEBA DE SEGURIDAD (Para ejecución manual)
-- ======================================================
-- Al ejecutar esto como 'bibliotecario_app' debe dar ERROR.
-- SELECT * FROM members;