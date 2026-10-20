import pool from '../db.js';

// Converte snake_case do banco para o camelCase que a API/frontend já usam
const SELECT = `
    SELECT matricula,
           nome,
           salario_base         AS "salarioBase",
           tipo,
           valor_vendas         AS "valorVendas",
           percentual_comissao  AS "percentualComissao",
           quantidade_produzida AS "quantidadeProduzida",
           valor_por_unidade    AS "valorPorUnidade"
      FROM colaboradores`;

// Remove campos nulos para manter o mesmo formato de antes
// (ex.: PADRAO não tem valorVendas, percentualComissao etc.)
function limpar(linha) {
    return Object.fromEntries(Object.entries(linha).filter(([, valor]) => valor !== null));
}

// Só grava os campos que pertencem ao tipo; o resto vira NULL
function valores(c) {
    const comissionado = c.tipo === 'COMISSIONADO';
    const producao = c.tipo === 'PRODUCAO';
    return [
        c.nome.trim(),
        c.salarioBase,
        c.tipo,
        comissionado ? c.valorVendas : null,
        comissionado ? c.percentualComissao : null,
        producao ? c.quantidadeProduzida : null,
        producao ? c.valorPorUnidade : null,
    ];
}

export async function listar() {
    const { rows } = await pool.query(`${SELECT} ORDER BY matricula`);
    return rows.map(limpar);
}

export async function buscarPorMatricula(matricula) {
    const { rows } = await pool.query(`${SELECT} WHERE matricula = $1`, [matricula]);
    return rows[0] ? limpar(rows[0]) : null;
}

export async function existeMatricula(matricula) {
    const { rowCount } = await pool.query(
        'SELECT 1 FROM colaboradores WHERE matricula = $1',
        [matricula]
    );
    return rowCount > 0;
}

export async function inserir(c) {
    await pool.query(
        `INSERT INTO colaboradores
            (matricula, nome, salario_base, tipo, valor_vendas, percentual_comissao,
             quantidade_produzida, valor_por_unidade)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [c.matricula, ...valores(c)]
    );
}

export async function atualizar(matricula, c) {
    const { rowCount } = await pool.query(
        `UPDATE colaboradores
            SET nome = $2, salario_base = $3, tipo = $4, valor_vendas = $5,
                percentual_comissao = $6, quantidade_produzida = $7, valor_por_unidade = $8
          WHERE matricula = $1`,
        [matricula, ...valores(c)]
    );
    return rowCount > 0;
}

export async function excluir(matricula) {
    const { rowCount } = await pool.query(
        'DELETE FROM colaboradores WHERE matricula = $1',
        [matricula]
    );
    return rowCount > 0;
}
