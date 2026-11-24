using HardwareStore.Models;
using Microsoft.EntityFrameworkCore;

namespace HardwareStore.Data;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }

    public DbSet<HardwareEntity> Hardware => Set<HardwareEntity>();
}