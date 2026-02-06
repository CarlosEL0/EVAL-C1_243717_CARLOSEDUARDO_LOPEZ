-- Índice para búsquedas por título y autor (Dashboard search)
CREATE INDEX idx_books_search ON books(title, author);

-- Índice para filtrar préstamos por fecha de vencimiento (Reporte morosidad)
CREATE INDEX idx_loans_due_at ON loans(due_at) WHERE returned_at IS NULL;

-- Índice para relaciones frecuentes
CREATE INDEX idx_copies_book_id ON copies(book_id);