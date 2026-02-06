-- Asignar permisos solo sobre las vistas
GRANT SELECT ON vw_most_borrowed_books TO bibliotecario_app;
GRANT SELECT ON vw_overdue_loans TO bibliotecario_app;
GRANT SELECT ON vw_fines_summary TO bibliotecario_app;
GRANT SELECT ON vw_member_activity TO bibliotecario_app;
GRANT SELECT ON vw_inventory_health TO bibliotecario_app;

-- Importante: El usuario necesita permisos de uso en el esquema public
GRANT USAGE ON SCHEMA public TO bibliotecario_app;