# PROMPTS.md

## api-usuarios

### Prompt 1

Quero criar uma API de usuários para um aplicativo em React Native.

A API deve usar:

- Node.js;
- Express;
- JavaScript;
- PostgreSQL;
- bcryptjs para criptografar senhas;
- JWT para autenticação;
- dotenv para variáveis de ambiente;
- CORS.

A API precisa ter:

- cadastro aberto;
- login aberto;
- listar usuários somente com token;
- buscar usuário somente com token;
- alterar usuário somente com token;
- excluir usuário somente com token;
- senha nunca armazenada em texto puro;
- banco.sql para criar a tabela;
- testes.http com um pedido para cada rota.

A resposta da API deve seguir o formato:

```text
{ sucesso, mensagem, dados }
```

Organize a API em arquivos separados e não coloque senhas, JWT_SECRET ou outros segredos diretamente no código.

### O que conferi

- Executei o `banco.sql` no PostgreSQL e a tabela `usuarios` foi criada.
- Rodei a API com `npm run dev` e ela abriu em `http://localhost:3000`.
- Testei cadastro e login.
- O login devolveu um token JWT.
- Testei as rotas protegidas de listar, buscar, alterar e excluir.
- As rotas protegidas funcionaram utilizando `Authorization: Bearer <token>`.
- O `testes.http` possui requisições para as rotas da API.
- A API continuou funcionando corretamente após ser reutilizada no projeto League of Wikis.

### O que a IA errou ou decidiu sozinha

- A IA decidiu utilizar e-mail e senha para o login.
- A IA definiu validade de 1 hora para o token JWT.
- A API permite que um usuário autenticado altere ou exclua usuários pelo ID.
- A atividade exige autenticação nessas rotas, mas não exige que cada usuário possa alterar somente a própria conta, por isso essa regra não foi modificada.

### O que fiz

- Instalei PostgreSQL e pgAdmin.
- Criei o banco `devapp_a4`.
- Executei o `banco.sql`.
- Configurei as variáveis locais no `.env`.
- Mantive `.env` e `node_modules` fora do Git por meio do `.gitignore`.
- Criei `.env.exemplo` sem senhas ou segredos.
- Reaproveitei a API de usuários do projeto anterior porque ela já atendia aos requisitos da atividade.
- Testei novamente cadastro, login, listagem, busca, alteração e exclusão no novo projeto.

---

## app

### Prompt 1

Quero continuar um aplicativo em React Native, com Expo e JavaScript, integrado a uma API de usuários em Node.js e Express.

A API de usuários roda em:

```text
http://localhost:3000
```

e responde no formato:

```text
{ sucesso, mensagem, dados }
```

O aplicativo deve possuir cinco telas:

- Login;
- Cadastro;
- Principal;
- Usuários;
- Editar usuário.

Requisitos:

- Login usando e-mail e senha.
- Se o login falhar, mostrar a mensagem retornada pela API.
- O token retornado em `dados.token` deve ficar somente na memória do app.
- As rotas protegidas devem enviar `Authorization: Bearer <token>`.
- Cadastro deve ter nome, sobrenome, e-mail, usuário e senha.
- Depois do cadastro, voltar para o login.
- A tela principal só aparece depois do login.
- A tela de usuários deve listar usuários e permitir busca por nome.
- A tela de edição deve permitir alterar e excluir usuário.
- Sair deve apagar o token e voltar ao login.
- Se a API responder 401, voltar ao login com a mensagem `Sua sessão expirou, entre de novo`.
- Não utilizar biblioteca de navegação.
- `App.js` deve controlar qual tela está aberta usando estado.
- Todas as chamadas à API devem ficar em `app/servicos/api.js`.
- Deve existir um arquivo por tela.

O projeto será adaptado para o tema **League of Wikis**, inspirado no universo de League of Legends.

O visual deve utilizar:

- fundo azul escuro;
- detalhes dourados;
- elementos inspirados no estilo Hextech;
- textos relacionados a Runeterra e invocadores;
- identidade visual consistente entre todas as telas.

### O que conferi

- O cadastro cria um novo usuário e volta para o login.
- O login com senha errada mostra a mensagem devolvida pela API.
- O login correto abre a tela principal.
- O token fica somente na memória do `App.js`.
- A tela de usuários só carrega depois do login.
- A busca por nome funciona.
- É possível abrir a tela de edição.
- Alterar usuário funciona.
- A confirmação de exclusão funciona.
- O botão de sair apaga o token e retorna ao login.
- As telas de Login, Cadastro, Principal, Usuários e Editar usuário foram adaptadas ao tema League of Wikis.
- O aplicativo foi testado no navegador usando Expo.
- Foram tirados todos os prints obrigatórios da atividade.

### O que a IA errou ou decidiu sozinha

- A IA manteve o login usando e-mail e senha, seguindo a estrutura existente da `api-usuarios`.
- A navegação foi feita apenas com estado no `App.js`, sem biblioteca externa.
- A confirmação de exclusão foi feita com `Modal`, garantindo funcionamento no navegador.
- Durante a adaptação da `TelaPrincipal.js`, o botão `Ver usuários` ficou inicialmente utilizando uma propriedade com nome diferente da usada no `App.js`.
- O problema foi identificado porque o botão aparecia na tela, mas não fazia a navegação.

### O que fiz

- Reaproveitei a estrutura funcional do aplicativo anterior.
- Mantive as cinco telas exigidas pela atividade.
- Alterei o tema visual para League of Wikis.
- Troquei textos como `Catálogo de Jogos` por `League of Wikis`.
- Adaptei a linguagem da interface para termos como `Runeterra` e `invocador`.
- Mantive a integração com a `api-usuarios`.
- Corrigi a propriedade do botão `Ver usuários`, utilizando o mesmo nome esperado pelo `App.js`.
- Testei cadastro, login, erro de senha, listagem, busca, alteração, exclusão, navegação e sair.
- Mantive o token somente na memória.

---

## api-ia

### Prompt 1 — criação da API de IA

Quero criar uma API em Node.js e Express, utilizando JavaScript CommonJS e a Gemini API.

A API deve responder perguntas com base somente em um documento PDF sobre o projeto League of Wikis.

A API deve:

- possuir `GET /saude`;
- possuir `POST /perguntar`;
- receber:

```json
{
  "pergunta": "..."
}
```

- retornar a resposta da IA;
- retornar a quantidade de tokens utilizados;
- responder somente com base no documento PDF;
- retornar exatamente:

```text
Não encontrei isso no documento
```

quando a informação não estiver disponível;

- limitar perguntas a 500 caracteres;
- rejeitar pergunta vazia;
- tratar erros da Gemini API;
- utilizar CORS;
- manter a chave da Gemini somente em variável de ambiente;
- possuir uma classe `AssistenteDocumento`;
- funcionar localmente;
- ser publicada na Vercel.

O assistente deve se chamar **Oráculo de Runeterra**.

O documento utilizado deve conter informações sobre:

- campeões;
- títulos de campeões;
- skins;
- preços de skins;
- runas;
- habilidades de alguns campeões;
- conteúdo utilizado pelo projeto League of Wikis.

### O que conferi

- Conferi a estrutura da pasta `api-ia`.
- Testei a rota `/saude`.
- Testei a rota `/perguntar`.
- Testei perguntas respondidas pelo documento.
- Testei perguntas que não existem no documento.
- Testei pergunta vazia.
- Testei pergunta acima de 500 caracteres.
- Conferi que a chave do Gemini não aparece no código.
- Conferi que o `.env` não deve ser enviado ao Git.
- O PDF `guia-league-of-wikis.pdf` foi carregado corretamente pela API.
- A API funcionou localmente.
- A API foi publicada na Vercel.
- A rota pública `/saude` respondeu:

```json
{"status":"OK"}
```

- A rota pública `/perguntar` respondeu corretamente utilizando o PDF.
- O modelo utilizado foi `gemini-3.5-flash-lite`.
- Perguntas fora do documento retornaram exatamente:

```text
Não encontrei isso no documento
```

### O que a IA errou ou decidiu sozinha

- A IA definiu a estrutura da classe `AssistenteDocumento`.
- A IA decidiu utilizar `models.generateContent`.
- A IA organizou a instrução de sistema para impedir o uso de conhecimento externo.
- A IA definiu o nome `Oráculo de Runeterra` para o assistente.
- A IA decidiu carregar o PDF em Base64 na inicialização da aplicação.
- O assistente não possui memória de conversa.
- Por isso, uma pergunta como:

```text
E qual é a skin mais cara dela?
```

não consegue identificar automaticamente que `dela` se refere à personagem citada na pergunta anterior.

### O que fiz

- Criei o documento `guia-league-of-wikis.pdf`.
- Coloquei o documento em:

```text
api-ia/documentos/guia-league-of-wikis.pdf
```

- Adaptei `assistente-documento.js` para carregar o novo PDF.
- Alterei a instrução de sistema para o tema League of Wikis.
- Mantive o modelo `gemini-3.5-flash-lite`.
- Mantive a chave da Gemini somente em variável de ambiente.
- Criei testes relacionados ao novo conteúdo.
- Testei uma pergunta sobre a habilidade Q da Lux.
- Testei perguntas sobre skins.
- Testei uma pergunta fora do conteúdo do PDF.
- Testei o limite máximo de 500 caracteres.

---

### Prompt 2 — integração do chat no aplicativo

Foi solicitado à IA que integrasse a `api-ia` ao aplicativo React Native.

A integração deveria:

- utilizar `app/servicos/ia.js`;
- utilizar `app/componentes/Chat.js`;
- integrar o chat à `TelaPrincipal.js`;
- manter os recursos existentes da tela principal;
- mostrar mensagens do usuário e da IA;
- mostrar uma mensagem de carregamento enquanto a IA processa;
- impedir uma nova pergunta durante o carregamento;
- mostrar a quantidade de tokens utilizada;
- mostrar erros;
- manter a conversa somente em memória;
- utilizar a API publicada na Vercel;
- adaptar o visual do chat para League of Wikis.

### O que conferi

- Conferi que o endereço da API está em `app/servicos/ia.js`.
- A URL pública utilizada é:

```text
https://api-ia-lol.vercel.app
```

- Conferi que o app chama `POST /perguntar`.
- Testei uma pergunta sobre a habilidade Q da Lux.
- A resposta apareceu corretamente dentro do aplicativo.
- A quantidade de tokens apareceu na interface.
- Testei uma pergunta fora do documento.
- A IA respondeu:

```text
Não encontrei isso no documento
```

- O chat foi testado junto com as outras funcionalidades do aplicativo.
- Os botões de usuários e sair continuaram funcionando após a correção da navegação.

### O que a IA errou ou decidiu sozinha

- A IA decidiu o visual das mensagens.
- A IA decidiu utilizar o texto `Consultando os arquivos de Runeterra...` durante o carregamento.
- A IA utilizou o termo `Oráculo de Runeterra` como nome do chat.
- O histórico visual permanece na memória do componente, mas a API recebe somente a pergunta atual.
- Inicialmente foi necessário conferir se os nomes das propriedades da `TelaPrincipal.js` estavam iguais aos definidos no `App.js`.

### O que fiz

- Adaptei o chat para o tema League of Wikis.
- Mantive o fundo escuro e os detalhes dourados.
- Configurei a URL pública da Vercel em `app/servicos/ia.js`.
- Testei o funcionamento completo do chat no navegador.
- Tirei os prints `06-ia.png` e `07-ia-limite.png`.
- Mantive o comportamento de resposta limitada somente ao conteúdo do PDF.

---

### Prompt 3 — publicação da API na Vercel

Quero publicar a nova `api-ia` do projeto League of Wikis na Vercel sem substituir o projeto anterior.

A nova API deve possuir um projeto separado.

### O que conferi

- A nova API foi vinculada a um projeto separado.
- O projeto criado na Vercel foi:

```text
api-ia-lol
```

- As variáveis de ambiente de produção foram cadastradas.
- Foi cadastrada a variável `GEMINI_API_KEY`.
- Foi cadastrada a variável `GEMINI_MODELO`.
- O modelo configurado foi:

```text
gemini-3.5-flash-lite
```

- O deploy de produção foi concluído.
- A URL pública criada foi:

```text
https://api-ia-lol.vercel.app
```

- A rota `/saude` foi testada pelo navegador.
- A rota `/perguntar` foi testada pelo arquivo `testes.http`.

### O que a IA errou ou decidiu sozinha

- Como a pasta `api-ia` havia sido copiada do projeto anterior, ela ainda possuía dados de vínculo da Vercel.
- Ao executar inicialmente o comando de deploy, a CLI tentou reutilizar o projeto antigo.
- Isso poderia fazer com que a nova versão fosse publicada no projeto anterior.

### O que fiz

- Não executei o deploy de produção enquanto o projeto estava vinculado incorretamente.
- Removi o vínculo local antigo da Vercel.
- Executei novamente:

```text
npx vercel link
```

- Escolhi criar um novo projeto.
- Criei o projeto `api-ia-lol`.
- Cadastrei novamente as variáveis de ambiente.
- Executei o deploy de produção somente depois de confirmar o novo projeto.
- Testei a API pública após o deploy.

---

### Prompt 4 — revisão em outra IA

Foi solicitado a outra IA que revisasse os arquivos:

```text
servidor.js
assistente-documento.js
```

A revisão deveria considerar:

- orientação a objetos;
- boas práticas;
- segurança;
- uso da Gemini API;
- execução na Vercel;
- proteção da chave de API.

### O que a revisão apontou

- A API pública não possui limitação de requisições, portanto um usuário pode realizar muitas chamadas e consumir a cota disponível da Gemini API.
- Foi sugerido utilizar lazy loading para o PDF em ambientes serverless.
- Foi sugerido melhorar o tratamento de falhas caso o PDF não seja encontrado.
- Foi destacado que a chave da Gemini deve permanecer apenas em variável de ambiente.
- Foi recomendado evitar exposição de segredos no repositório.

### O que conferi

- A API foi implantada e funciona corretamente na Vercel.
- A rota `/saude` responde corretamente.
- A rota `/perguntar` utiliza o PDF.
- O modelo `gemini-3.5-flash-lite` funciona corretamente.
- Perguntas fora do documento retornam:

```text
Não encontrei isso no documento
```

- A chave da Gemini permanece somente em variável de ambiente.
- O aplicativo utiliza apenas a URL pública da API.
- Não é necessário colocar a chave da Gemini dentro do aplicativo.

### O que a IA errou ou decidiu sozinha

- Algumas recomendações da revisão eram melhorias possíveis, mas não eram requisitos obrigatórios da atividade.
- A sugestão de lazy loading não foi necessária para o funcionamento atual, pois o carregamento do PDF na inicialização funcionou corretamente no deploy testado.

### O que fiz

- Mantive o carregamento atual do PDF porque a API funcionou corretamente.
- Mantive o modelo `gemini-3.5-flash-lite`.
- Não implementei rate limiting porque não é requisito da atividade, mas registrei como possibilidade de melhoria futura.
- Mantive a chave somente em variável de ambiente.
- Mantive o `.env` fora do Git.
- Mantive `.vercel`, `.env.local` e outros arquivos locais fora do repositório.

---

## Testes finais realizados

Foram realizados testes completos no projeto League of Wikis:

- cadastro de usuário;
- login correto;
- login com senha incorreta;
- tela principal;
- listagem de usuários;
- busca de usuário por nome;
- edição de usuário;
- exclusão com confirmação;
- botão sair;
- integração com a IA;
- pergunta respondida pelo PDF;
- pergunta fora do PDF;
- pergunta acima de 500 caracteres;
- rota pública `/saude`;
- API de IA publicada na Vercel.

Também foram tirados os oito prints exigidos:

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