using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdString!);
        }

        [HttpGet]
        public async Task<ActionResult> GetCart()
        {
            int userId = GetUserId();
            
            var cartItems = await _context.CartItems
                .Include(c => c.Product) 
                .Where(c => c.UserId == userId)
                .Select(c => new {
                    c.Id,
                    c.ProductId,
                    ProductName = c.Product!.Name,
                    c.Product.Price,
                    c.Quantity,
                    TotalPrice = c.Product.Price * c.Quantity
                })
                .ToListAsync();

            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<ActionResult> AddToCart(AddToCartDto request)
        {
            int userId = GetUserId();

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return NotFound("Товар не знайдено");

            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == request.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    UserId = userId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Товар додано до кошика!" });
        }

        [HttpDelete("{cartItemId}")]
        public async Task<ActionResult> RemoveFromCart(int cartItemId)
        {
            int userId = GetUserId();
            
            var item = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId);
            
            if (item == null) return NotFound("Товар не знайдено");

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            
            return Ok(new { message = "Товар видалено" });
        }
    }
}