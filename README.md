# Hardware Store API

## Arthur Porto de Souza Silva

## Loja de Hardware
API REST para simular o gerenciamento de peças e componentes de hardware

## Objetivo
O objetivo da API é disponibilizar operações de CRUD para produtos de hardware, permitindo consultar, cadastrar, atualizar e remover itens através das requisições

## Requisitos
- .NET 10
- Git
- Bruno ou Postman para realizar os testes dos endpoints

# Como executar?

### Clone o repositório:
git clone https://github.com/arthur-prei/HardwareStore.git

### Entre na pasta do projeto:
cd HardwareStore

### Execute a aplicação:
dotnet run

### Após inicializar o projeto, a API deverá estar disponível localmente em:
http://localhost:5000

#### A porta pode variar dependendo da configuração gerada pelo .NET

# Endpoints

## GET
- / -> Verifica se a API está online
- /api/items -> Retorna todos os itens cadastrados
- /api/items/{id} -> Retorna um item específico pelo ID
## POST
- /api/items -> Cadastra um novo item
## PUT
- /api/items/{id} -> Atualiza um item existente
## DELETE
- /api/items/{id} -> Remove um item existente

# Exemplos

## GET /
### Resposta:
Central de Peças está online!

## GET /api/items
### Resposta:
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

## GET /api/items/{id}
### Exemplo:
#### GET /api/items/1
### Resposta:
{ 
    "id": 1,
    "name": "NVIDIA RTX 4060",
    "price": 2219.98 
}

## POST /api/items
Para cadastrar um novo item, envie um JSON com "name" e "price"
### Exemplo:
{
  "name": "SSD NVMe 1TB",
  "price": 459.90
}
### Resposta:
{
  "id": 3,
  "name": "SSD NVMe 1TB",
  "price": 459.90
}

## PUT /api/items/{id}
Para atualizar um produto existente, informe o ID na URL.
### Exemplo:
PUT /api/items/3
### JSON:
{
  "name": "SSD NVMe 1TB Kingston",
  "price": 499.90
}

## DELETE /api/items/{id}
### Exemplo:
DELETE /api/items/3
### Quando a exclusão é realizada com sucesso, a API retorna o status:
204 No Content

# Tratamento de Erros
### Caso seja solicitado algum item/id que não existe, a API retorna:
404 Not Found

# Dados em Memória
### Os dados utilizados na API ficam SOMENTE na memória
Isso significa que os produtos cadastrados, atualizados ou removidos durante a execução da aplicação NÃO serão mantidos em um banco de dados

Ao encerrar e iniciar novamente, a lista de itens volta aos valores predefinidos inicialmente no código

# Collection

### A Collection utilizada para os testes está dentro da pasta "Bruno" no repositório
A collection contém as seguintes requisições para testar a API:
- GET todos os itens
- GET item por ID
- POST item
- PUT item
- DELETE item

# Vídeos de Demonstração
### Explicação do código:
https://youtu.be/tF6A7APK4HA
### Testes da API no Bruno:
https://youtu.be/QANkY4k3YW4

Nos vídeos são demonstrados a execução da aplicação e os testes dos endpoints utilizando a Collection, assim como a demonstração do código da API em C#