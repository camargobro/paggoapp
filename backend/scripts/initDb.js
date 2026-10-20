// Cria a tabela e insere os dados iniciais.
// Uso: npm run db:init            (cria tabela + dados de exemplo)
//      npm run db:init -- --sem-seed   (só cria a tabela)
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = (arquivo) => readFile(path.join(__dirname, '../sql', arquivo), 'utf8');

try {
    await pool.query(await sql('schema.sql'));
    console.log('Tabela "colaboradores" pronta.');

    if (!process.argv.includes('--sem-seed')) {
        await pool.query(await sql('seed.sql'));
        console.log('Dados iniciais inseridos (matrículas já existentes foram mantidas).');
    }
} catch (error) {
    console.error('Erro ao inicializar o banco:', error.message);
    process.exitCode = 1;
} finally {
    await pool.end();
}
