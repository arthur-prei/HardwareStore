# Hardware Store API

**Arthur Porto de Souza Silva**

Loja de Hardware

API REST para simular o gerenciamento de peças e componentes de hardware, permitindo cadastrar, consultar, atualizar e excluir produtos.

## Objetivo

O objetivo da API é disponibilizar operações de CRUD para produtos de hardware, utilizando Entity Framework Core e SQLite para armazenar os dados em um banco de dados.

O projeto foi desenvolvido a partir da AP1, mantendo o mesmo repositório e integrando o backend com uma interface web para facilitar o gerenciamento das peças.

## Requisitos

- .NET 10
- Git
- Entity Framework Core
- SQLite
- Bruno ou Postman para realizar os testes dos endpoints
- Navegador para acessar a interface web

## Como executar?

Clone o repositório:

```bash
git clone https://github.com/arthur-prei/HardwareStore.git
```

Entre na pasta do projeto:

```bash
cd HardwareStore
```

Execute a aplicação:

```bash
dotnet run
```

Após inicializar o projeto, a API deverá estar disponível localmente. A porta pode variar dependendo da configuração gerada pelo .NET. Confira o endereço exibido no terminal.

### Preparação do banco de dados

O projeto utiliza Entity Framework Core com SQLite para armazenar os dados dos produtos.

Caso o banco ainda não tenha sido criado, execute as migrations existentes para preparar sua estrutura:

```bash
dotnet ef database update
```

Esse comando exige que a ferramenta `dotnet-ef` esteja instalada e que as dependências do projeto estejam restauradas. O banco será preparado conforme as migrations versionadas no repositório.

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

### GET

`/`  
Verifica se a API está online.

`/api/items`  
Retorna todos os itens cadastrados.

`/api/items/{id}`  
Retorna um item específico pelo ID.

### POST

`/api/items`  
Cadastra um novo item.

### PUT

`/api/items/{id}`  
Atualiza um item existente.

### DELETE

`/api/items/{id}`  
Remove um item existente.

## Exemplos

### GET /

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

Caso seja solicitado um produto com um ID que não existe, a API retorna:

`404 Not Found`

Esse comportamento se aplica às operações que buscam, atualizam ou excluem um item inexistente.

## Persistência dos dados

Nesta etapa do projeto, os dados são armazenados em um banco de dados SQLite utilizando Entity Framework Core.

Diferentemente da versão inicial da AP1, os registros cadastrados e as alterações realizadas são persistidos no banco de dados.

Isso significa que os dados não excluídos continuam disponíveis mesmo após encerrar e iniciar novamente a aplicação, desde que seja utilizado o mesmo banco de dados.

As migrations necessárias para preparar a estrutura do banco estão incluídas no repositório.

O arquivo local do banco de dados, que pode conter dados de teste, não precisa ser enviado ao GitHub. O banco pode ser preparado seguindo as instruções de execução e utilizando as migrations versionadas.

## Collection

A Collection utilizada para os testes está dentro da pasta `Bruno` no repositório.

Ela contém as requisições para testar os endpoints da API:

- GET todos os itens;
- GET item por ID;
- POST item;
- PUT item;
- DELETE item.

Os testes permitem verificar as respostas HTTP, o funcionamento das operações CRUD e o tratamento de itens inexistentes.

## Vídeo de demonstração — AP2

**Link do vídeo:** [Adicionar link público do vídeo da AP2]

No vídeo são demonstrados a execução da aplicação, os testes dos endpoints utilizando o Bruno, o funcionamento do frontend integrado com a API e a persistência dos dados após reiniciar a aplicação.

## Vídeos de demonstração — AP1

**Vídeo de Demonstração:**  
[text](https://youtu.be/DaxC0NB6zwI)

## Tecnologias utilizadas

- C#
- ASP.NET Core Minimal API
- .NET 10
- Entity Framework Core
- SQLite
- HTML, CSS e JavaScript
- Bruno
- Git e GitHub