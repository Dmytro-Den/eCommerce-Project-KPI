# Електронний магазин (MVP)

## Архітектура бекенду (UML Class Diagram)

```mermaid
classDiagram
    class Product {
        +int Id
        +string Name
        +decimal Price
        +string Description
        +string ImageUrl
    }
    
    class AppDbContext {
        +DbSet~Product~ Products
    }
    
    class ProductsController {
        -AppDbContext _context
        +GetProducts(string sort) ActionResult
        +CreateProduct(Product product) ActionResult
    }
    
    ProductsController --> AppDbContext : Використовує
    AppDbContext --> Product : Керує