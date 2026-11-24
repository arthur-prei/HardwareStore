using HardwareStore.Data;
using HardwareStore.Dtos;
using HardwareStore.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options => options.UseSqlite(
    builder.Configuration.GetConnectionString("DefaultConnection")
));

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsJsonAsync(new
        {
            error = "Ocorreu um erro interno no servidor"
        });
    });
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api", () => "Central de Peças está online!");

app.MapGet("/api/items", async (ApiDbContext db) =>
{
    var items = await db.Hardware.ToListAsync();

    return Results.Ok(items);
});

app.MapGet("/api/items/{id:int}", async (int id, ApiDbContext db) =>
{
    var item = await db.Hardware.FindAsync(id);

    if (item is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(item);
});

app.MapPost("/api/items", async (HardwareEntity data, ApiDbContext db) =>
{
    db.Hardware.Add(data);

    await db.SaveChangesAsync();

    return Results.Created($"/api/items/{data.Id}", data);
});

app.MapPut("/api/items/{id:int}", async (int id, NewItemDTO data, ApiDbContext db) =>
{
    var item = await db.Hardware.FindAsync(id);

    if (item is null)
    {
        return Results.NotFound();
    }

    item.Name = data.Name;
    item.Price = data.Price;

    await db.SaveChangesAsync();

    return Results.Ok(item);
});

app.MapDelete("/api/items/{id:int}", async (int id, ApiDbContext db) =>
{
    var item = await db.Hardware.FindAsync(id);

    if (item is null)
    {
        return Results.NotFound();
    }

    db.Hardware.Remove(item);

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();