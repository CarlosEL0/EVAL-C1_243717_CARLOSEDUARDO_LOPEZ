-- 1. Crear Tablas Base
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    member_type VARCHAR(20),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE USER bibliotecario_app WITH PASSWORD 'app_secure_password';
