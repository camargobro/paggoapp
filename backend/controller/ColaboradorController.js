import * as repo from '../repository/colaboradorRepository.js';
import { validarColaborador, ErroValidacao } from '../regraNegocios.js';

// Erros de validação -> 400; falhas de banco/servidor -> 500
function responderErro(res, error) {
    if (error instanceof ErroValidacao) {
        return res.status(400).send({ error: error.message });
    }
    if (error.code === '23505') { // matrícula duplicada (corrida entre dois cadastros)
        return res.status(400).send({ error: "Matrícula já cadastrada" });
    }
    if (error.code === '22003' || error.code === '23514') { // número fora do limite / CHECK
        return res.status(400).send({ error: "Valores inválidos ou fora do limite permitido" });
    }
    console.error(error);
    res.status(500).send({ error: "Erro interno ao acessar o banco de dados." });
}

export async function getColaboradores(req, res) {
    try {
        res.send(await repo.listar());
    } catch (error) {
        responderErro(res, error);
    }
}

export async function getColaboradorByMatricula(req, res) {
    try {
        const matricula = parseInt(req.params.matricula);
        const colaborador = Number.isNaN(matricula) ? null : await repo.buscarPorMatricula(matricula);
        if (!colaborador) {
            return res.status(404).send({ error: "Colaborador não encontrado." });
        }
        res.send(colaborador);
    } catch (error) {
        responderErro(res, error);
    }
}

export async function postColaborador(req, res) {
    try {
        const colaborador = req.body;
        await validarColaborador(colaborador);
        await repo.inserir(colaborador);
        res.status(201).send({ message: "Colaborador criado com sucesso." });
    } catch (error) {
        responderErro(res, error);
    }
}

export async function putColaborador(req, res) {
    try {
        const matricula = parseInt(req.params.matricula);
        if (Number.isNaN(matricula) || !(await repo.existeMatricula(matricula))) {
            return res.status(404).send({ error: "Colaborador não encontrado." });
        }
        const colaborador = { ...req.body, matricula };
        await validarColaborador(colaborador, { ehAtualizacao: true });
        await repo.atualizar(matricula, colaborador);
        res.send({ message: "Colaborador atualizado com sucesso." });
    } catch (error) {
        responderErro(res, error);
    }
}

export async function deleteColaborador(req, res) {
    try {
        const matricula = parseInt(req.params.matricula);
        const excluido = Number.isNaN(matricula) ? false : await repo.excluir(matricula);
        if (!excluido) {
            return res.status(404).send({ error: "Colaborador não encontrado." });
        }
        res.send({ message: "Colaborador excluído com sucesso." });
    } catch (error) {
        responderErro(res, error);
    }
}
