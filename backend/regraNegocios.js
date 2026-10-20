import { existeMatricula } from './repository/colaboradorRepository.js';

export class ErroValidacao extends Error {}

// ehAtualizacao = true pula a checagem de matrícula duplicada (PUT mantém a própria matrícula)
export async function validarColaborador(colaborador, { ehAtualizacao = false } = {}) {
    const {
        matricula,
        nome,
        salarioBase,
        tipo,
        valorVendas,
        percentualComissao,
        quantidadeProduzida,
        valorPorUnidade
    } = colaborador;

    if (!matricula) {
        throw new ErroValidacao("Matrícula é obrigatória");
    }

    if (!Number.isInteger(matricula) || matricula <= 0 || matricula > 2147483647) {
        throw new ErroValidacao("Matrícula deve ser um número inteiro positivo");
    }

    if (!ehAtualizacao && await existeMatricula(matricula)) {
        throw new ErroValidacao("Matrícula já cadastrada");
    }

    if (!nome || nome.trim() === "") {
        throw new ErroValidacao("Nome é obrigatório");
    }

    if (salarioBase === undefined || salarioBase === null) {
        throw new ErroValidacao("Salário base é obrigatório");
    }

    if (salarioBase < 0) {
        throw new ErroValidacao("Salário base não pode ser negativo");
    }

    if (!["PADRAO", "COMISSIONADO", "PRODUCAO"].includes(tipo)) {
        throw new ErroValidacao("Tipo de colaborador inválido");
    }

    if (tipo === "COMISSIONADO") {
        if (valorVendas === undefined || valorVendas === null) {
            throw new ErroValidacao("Valor das vendas é obrigatório");
        }

        if (valorVendas < 0) {
            throw new ErroValidacao("Valor das vendas não pode ser negativo");
        }

        if (percentualComissao === undefined || percentualComissao === null) {
            throw new ErroValidacao("Percentual de comissão é obrigatório");
        }

        if (percentualComissao < 0) {
            throw new ErroValidacao("Percentual de comissão não pode ser negativo");
        }
    }

    if (tipo === "PRODUCAO") {
        if (quantidadeProduzida === undefined || quantidadeProduzida === null) {
            throw new ErroValidacao("Quantidade produzida é obrigatória");
        }

        if (quantidadeProduzida < 0) {
            throw new ErroValidacao("Quantidade produzida não pode ser negativa");
        }

        if (valorPorUnidade === undefined || valorPorUnidade === null) {
            throw new ErroValidacao("Valor por unidade é obrigatório");
        }

        if (valorPorUnidade < 0) {
            throw new ErroValidacao("Valor por unidade não pode ser negativa");
        }
    }
}

export function calcularSalario(colaborador) {
    const { salarioBase, tipo } = colaborador;

    if (tipo === "PADRAO") {
        return salarioBase;
    }

    if (tipo === "COMISSIONADO") {
        return salarioBase +
            colaborador.valorVendas *
            (colaborador.percentualComissao / 100);
    }

    if (tipo === "PRODUCAO") {
        return salarioBase +
            colaborador.quantidadeProduzida *
            colaborador.valorPorUnidade;
    }
}