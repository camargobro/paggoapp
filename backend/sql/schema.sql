CREATE TABLE IF NOT EXISTS colaboradores (
    matricula             INTEGER        PRIMARY KEY CHECK (matricula > 0),
    nome                  VARCHAR(120)   NOT NULL CHECK (btrim(nome) <> ''),
    salario_base          NUMERIC(12,2)  NOT NULL CHECK (salario_base >= 0),
    tipo                  VARCHAR(20)    NOT NULL
                          CHECK (tipo IN ('PADRAO', 'COMISSIONADO', 'PRODUCAO')),

    -- COMISSIONADO
    valor_vendas          NUMERIC(12,2)  CHECK (valor_vendas >= 0),
    percentual_comissao   NUMERIC(5,2)   CHECK (percentual_comissao >= 0),

    -- PRODUCAO
    quantidade_produzida  INTEGER        CHECK (quantidade_produzida >= 0),
    valor_por_unidade     NUMERIC(12,2)  CHECK (valor_por_unidade >= 0),

    criado_em             TIMESTAMPTZ    NOT NULL DEFAULT now(),

    CONSTRAINT ck_comissionado CHECK (
        tipo <> 'COMISSIONADO'
        OR (valor_vendas IS NOT NULL AND percentual_comissao IS NOT NULL)
    ),
    CONSTRAINT ck_producao CHECK (
        tipo <> 'PRODUCAO'
        OR (quantidade_produzida IS NOT NULL AND valor_por_unidade IS NOT NULL)
    )
);
