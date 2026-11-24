namespace HardwareStore.Models;
using HardwareStore.Data;

public class HardwareEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public double Price { get; set; }
}