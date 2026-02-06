import { Pool } from 'pg';

// Configuramos el pool usando el usuario restringido para cumplir con Seguridad (D)
const pool = new Pool({
  user: process.env.APP_USER,          // bibliotecario_app
  password: process.env.APP_PASSWORD,  // app_secure_password
  host: process.env.DB_HOST,          // db (nombre del servicio en docker)
  database: process.env.DB_NAME,      // biblioteca_db
  port: Number(process.env.DB_PORT) || 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);