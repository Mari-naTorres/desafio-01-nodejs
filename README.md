🚀 Desafio 01 - Fundamentos do Node.js
Uma API RESTful construída totalmente do zero (sem frameworks como Express) utilizando apenas os módulos nativos do Node.js para realizar o gerenciamento completo de tarefas (CRUD).

💻 Funcionalidades
Criação de uma tarefa

Listagem de todas as tarefas (com filtro por título e descrição)

Atualização do título e descrição de uma tarefa

Marcação de uma tarefa como concluída

Remoção de uma tarefa

Diferencial: Importação de tarefas em massa a partir de um arquivo CSV.

🛠️ Tecnologias Utilizadas
Node.js (Módulos nativos: http, fs, crypto)

csv-parse: Biblioteca para processamento do arquivo CSV.

⚙️ Como executar o projeto
Clone este repositório em sua máquina.

Instale as dependências rodando o comando:

Bash
npm install
Inicie o servidor:

Bash
npm run dev
(Opcional) Para testar a importação em massa, abra um novo terminal e execute:

Bash
node import-csv.js