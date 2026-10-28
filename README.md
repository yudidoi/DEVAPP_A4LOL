# League of Wikis — DEVAPP A4

Projeto desenvolvido para a Atividade 4 da disciplina de Desenvolvimento de Aplicações.

O sistema é composto por três partes:

- `api-usuarios`: API responsável pelo cadastro, login e gerenciamento de usuários;
- `app`: aplicativo desenvolvido em React Native com Expo;
- `api-ia`: API responsável pelo assistente de inteligência artificial utilizando Gemini e um documento PDF como fonte de conhecimento.

O tema do projeto é **League of Wikis**, inspirado no universo de League of Legends.

O aplicativo permite criar uma conta, fazer login, visualizar usuários cadastrados, editar ou excluir usuários e conversar com o **Oráculo de Runeterra**, um assistente que responde perguntas utilizando somente as informações disponíveis no documento fornecido à IA.

---

## Como executar o projeto completo

Para testar a versão atual do sistema, deixe estes três elementos prontos:

1. **PostgreSQL:** instale e inicie o PostgreSQL. Crie o banco `devapp_a4` e execute o arquivo `api-usuarios/banco.sql` para criar a tabela de usuários.
2. **API de usuários:** em um terminal, entre em `api-usuarios`, instale as dependências (na primeira execução), configure o arquivo `.env` e execute `npm run dev`. A API fica disponível em `http://localhost:3000`.
3. **Aplicativo:** em outro terminal, entre em `app`, instale as dependências (na primeira execução) e execute `npx expo start --web`. O Expo abre o aplicativo no navegador, normalmente em `http://localhost:8081`.

Não é necessário iniciar a API de inteligência artificial localmente: o aplicativo usa a versão publicada na Vercel, em `https://api-ia-lol.vercel.app`.

Em resumo: **PostgreSQL ativo + terminal da API de usuários + terminal do aplicativo**. Os dois terminais devem permanecer abertos enquanto o sistema estiver sendo utilizado.

---

## Estrutura do projeto

```text
DEVAPP_A4LOL/
│
├── api-usuarios/
│   ├── banco.sql
│   ├── testes.http
│   ├── .env.exemplo
│   └── ...
│
├── api-ia/
│   ├── documentos/
│   │   └── guia-league-of-wikis.pdf
│   ├── assistente-documento.js
│   ├── servidor.js
│   ├── testes.http
│   ├── .env.exemplo
│   └── ...
│
├── app/
│   ├── componentes/
│   │   └── Chat.js
│   ├── servicos/
│   │   ├── api.js
│   │   └── ia.js
│   ├── telas/
│   ├── App.js
│   └── ...
│
├── prints/
│
├── PROMPTS.md
├── README.md
└── .gitignore
```

---

# 1. API de usuários

A `api-usuarios` foi desenvolvida com:

- Node.js;
- Express;
- PostgreSQL;
- bcryptjs;
- JWT;
- dotenv;
- CORS.

Ela é responsável por:

- cadastrar usuários;
- realizar login;
- listar usuários;
- buscar usuários;
- alterar usuários;
- excluir usuários.

As rotas de cadastro e login são públicas.

As demais rotas exigem autenticação por token JWT.

---

## Configuração da API de usuários

Entre na pasta:

```bash
cd api-usuarios
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.exemplo`.

Exemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=devapp_a4
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_local
JWT_SECRET=crie_um_segredo_aleatorio
```

Os valores reais não devem ser enviados ao GitHub.

---

## Banco de dados

A API utiliza PostgreSQL executado localmente no computador durante o desenvolvimento. Por isso, o banco de dados e os usuários cadastrados nele não são enviados ao GitHub nem ficam automaticamente disponíveis para quem clonar o repositório.

O repositório contém somente os arquivos necessários para que cada pessoa crie seu próprio ambiente:

- `api-usuarios/banco.sql`;
- `api-usuarios/.env.exemplo`;
- código da API;
- estas instruções.

O arquivo:

```text
api-usuarios/banco.sql
```

contém o comando necessário para criar a tabela de usuários.

Para configurar o banco em outro computador:

1. instale e inicie o PostgreSQL;
2. crie um banco chamado `devapp_a4`;
3. conecte-se a esse banco e execute `api-usuarios/banco.sql`;
4. crie `api-usuarios/.env` a partir de `.env.exemplo` e informe as suas credenciais locais.

Exemplo de configuração do `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=devapp_a4
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
JWT_SECRET=um_segredo_seguro
PORT=3000
```

Depois de configurar o banco, abra um terminal na raiz do repositório e inicie a API:

```bash
cd api-usuarios
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

# 2. Aplicativo

O aplicativo foi desenvolvido utilizando:

- React Native;
- Expo;
- JavaScript.

O app possui as seguintes telas:

- Login;
- Cadastro;
- Principal;
- Usuários;
- Editar usuário.

O aplicativo também possui um chat integrado ao Oráculo de Runeterra.

---

## Executando o aplicativo

Entre na pasta:

```bash
cd app
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npx expo start --web
```

O Expo abrirá o aplicativo no navegador.

Durante os testes, o endereço utilizado foi semelhante a:

```text
http://localhost:8081
```

A porta pode mudar caso já exista outro serviço utilizando essa porta.

---

## Autenticação

Após o login, a API retorna um token JWT.

O token é mantido somente na memória do aplicativo e não é salvo permanentemente.

As requisições protegidas enviam:

```text
Authorization: Bearer <token>
```

Ao sair do aplicativo, o token é apagado da memória.

Caso a sessão expire, o usuário retorna para a tela de login.

---

# 3. API de inteligência artificial

A `api-ia` utiliza:

- Node.js;
- Express;
- Gemini API;
- documento PDF;
- Vercel.

O assistente foi chamado de:

# Oráculo de Runeterra

Ele responde perguntas relacionadas ao conteúdo do documento:

```text
api-ia/documentos/guia-league-of-wikis.pdf
```

O documento contém informações relacionadas ao League of Wikis, como:

- campeões;
- títulos;
- skins;
- preços;
- runas;
- habilidades;
- informações utilizadas pelo projeto.

---

## Modelo de IA utilizado

O modelo utilizado é:

```text
gemini-3.5-flash-lite
```

Esse modelo foi escolhido porque funcionou corretamente durante os testes com o documento PDF e apresentou bom tempo de resposta para a atividade.

---

## Limitação do assistente

O Oráculo de Runeterra deve responder utilizando somente as informações disponíveis no documento PDF.

Se a informação perguntada não existir no documento, ele responde:

```text
Não encontrei isso no documento
```

Isso evita que o assistente responda utilizando informações externas que não fazem parte da base fornecida.

O chat também não possui memória contextual entre requisições.

Por exemplo, se a primeira pergunta for:

```text
Qual é o título da Lux?
```

e depois for enviada somente:

```text
E qual é a skin mais cara dela?
```

a API pode não identificar que `dela` se refere à Lux.

Por isso, perguntas completas funcionam melhor.

Exemplo:

```text
Qual é a skin mais cara da Lux?
```

---

## Configuração local da API de IA

Entre na pasta:

```bash
cd api-ia
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.exemplo`.

Exemplo:

```env
GEMINI_API_KEY=
GEMINI_MODELO=gemini-3.5-flash-lite
PORT=3001
```

A chave real da Gemini não deve aparecer no código nem ser enviada ao GitHub.

Depois execute:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3001
```

---

# API de IA online

A API também foi publicada na Vercel.

URL pública:

```text
https://api-ia-lol.vercel.app
```

O aplicativo já está configurado para utilizar esse endereço. Portanto, executar `api-ia` localmente é opcional e não é necessário para usar a versão atual do aplicativo.

Teste de saúde:

```text
GET https://api-ia-lol.vercel.app/saude
```

Resposta esperada:

```json
{
  "status": "OK"
}
```

---

## Exemplo de requisição para a IA

Endpoint:

```text
POST https://api-ia-lol.vercel.app/perguntar
```

Corpo:

```json
{
  "pergunta": "Qual é a habilidade Q da Lux?"
}
```

Exemplo de resposta:

```json
{
  "sucesso": true,
  "resposta": "Resposta baseada no documento.",
  "tokens": 5000
}
```

A quantidade de tokens pode variar entre as requisições.

---

# Integração do chat

A integração entre o aplicativo e a API de IA está localizada em:

```text
app/servicos/ia.js
```

O componente visual do chat está em:

```text
app/componentes/Chat.js
```

O chat é exibido na tela principal.

Durante uma pergunta, o aplicativo mostra:

```text
Consultando os arquivos de Runeterra...
```

Depois da resposta, também é mostrada a quantidade de tokens utilizada.

---

# Onde estão as principais informações

## Token JWT

O token retornado pelo login é mantido somente em memória no:

```text
app/App.js
```

Ele não é salvo permanentemente.

---

## Senha do usuário

A senha é enviada pelo aplicativo para a API durante cadastro e login.

No banco de dados, a senha é armazenada utilizando hash com `bcryptjs`.

A lógica relacionada à senha está na:

```text
api-usuarios
```

A senha nunca deve ser armazenada em texto puro.

---

## Chave da Gemini

A chave da Gemini fica somente em variável de ambiente.

Localmente:

```text
api-ia/.env
```

Na Vercel:

```text
Environment Variables
```

A aplicação acessa a variável:

```text
GEMINI_API_KEY
```

A chave não aparece no código fonte.

---

## Modelo Gemini

O modelo utilizado pode ser configurado pela variável:

```text
GEMINI_MODELO
```

O valor utilizado no projeto é:

```text
gemini-3.5-flash-lite
```

---

## System Instruction

As regras do assistente estão definidas no arquivo:

```text
api-ia/assistente-documento.js
```

Dentro da configuração:

```text
systemInstruction
```

Essa instrução determina que o Oráculo de Runeterra:

- responda somente com base no PDF;
- não use conhecimento externo;
- não invente informações;
- responda em português;
- retorne `Não encontrei isso no documento` quando necessário.

---

# Segurança

Os seguintes arquivos e diretórios não devem ser enviados ao GitHub:

```text
.env
.env.local
node_modules/
.vercel/
.expo/
.claude/
```

O projeto utiliza `.gitignore` para impedir o envio desses arquivos.

Também não devem ser publicados:

- chave da Gemini;
- JWT_SECRET;
- token JWT;
- credenciais do banco;
- senhas reais.

---

# Testes realizados

Foram testadas as seguintes funcionalidades:

- cadastro de usuário;
- login correto;
- login com senha incorreta;
- autenticação com JWT;
- listagem de usuários;
- busca de usuários;
- alteração de usuário;
- exclusão de usuário;
- confirmação antes da exclusão;
- logout;
- integração do aplicativo com a API de IA;
- pergunta respondida pelo documento;
- pergunta fora do documento;
- pergunta vazia;
- pergunta acima de 500 caracteres;
- retorno da quantidade de tokens;
- funcionamento local da API de IA;
- funcionamento da API publicada na Vercel;
- rota `/saude`;
- rota `/perguntar`.

---

# Prints da atividade

As evidências solicitadas estão na pasta:

```text
prints/
```

Arquivos:

```text
01-cadastro.png
02-login-erro.png
03-principal.png
04-usuarios.png
05-editar.png
06-ia.png
07-ia-limite.png
08-api-ia-online.png
```

---

# PROMPTS

Os prompts utilizados durante o desenvolvimento, as verificações feitas, decisões tomadas pela IA e alterações realizadas manualmente estão documentados em:

```text
PROMPTS.md
```

---

# Origem do tema

O League of Wikis foi desenvolvido como continuação e adaptação de uma ideia de projeto anterior criada por **Yudi Vinicius**.

A continuação e adaptação do projeto foram realizadas com autorização do autor original.

Para esta atividade, a estrutura foi adaptada para atender aos requisitos de React Native, API de usuários e integração com inteligência artificial.

---

# Tecnologias utilizadas

### Aplicativo

```text
React Native
Expo
JavaScript
```

### API de usuários

```text
Node.js
Express
PostgreSQL
JWT
bcryptjs
dotenv
CORS
```

### Inteligência artificial

```text
Gemini API
gemini-3.5-flash-lite
PDF
Node.js
Express
Vercel
```

---

# Resultado

O projeto final possui:

- autenticação de usuários;
- CRUD de usuários;
- interface temática League of Wikis;
- integração com inteligência artificial;
- IA limitada ao conteúdo de um documento;
- API de IA publicada online;
- tratamento de perguntas fora da base;
- contagem de tokens;
- documentação dos prompts utilizados;
- evidências por meio dos prints solicitados.
