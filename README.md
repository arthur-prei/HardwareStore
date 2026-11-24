# Hardware Store API

**Arthur Porto de Souza Silva**

Loja de Hardware

API REST para simular o gerenciamento de peças e componentes de hardware, permitindo cadastrar, consultar, atualizar e excluir produtos.

## Objetivo

O objetivo da API é disponibilizar operações de CRUD para produtos de hardware, utilizando Entity Framework Core e SQLite para armazenar os dados em um banco de dados.

O projeto foi desenvolvido a partir da AP1 e continuado na AP2, mantendo o mesmo repositório e integrando o backend com uma interface web para facilitar o gerenciamento das peças.

Nesta etapa (AS), o foco foi a organização do código, separando as responsabilidades em arquivos e pastas específicas, facilitando a manutenção e compreensão da aplicação.

## Requisitos

- .NET 10
- Git
- Entity Framework Core
- SQLite
- Bruno ou Postman para realizar os testes dos endpoints
- Navegador para acessar a interface web

## Estrutura do projeto

O projeto está organizado da seguinte forma:

```text
HardwareStore/
├── Data/
│   └── ApiDbContext.cs
├── Dtos/
│   ├── ItemDTO.cs
│   └── NewItemDTO.cs
├── Migrations/
│   ├── BancoInicial.cs
│   ├── BancoInicial.Designer.cs
│   └── ApiDbContextModelSnapshot.cs
├── Models/
│   └── HardwareEntity.cs
├── Properties/
├── wwwroot/
├── bruno/
├── Program.cs
├── appsettings.json
└── AP2.csproj
```

### Responsabilidade dos arquivos

- **Models:** contém as entidades que representam os dados utilizados pela aplicação.
- **Dtos:** contém os objetos de transferência de dados utilizados nas operações da API.
- **Data:** contém o contexto do Entity Framework Core, responsável pelo acesso ao banco de dados.
- **Migrations:** contém as migrações responsáveis pela criação e atualização da estrutura do banco.
- **wwwroot:** contém os arquivos da interface web.
- **bruno:** contém a Collection utilizada para testar os endpoints.
- **Program.cs:** responsável pela inicialização da aplicação, registro dos serviços, configuração dos middlewares e definição das rotas.

## Como executar?

Clone o repositório:

```bash
git clone https://github.com/arthur-prei/HardwareStore.git
```

Entre na pasta do projeto:

```bash
cd HardwareStore
```

Restaure as dependências:

```bash
dotnet restore
```

Compile o projeto:

```bash
dotnet build
```

### Preparação do banco de dados

O projeto utiliza Entity Framework Core com SQLite para armazenar os dados dos produtos.

Caso o banco ainda não tenha sido criado, execute as migrations existentes:

```bash
dotnet ef database update
```

Esse comando exige que a ferramenta `dotnet-ef` esteja instalada.

### Executando a aplicação

Após preparar o banco de dados, execute:

```bash
dotnet run
```

A aplicação estará disponível localmente no endereço exibido no terminal.

## Interface web

A aplicação possui uma interface web integrada à API, permitindo gerenciar as peças diretamente pelo navegador.

Pela interface, é possível:

- Listar os itens cadastrados;
- Cadastrar novas peças;
- Editar os dados de uma peça existente;
- Excluir peças cadastradas.

A interface utiliza os endpoints reais da API, e as alterações são armazenadas no banco de dados SQLite por meio do Entity Framework Core.

Para acessar, inicie a aplicação e abra no navegador o endereço local exibido no terminal.

## Endpoints

| Método | Rota | Descrição | Resposta de sucesso |
|---|---|---|---|
| GET | `/api` | Verifica se a API está online | 200 |
| GET | `/api/items` | Lista todos os itens | 200 |
| GET | `/api/items/{id}` | Consulta um item pelo ID | 200 |
| POST | `/api/items` | Cadastra um novo item | 201 |
| PUT | `/api/items/{id}` | Atualiza um item existente | 200 |
| DELETE | `/api/items/{id}` | Exclui um item | 204 |

Quando um item não é encontrado, as operações de consulta, atualização e exclusão retornam `404 Not Found`.

## Exemplos de requisições

### GET /api

Verifica se a API está online.

Resposta:

```text
Central de Peças está online!
```

### GET /api/items

Retorna a lista de itens cadastrados.

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "name": "NVIDIA RTX 4060",
    "price": 2219.98
  },
  {
    "id": 2,
    "name": "Memória RAM 8GB DDR5",
    "price": 2809.98
  }
]
```

Os dados retornados dependem dos registros existentes no banco de dados.

### GET /api/items/{id}

Busca um produto específico pelo ID.

Exemplo:

`GET /api/items/1`

Resposta:

```json
{
  "id": 1,
  "name": "NVIDIA RTX 4060",
  "price": 2219.98
}
```

### POST /api/items

Cadastra um novo produto. Envie um JSON contendo `name` e `price`.

Exemplo:

```json
{
  "name": "SSD NVMe 1TB",
  "price": 459.90
}
```

Quando o cadastro é realizado com sucesso, a API retorna `201 Created`, incluindo os dados do item criado.

### PUT /api/items/{id}

Atualiza um produto existente. Informe o ID na URL e os novos dados no corpo da requisição.

Exemplo:

`PUT /api/items/3`

JSON:

```json
{
  "name": "SSD NVMe 1TB Kingston",
  "price": 499.90
}
```

Quando a atualização é realizada com sucesso, a API retorna `200 OK` com os dados atualizados.

### DELETE /api/items/{id}

Exclui um produto pelo ID.

Exemplo:

`DELETE /api/items/3`

Quando a exclusão é realizada com sucesso, a API retorna `204 No Content`.

## Tratamento de erros

A API possui tratamento de exceções para evitar que erros internos exponham detalhes desnecessários ao cliente.

Em caso de erro interno, a aplicação retorna `500 Internal Server Error` com uma mensagem genérica em formato JSON.

Caso seja solicitado um produto com um ID inexistente, a API retorna:

`404 Not Found`

Esse comportamento se aplica às operações que consultam, atualizam ou excluem um item inexistente.

## Persistência dos dados

Os dados são armazenados em um banco de dados SQLite utilizando Entity Framework Core.

As operações de cadastro, atualização e exclusão são persistidas no banco de dados.

Isso significa que os registros não excluídos continuam disponíveis mesmo após encerrar e iniciar novamente a aplicação, desde que seja utilizado o mesmo banco de dados.

As migrations necessárias para preparar a estrutura do banco estão incluídas no repositório.

O arquivo local do banco de dados pode conter dados de teste e não precisa ser enviado ao GitHub. O banco pode ser preparado seguindo as instruções de execução e utilizando as migrations versionadas.

## Collection do Bruno

A Collection utilizada para os testes está dentro da pasta `bruno/` no repositório.

Ela contém as requisições para testar os endpoints da API:

- GET todos os itens;
- GET item por ID;
- POST item;
- PUT item;
- DELETE item.

Os testes permitem verificar as respostas HTTP, o funcionamento das operações CRUD, a atualização dos dados, a persistência no banco e o tratamento de itens inexistentes.

## Vídeo de demonstração — AS

https://youtu.be/YjIEjYjYLc0

No vídeo são demonstrados:

- A organização da estrutura do projeto;
- A responsabilidade dos Models, DTOs e DbContext;
- Os namespaces e imports;
- A organização do Program.cs;
- A compilação e execução da aplicação;
- Os testes das operações CRUD utilizando o Bruno;
- O funcionamento do tratamento de erros;
- A persistência dos dados após reiniciar a aplicação;
- A Collection e a documentação do projeto.

## Tecnologias utilizadas

- C#
- ASP.NET Core Minimal API
- .NET 10
- Entity Framework Core
- SQLite
- HTML, CSS e JavaScript
- Bruno
- Git e GitHub
