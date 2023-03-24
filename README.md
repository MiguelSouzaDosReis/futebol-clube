# Project Futebol Clube

Neste projeto para realizar os desafios propostos na Trybe. fiz a construção de um CRUD com typeScript, utilizando ORM, além da criação e associação de tabelas usando models do sequelize. Com a modelagem de dados com MySQL através do Sequelize;


# Os desafios são

### 0 - Pré-requisitos

⚠️ Para que esse projeto faça a avaliação corretamente, **sua aplicação deve ter um funcionamento mínimo**.

Isso porque, o avaliador **irá executar um teste de usabilidade E2E** *(End-to-end, ou Ponto a ponto. Leia mais sobre esse tipo de teste [nesse link](https://app.betrybe.com/course/real-life-engineer/e2e_tests_puppeteer))*, acompanhado de validações adicionais *(Compilação do TypeScript e inicialização do Sequelize)* que podem ser acompanhados pelo uso do script `npm run test:debug`;

#### Premissas gerais

**Considerar, que para TODO REQUISITO, EXCETO os de testes de cobertura:**

- Deve existir uma aplicação de back-end **rodando em um container de nome `app_backend`**;
  - Considere a leitura do dia de *Docker* `Manipulação e Criação de Imagens no Docker` [nesse link](https://app.betrybe.com/course/back-end/docker/manipulacao-e-criacao-de-imagens-no-docker/e92d2393-3508-43ab-8a67-2b2516d25864).
  - ⚠️ **Caso o nome do container não seja criado automaticamente utilizando os underlines (`_`)**, utilize o parâmetro `container_name` no seu serviço para customizar e forçar o nome do mesmo:
``` yml
#...

  backend:
    # ...
    container_name: app_backend
    # ...

# ...
```

- O container `app_backend` deve ser capaz **de se comunicar com outro container rodando um banco de dados mysql**;
  - Considere a leitura do dia de *Docker* `Orquestrando Containers com Docker Compose` [nesse link](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a).

- Dentro do container `app_backend`, o avaliador irá verificar:
  - **Que é possível rodar o `tsc` ("TypeScript Compiler") sem erros**, através do script `build`, da própria aplicação back-end;
  - **Que o `tsc` deve gerar um arquivo `./build/database/config/database.js`** dentro do container `app_backend`;
    - Considere a leitura da seção `Bônus: Model com Sequelize` no conteúdo de *TypeScript*: `Tipagem Estática e Generics` [nesse link](https://app.betrybe.com/course/back-end/typescript/tipagem-estatica-e-generics/68eccf60-a982-4455-837d-da31e8726be5).
  - **Que é possível restaurar e popular o banco de dados** utilizando o `sequelize-cli`, a partir do arquivo de configuração `./build/database/config/database.js`, utilizando o script `db:reset`, da própria aplicação back-end.
    - ⚠️ Note:
      -  Os seeds já foram providos em `./app/backend/src/database/seeders`, **porém, precisam ser renomeados** *(remoção do underline (`_`), do final do arquivo)* para que possam ser reconhecidos pelo `sequelize-cli`, a medida que as respectivas `migrations` forem criadas;
      -  Existe uma `migration` com nome `./app/backend/src/database/migrations/99999999999999-create-z.js` responsável por indicar que o banco foi criado corretamente e está funcionando, **não apague ou renomeie essa migration**,

⚠️ **A partir do 5º requisito**, a aplicação de front-end deve estar **rodando em um container**, de forma que a mesma tentará consumir sua aplicação back-end (**que deve estar saudável**, considerando os pontos anteriores);

#### Inicialização do compose e verificação dos logs das aplicações

- Considerando o uso do parâmetro `healthcheck` em cada container do seu `docker-compose.yml`, a inicialização dos containers devem aguardar o comando de status de saúde (o que valida se aquele container está operacional ou não):
  - No container `db`, representado por um comando `ping` no banco de dados;
  - No back-end, representado por um comando `lsof` que vai procurar aplicações ativas na porta definida (por padrão, no caso `3001`);
  - No front-end, representado por um comando `lsof` que vai procurar aplicações ativas na porta definida (por padrão, no caso `3000`);

- Caso os containers respeitem as premissas anteriores, os mesmos devem ser criados, sem maiores problemas:

![Criação dos containers concluída com sucesso!](assets/compose-status-01.png)


- No compose, não há necessidade de parar e/ou reiniciar containers que não tiveram alterações. Em caso de alteração somente da imagem do back-end, basta utilizar, a partir da raiz, o comando `npm run compose:up`.
  - Na prática, o comando deve rodar, a partir da pasta `./app` (onde deve residir seu `docker-compose.yml`), o comando `docker-compose up -d --build`, esse comando forçará o re-build da imagem da aplicação `back-end`. O resultado

![Re-criação do container do back-end](assets/compose-status-02.png)

- Em caso de algum problema (no back-end, por exemplo), você deve se deparar com alguma mensagem do tipo:

![Erro no status de saúde do container do back-end](assets/compose-status-03.png)

> ⚠️ Lembre-se, não cabe ao avaliador de usabilidade dizer qual é o problema específico na sua aplicação, **por tanto, cabe aqui investigar o problema**, sempre considerando as premissas anteriores.

- Nesse caso, a partir da pasta `./app` (onde está seu *docker-compose*), é possível rodar o comando `docker-compose logs` (Para ver todos os status) ou `docker-compose logs <nome-do-seu-serviço>` (Para mostrar somente o de um escopo específico).
  - ⚠️ é indicado remover o parâmetro `restart: 'always'` do seu serviço, para que o mesmo não polua seus logs;
  - No nosso contexto, rodando o comando `docker-compose logs backend`:

![docker-compose logs backend](assets/compose-status-04.png)

> Aqui não houve problema com o `tsc`, porém a senha para acesso do banco pelo sequelize estava errada.


### Sequelize

Para o desenvolvimento, o time de produto disponibilizou um *Diagrama de Entidade-Relacionamento (DER)* para construir a modelagem do banco de dados. Com essa imagem você já consegue saber como:
  - Nomear suas tabelas e colunas
  - Quais são os tipos de suas colunas
  - Relações entre tabelas

    ![Exemplo banco de dados](assets/er-diagram.png)

**Dica:** Também é possível buscar referências nas seeds providas no projeto em `./app/backend/src/database/seeders`

#### 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `teams`

  - O avaliador consultará os dados da tabela teams, verificando se ela contém os dados iniciais corretos

#### 2 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matches`

  - O avaliador consultará os dados da tabela matches, verificando se ela contém os dados iniciais corretos

#### 3 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`

  - O avaliador consultará os dados da tabela users, verificando se ela contém os dados iniciais corretos

### Login

- A rota deve ser (`/login`).

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados;
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- Sua chave `JWT` do back-end, utilizada para assinatura do token, deve ser salva no arquivo `app/backend/jwt.evaluation.key`. Ela pode ser carregada em sua aplicação utilizando a biblioteca `fs` e é necessária para passar nos testes;


- O body da requisição deve conterá o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### 4 - (`TDD`) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos back-end em `/src` com um mínimo de 7 linhas cobertas

  **Sugestões:**
  - Se baseando no contrato do endpoint `/login` **do próximo requisito**, inicie um teste de integração utilizando a metodologia `TDD`, que passará a seguir, com a implementação do requisito seguinte;
  - Nesse primeiro momento, foque em desenvolver o que pede o requisito, progredindo gradualmente a partir disso;
  - Para isso, utilize/altere o arquivo de referência `app/backend`/src`/tests/change.me.test.ts`

#### 5 - Desenvolva o endpoint `/login` no backend de maneira ele permita o acesso com dados válidos no frontend

  - A rota de ser do tipo `POST`

  - O avaliador verificará se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos

  Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "123.456.789" // Aqui deve ser o token gerado pelo backend.
  }
  ```

#### 6 - (`TDD`) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos back-end em `/src` com um mínimo de 19 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**;

#### 7 - Desenvolva o endpoint `/login` no backend de maneira ele não permita o acesso com um email inválido no front-end

  - O avaliador verificará se fazer o login com um email incorreto retornará status não-autorizado

  Se o login tiver o "email" **inválido** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```

#### 8 - (`TDD`) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos back-end em `/src` com um mínimo de 25 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**;

#### 9 - Desenvolva o endpoint `/login` no back-end de maneira ele não permita o acesso com uma senha inválida no front-end

  - O avaliador verificará se fazer o login com uma senha incorreta retornará status não-autorizado

  Se o login tiver a "senha" **inválida** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```

#### 10 - (`TDD`) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos back-end em `/src` com um mínimo de 35 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**;

#### 11 - Desenvolva o endpoint `/login` no back-end de maneira ele não permita o acesso sem informar um email no front-end

  - O avaliador verificará se ao tentar fazer o login sem um email retornará status não-autorizado

  Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```

#### 12 - (`TDD`) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos back-end em `/src` com um mínimo de 45 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **os contratos dos próximos dois requisitos**;`

#### 13 - Desenvolva o endpoint `/login` no back-end de maneira ele não permita o acesso sem informar uma senha no front-end

  - O avaliador verificará se ao tentar fazer login sem senha retornará status não-autorizado

  Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```

#### 14 - Desenvolva o endpoint `/login/validate` no back-end de maneira ele retorne os dados corretamente no front-end

  - Deve ser uma rota `GET` que receba um `header` com parâmetro `authorization` onde ficará armazenado o token gerado no login;

  - O avaliador verificará se tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário

  A resposta deve ser de status `200` com uma `string` contendo a `role` do *user*:
  ```plaintext
    "admin"
  ```

### Jogos

 - Os requisitos a seguir consideram o consumo da rota `/teams` para retornar os nomes dos times associados a partida na renderização do front-end

#### 15 - (`TDD`) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos back-end em `/src` com um mínimo de 70 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/teams`, utilizando o método `TDD`, considerando **os contratos dos próximos dois requisitos**;

#### 16 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	...
]
```

#### 17 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
	"id": 5,
	"teamName": "Cruzeiro"
}
```

#### 18 - (`TDD`) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos back-end em `/src` com um mínimo de 80 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/matches`, utilizando o método `TDD`, agora considerando **os contratos dos próximos três requisitos**;`


#### 19 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.

  - A rota deve ser um `GET` e retorna uma lista de partidas

  - Será validado que a página apresentará todos os dados de partidas sem nenhum filtro

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
    ```

#### 20 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas

  - Será validado que ao escolher a opção de partidas em andamento serão filtradas todas as partidas em andamento

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```

#### 21 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas

  - Será validado que ao escolher a opção de partidas finalizadas serão filtradas todas as partidas finalizadas

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matches?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    }
  ]
  ```

### Adicionar Partidas

  - Para que os requisitos de criação de partidas, é necessário que a rota `/teams` funcione corretamente

#### 22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo back-end em `/src` com um mínimo de 100 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/matches`, utilizando o método `TDD`, agora considerando **o contrato dos próximos requisitos**;`

#### 23 - Desenvolva a rota `/matches` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

  - A rota deverá ser do tipo `POST`, e retornar a partida inserida no banco de dados

  - Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos

  - A partida só pode ser criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
  ```

  - caso a partida seja inserida com sucesso, deve-se retornar os dados da partida:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

#### 24 - Desenvolva a rota `/matches/:id/finish` de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados

  - A rota deve ser do tipo `PATCH`

  - Será recebido o `id` pelo parâmetro da URL

  - Será validado que ao finalizar uma partida é alterado no banco de dados e na página

  - Deve-se retornar, com um status `200`, a seguinte mensagem:

  ```json
  { "message": "Finished" }
  ```


#### 25 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais

  - Será validado que não é possível inserir uma partida com times iguais

  - Não deve ser possível criar uma partida com o mesmo time, exemplo: Barcelona x Barcelona, caso contrário, deve-se retornar o seguinte erro:

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

#### 26 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com time que não existe na tabela teams

  - Será validado que não é possível inserir uma partida com time que não existe na tabela teams

  - caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar o seguinte erro:

  ```json
  { "message": "There is no team with such id!" }
  ```

### Editar Partidas

#### 27 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento

  - O endpoint deve ser do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Será avaliado que é possível alterar o resultado de uma partida.

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

#### 28 - Desenvolva o endpoint `/matches/:id` de forma que seja possível finalizar partidas em andamento

  - O endpoint deve ser do tipo `PATCH`

  - Será recebido o `id` pelo parâmetro da url

  - Será avaliado que é possível finalizar uma partida em andamento

## Leaderboards

  **Para construir as classificação, elas devem seguir as seguintes regras de negócios**
  - Em que:
    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    <br/>

  - Toda a regra de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações;

  - Para calcular o `Total de Pontos` você deve levar em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)` que é a porcentagem de jogos ganhos, use a seguinte fórmula: `P/(J*3)*100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols sofridos.


  ⚠️ **Atenção:** ⚠️

  - Por padrão, as respostas de todos os seus endpoints deverão estar em inglês, mesmo a renderização no front-end estando em português.
  - Sua tabela deverá renderizar somente as partidas que já foram finalizadas!

  **Os seguintes pontos serão avaliados:**

  ```
  - Se a lista de classificação está correta;
  - Se a regra de classificação se mantem mesmo com mudanças na classificação
  - Se a tabela de classificação tem 10 colunas;
  - Se a tabela tem uma linha para cada time;
  ```

  **Exemplo de retorno esperado:**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```

### Leaderboard Home

#### 29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar a classificações dos times, quando mandantes, na tela de classificação do frontend com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

  - OBS: Um time `mandante` é quando o mesmo é o time da casa.

#### 30 - Desenvolva o endpoint `/leaderboard/home`, de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Botafogo 2 X 1 Grêmio e fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos

### Leaderboard away

#### 31 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times  na tela de classificação do front-end, com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/away` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

#### 32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar a classificações dos times na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela seja atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Botafogo 2 X 1 Grêmio e fazer a requisição ao endpoint `/leaderboard/away` serão retornados os campos e valores corretos


### Leaderboard

  - Esse endpoint irá alimentar no front-end uma tabela idêntica ao exemplo abaixo:

    | Classificação |   Time    | P  | J  | V  | E | D | GP | GC | SG | %    |
    |---------------|-----------|----|----|----|---|---|----|----|----|------|
    |      1        |Corinthians| 38 | 15 | 12 | 2 | 1 | 44 | 13 | 31 | 84.4 |


#### 33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

#### 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Flamengo 3 X 0 Napoli-SC e fazer a requisição ao endpoint /leaderboard serão retornados os campos e valores corretos

#### 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Minas Brasília 1 X 0 Ferroviária e fazer a requisição ao endpoint /leaderboard serão retornados os campos e valores corretos

### Como vocês podem ver não realizei os requisitos 18,22. 31, 32, 33, 34 e 35
