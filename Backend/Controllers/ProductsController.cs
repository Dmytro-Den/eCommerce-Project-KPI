using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] string sort = "")
        {
            var productsList = await _context.Products.ToListAsync();

            if (sort == "")
            {
                return Ok(productsList);
            }

            var products = productsList.ToArray();
            int n = products.Length;

            for (int i = 0; i < n - 1; i++)
            {
                for (int j = 0; j < n - i - 1; j++)
                {
                    bool shouldSwap = false;

                    if (sort.ToLower() == "asc")
                    {
                        if (products[j].Price > products[j + 1].Price)
                        {
                            shouldSwap = true;
                        }
                    }
                    else if (sort.ToLower() == "desc")
                    {
                        if (products[j].Price < products[j + 1].Price)
                        {
                            shouldSwap = true;
                        }
                    }

                    if (shouldSwap == true)
                    {
                        var temp = products[j];
                        products[j] = products[j + 1];
                        products[j + 1] = temp;
                    }
                }
            }

            return Ok(products.ToList());
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            string extractedKey = Request.Headers["Admin-Key"].ToString();

            if (extractedKey != "secret123")
            {
                return Unauthorized(new { message = "Доступ заборонено. Неправильний ключ." });
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
        }
    }
}