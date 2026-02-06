-- 1. Miembros (Estudiantes, Docentes, Externos)
INSERT INTO members (name, email, member_type) VALUES
('Juan Perez', 'juan@univ.edu', 'Estudiante'),
('Maria Lopez', 'maria@univ.edu', 'Docente'),
('Carlos Ruiz', 'carlos@gmail.com', 'Externo'),
-- ... Agregar 12 miembros más para tener al menos 15 
('Ana Torres', 'ana@univ.edu', 'Estudiante');

-- 2. Libros (Variedad de categorías para el reporte de salud de inventario)
INSERT INTO books (title, author, category, isbn) VALUES
('Clean Code', 'Robert C. Martin', 'Tecnología', '9780132350884'),
('The Pragmatic Programmer', 'Andy Hunt', 'Tecnología', '9780135957059'),
('Cien años de soledad', 'Gabriel García Márquez', 'Literatura', '9780307474728'),
('Don Quijote', 'Miguel de Cervantes', 'Literatura', '9788424115456');
-- ... Insertar hasta completar 30 libros para probar la paginación 

-- 3. Copias de Libros
INSERT INTO copies (book_id, barcode, status) VALUES
(1, 'BC001', 'Prestado'),
(1, 'BC002', 'Disponible'),
(2, 'BC003', 'Disponible'),
(3, 'BC004', 'Prestado'),
(4, 'BC005', 'Perdido');

-- 4. Préstamos (Mezcla de activos, devueltos y vencidos para las VIEWS)
INSERT INTO loans (copy_id, member_id, loaned_at, due_at, returned_at) VALUES
(1, 1, '2026-01-10', '2026-01-17', '2026-01-15'), -- A tiempo
(4, 2, '2026-01-20', '2026-01-27', NULL),         -- Activo
(5, 3, '2025-12-01', '2025-12-08', NULL);         -- VENCIDO (Moroso)

-- 5. Multas (Relacionadas a préstamos vencidos)
INSERT INTO fines (loan_id, amount, paid_at) VALUES
(3, 50.00, NULL);