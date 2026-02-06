-- 1. EXTENSIONES Y LIMPIEZA
DROP TABLE IF EXISTS fines, loans, copies, books, members CASCADE;

-- 2. TABLAS BASE
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    member_type VARCHAR(20) CHECK (member_type IN ('Estudiante', 'Docente', 'Externo')),
    joined_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    isbn VARCHAR(20) UNIQUE
);

CREATE TABLE copies (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    barcode VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'Disponible' CHECK (status IN ('Disponible', 'Prestado', 'Mantenimiento', 'Perdido'))
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    copy_id INT REFERENCES copies(id),
    member_id INT REFERENCES members(id),
    loaned_at DATE DEFAULT CURRENT_DATE,
    due_at DATE NOT NULL,
    returned_at DATE,
    CONSTRAINT check_dates CHECK (due_at >= loaned_at)
);

CREATE TABLE fines (
    id SERIAL PRIMARY KEY,
    loan_id INT REFERENCES loans(id),
    amount DECIMAL(10,2) NOT NULL,
    paid_at DATE
);

-- 3. SEGURIDAD (Usuario de Aplicación)
-- Eliminamos si existe para evitar errores en recreación
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'bibliotecario_app') THEN
      CREATE ROLE bibliotecario_app WITH LOGIN PASSWORD 'app_secure_password';
   END IF;
END $$;

-- El usuario NO tiene permisos sobre las tablas directamente (Seguridad Real)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM bibliotecario_app;