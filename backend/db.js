import 'dotenv/config';
import pg from 'pg';

const { Pool, types } = pg;

// NUMERIC (oid 1700) chega como string por padrão; converte para number
types.setTypeParser(1700, (valor) => (valor === null ? null : parseFloat(valor)));

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL || 'postgresql://paggo:paggo123@localhost:5432/paggo',
    // ssl: { rejectUnauthorized: false }, // descomente se o banco for na nuvem (Neon, Render, Supabase...)
});

pool.on('error', (err) => console.error('Erro inesperado no pool do Postgres:', err));

export default pool;
