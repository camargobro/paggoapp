-- Dados iniciais (os mesmos que estavam no antigo db.js em memória)
INSERT INTO colaboradores
    (matricula, nome, salario_base, tipo, valor_vendas, percentual_comissao, quantidade_produzida, valor_por_unidade)
VALUES
    (1, 'João Silva',      3000, 'PADRAO',       NULL,  NULL, NULL, NULL),
    (2, 'Maria Santos',    2500, 'COMISSIONADO', 10000, 5,    NULL, NULL),
    (3, 'Carlos Oliveira', 2000, 'PRODUCAO',     NULL,  NULL, 500,  3),
    (4, 'Ana Souza',       3500, 'PADRAO',       NULL,  NULL, NULL, NULL),
    (5, 'Pedro Costa',     2800, 'COMISSIONADO', 15000, 8,    NULL, NULL),
    (6, 'Lucas Pereira',   2200, 'PRODUCAO',     NULL,  NULL, 800,  2.5)
ON CONFLICT (matricula) DO NOTHING;
