using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options => options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api", () => "Central de Peças está online!");

app.MapGet("/api/items", async (ApiDbContext db) => {
    var items = await db.Hardware.ToListAsync();
    return Results.Ok(items);
});

app.MapGet("/api/items/{id:int}", async (int id, ApiDbContext db) => {
    var item = await db.Hardware.FindAsync(id);

    if (item is null) {
        return Results.NotFound();
    }

    return Results.Ok(item);
});

app.MapPost("/api/items", async (HardwareEntity data, ApiDbContext db) => {
    db.Hardware.Add(data);

    await db.SaveChangesAsync();

    return Results.Created($"/api/items/{data.Id}", data);
});

app.MapPut("/api/items/{id:int}", async (int id, NewItemDTO data, ApiDbContext db) => {
    var item = await db.Hardware.FindAsync(id);

    if (item is null) {
        return Results.NotFound();   
    }

    item.Name = data.Name;
    item.Price = data.Price;

    await db.SaveChangesAsync();

    return Results.Ok(item);
});

app.MapDelete("/api/items/{id:int}", async (int id, ApiDbContext db) => {
    var item = await db.Hardware.FindAsync(id);

    if (item is null) {
        return Results.NotFound();
    }

    db.Hardware.Remove(item);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();

record ItemDTO(int Id, string Name, double Price);
record NewItemDTO(string Name, double Price);

class HardwareEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public double Price { get; set; }
}

class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options){}

    public DbSet<HardwareEntity> Hardware => Set<HardwareEntity>();
}
