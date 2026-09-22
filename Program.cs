var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var items = new List<ItemDTO>
{
    new ItemDTO(1, "NVIDIA RTX 4060", 2219.98),
    new ItemDTO(2, "Memória RAM 8GB DDR5", 2809.98)
};

app.MapGet("/", () => "Central de Peças está online!");
app.MapGet("/api/items", () =>
{
    return Results.Ok(items);
});
app.MapGet("/api/items/{id:int}", (int id) =>
{
    var item = items.Find(item => item.Id == id);

    if (item is null)
    {
        return Results.NotFound("Oops! Não tem nada aqui!");
    }
    return Results.Ok(item);
});


app.MapPost("/api/items", (NewItemDTO data) =>
{   
    int nextId = items.Count + 1;
    foreach (ItemDTO item in items)
    {
        if (item.Id == nextId)
        {
            nextId++;
        }
    }

    var newItem = new ItemDTO(nextId, data.Name, data.Price);

    items.Add(newItem);

    return Results.Created($"/api/items/{newItem.Id}", newItem);
});

app.MapPut("/api/items/{id:int}", (int id, NewItemDTO data) =>
{
    int index = items.FindIndex(item => item.Id == id);

    if (index == -1) // verifica se o índice existe ou não
    {
        return Results.NotFound("Índice não encontrado");
    }
    var updatedItem = new ItemDTO(id, data.Name, data.Price);

    items[index] = updatedItem;

    return Results.Ok(updatedItem);
});

app.MapDelete("/api/items/{id:int}", (int id) =>
{
    int index = items.FindIndex(item => item.Id == id);

    if (index == -1)
    {
        return Results.NotFound("Índice não encontrado");
    }
    items.RemoveAt(index);

    return Results.NoContent();
});

app.Run();

record ItemDTO(int Id, string Name, double Price);
record NewItemDTO(string Name, double Price);