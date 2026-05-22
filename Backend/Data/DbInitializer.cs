using WebApi.Models;

namespace WebApi.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        if (context.Products.Any())
        {
            return;
        }

        var products = new Product[]
        {
            new Product { Name = "ASUS ROG Strix", Description = "Intel i7 / RTX 4070 / 16GB RAM", Price = 89999m, ImageUrl = "", Category = "laptops" },
            new Product { Name = "Lenovo Legion 5", Description = "Ryzen 7 / RTX 4060 / 16GB RAM", Price = 72999m, ImageUrl = "", Category = "laptops" },
            new Product { Name = "MacBook Air M2", Description = "Apple M2 / 16GB RAM / 256GB SSD", Price = 59999m, ImageUrl = "", Category = "laptops" },

            new Product { Name = "Sony WH-1000XM5", Description = "Noise Canceling", Price = 16999m, ImageUrl = "", Category = "headphones" },
            new Product { Name = "AirPods Pro 2", Description = "Apple / ANC", Price = 12999m, ImageUrl = "", Category = "headphones" },

            new Product { Name = "Samsung Odyssey G7", Description = "32 / 240Hz", Price = 29999m, ImageUrl = "", Category = "monitors" },
            new Product { Name = "LG UltraGear", Description = "27 / IPS / 165Hz", Price = 18999m, ImageUrl = "", Category = "monitors" },

            new Product { Name = "iPhone 15 Pro", Description = "256GB / Titanium", Price = 59999m, ImageUrl = "", Category = "phones" },
            new Product { Name = "Samsung S24 Ultra", Description = "512GB / Snapdragon", Price = 57999m, ImageUrl = "", Category = "phones" }
            
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}