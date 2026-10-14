<div align="center">

# 💸 Paggo — Gestão de Colaboradores e Folha de Pagamento

Aplicação web desenvolvida para o gerenciamento eficiente de colaboradores e cálculo automatizado da folha de pagamento, com suporte a diferentes modalidades de remuneração.

</div>

---

## 📋 Sobre o projeto

O **Paggo** foi criado para facilitar a rotina de gestão de pessoal e a geração de folhas de pagamento. 

A aplicação permite cadastrar, consultar, editar e excluir colaboradores, além de calcular remunerações dinamicamente conforme o tipo de pagamento e apresentar relatórios consolidados com todos os valores.

---

## ✨ Funcionalidades

### 👥 Gestão de Colaboradores
- Cadastro completo de colaboradores.
- Consulta de registros cadastrados.
- Edição e exclusão de dados.
- Definição de matrícula, nome e salário-base.
- Seleção da modalidade de remuneração.
- Alerta de confirmação antes de excluir registros.

### 💰 Modalidades de Remuneração

| Modalidade | Descrição |
| :--- | :--- |
| **Padrão** | Remuneração baseada exclusivamente no salário-base. |
| **Comissionado** | Considera o salário-base somado às vendas realizadas e percentual de comissão. |
| **Produção** | Considera o salário-base somado à quantidade produzida multiplicada pelo valor por unidade. |

### 📊 Folha de Pagamento
- Geração de relatórios completos da folha.
- Totalização dos salários-base.
- Apuração de adicionais.
- Cálculo do valor total da folha.
- Detalhamento dos valores individuais por colaborador.
- Resumo agrupado por modalidade de remuneração.

### 🎨 Interface
- Página inicial intuitiva com atalhos para as principais funcionalidades.
- Formulários dinâmicos que se adaptam conforme a modalidade de remuneração escolhida.
- Tabelas organizadas para consulta de colaboradores e folha.
- Mensagens de feedback visuais para o usuário.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript ES Modules**

### Backend
- **Node.js**
- **Express.js**
- **API HTTP** com suporte a JSON
- **CORS**

---

## 🏗️ Estrutura do Projeto

```text
paggoapp/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── logo.png
│   ├── logo-claro.png
│   └── favicon.png
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── routes/
│       ├── colaboradorRouter.js
│       └── folhaPagamentoRouter.js
│
└── README.md
```

> *Nota: A estrutura acima é ilustrativa e pode variar conforme os ajustes do repositório.*

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- **npm** (geralmente já incluso no Node.js)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/camargobro/paggoapp.git
   cd paggoapp
   ```

2. **Instale as dependências do backend**
   ```bash
   cd backend
   npm install
   ```
   *(Este comando pressupõe que exista um `package.json` no diretório `backend/`)*

3. **Inicie o servidor**
   ```bash
   node server.js
   ```

Por padrão, o servidor será iniciado na porta **3000**. Acesse a aplicação em seu navegador através de:

🔗 [http://localhost:3000](http://localhost:3000)

*(A porta de execução também pode ser alterada por meio da variável de ambiente `PORT`)*

---

## 🔌 API

O backend disponibiliza dois grupos principais de rotas:

| Prefixo | Descrição |
| :--- | :--- |
| `/colaboradores` | Operações relacionadas ao cadastro e gestão de colaboradores. |
| `/folha` | Operações relacionadas ao cálculo e relatórios da folha de pagamento. |

---

## 🧮 Regras de Remuneração

O sistema contempla três modalidades de cálculo:
1. **Padrão:** Utiliza o salário-base.
2. **Comissionado:** Utiliza o salário-base acrescido do valor das vendas e o percentual de comissão.
3. **Produção:** Utiliza o salário-base acrescido da quantidade produzida multiplicada pelo valor unitário.
