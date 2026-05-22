const laptops = [
    {
        name: "ASUS ROG Strix",
        description: "Intel i7 / RTX 4070 / 16GB RAM",
        price: 89999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Lenovo Legion 5",
        description: "Ryzen 7 / RTX 4060 / 16GB RAM",
        price: 72999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "MacBook Pro M3",
        description: "Apple M3 / 18GB RAM / 512GB SSD",
        price: 104999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "HP Omen",
        description: "Intel i9 / RTX 4080 / 32GB RAM",
        price: 119999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Acer Nitro 5",
        description: "Ryzen 5 / RTX 4050 / 16GB RAM",
        price: 54999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "MSI Katana",
        description: "Intel i7 / RTX 4060 / 16GB RAM",
        price: 69999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Dell XPS 15",
        description: "Intel i7 / OLED / 32GB RAM",
        price: 94999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Gigabyte G5",
        description: "Intel i5 / RTX 4050 / 16GB RAM",
        price: 49999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Huawei MateBook",
        description: "Intel Ultra 7 / 16GB RAM",
        price: 58999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "ASUS ZenBook",
        description: "Intel Ultra 9 / 32GB RAM",
        price: 84999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Razer Blade 16",
        description: "Intel i9 / RTX 4090 / 32GB RAM",
        price: 159999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Samsung Galaxy Book",
        description: "Intel i7 / AMOLED / 16GB RAM",
        price: 67999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Alienware M18",
        description: "Intel i9 / RTX 4090 / 64GB RAM",
        price: 189999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Lenovo IdeaPad",
        description: "Ryzen 5 / 8GB RAM / 512GB SSD",
        price: 34999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "Acer Predator",
        description: "Intel i7 / RTX 4070 / 32GB RAM",
        price: 98999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "MSI Stealth",
        description: "Intel i9 / RTX 4080 / 32GB RAM",
        price: 132999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "HP Victus",
        description: "Ryzen 7 / RTX 4060 / 16GB RAM",
        price: 63999,
        imageUrl: "",
        category: "laptops"
    },
    {
        name: "MacBook Air M2",
        description: "Apple M2 / 16GB RAM / 256GB SSD",
        price: 59999,
        imageUrl: "",
        category: "laptops"
    }
];

const products = document.getElementById("products");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const sortSelect = document.getElementById("sortSelect");

let currentPage = 1;
const itemsPerPage = 6;
let totalPages = 1;
let allFetchedProducts = []; 

const currentCategory = "laptops"; 

async function fetchProducts() {
    try {
        const searchQuery = searchInput.value.trim();
        const sortOrder = sortSelect.value;
        
        const url = `http://localhost:5129/api/products?category=${currentCategory}&search=${encodeURIComponent(searchQuery)}&sort=${sortOrder}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        allFetchedProducts = await response.json();
        
        totalPages = Math.ceil(allFetchedProducts.length / itemsPerPage) || 1;
        currentPage = 1; 
        
        renderProducts();
    } catch (error) {
        console.error("Помилка завантаження товарів:", error);
        products.innerHTML = `<h2 style="color: red; text-align: center;">Не вдалося з'єднатися з сервером</h2>`;
    }
}

function renderProducts() {
    products.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentItems = allFetchedProducts.slice(start, end);

    if (currentItems.length === 0) {
        products.innerHTML = `<h2 style="grid-column: 1 / -1; text-align: center; color: #8ba3b1;">Товарів не знайдено</h2>`;
        pageInfo.textContent = `0 / 0`;
        return;
    }

    currentItems.forEach(item => {
        const formattedPrice = item.price.toLocaleString('uk-UA');

        products.innerHTML += `
        <div class="card">
            <div class="card-content">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <div class="price">${formattedPrice} ₴</div>
                <button class="buy-btn" onclick="addToCart(${item.id})">Купити</button>
            </div>
        </div>
        `;
    });

    pageInfo.textContent = `${currentPage} / ${totalPages}`;
}

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

searchBtn.addEventListener("click", fetchProducts);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchProducts();
    }
});

sortSelect.addEventListener("change", fetchProducts);

fetchProducts();

const modal = document.getElementById("simpleModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const modalContent = {
    "Про нас": { title: "Про нас", text: "Ми — Cyber Shop, магазин техніки майбутнього. Забезпечуємо найкращі ціни та якість." },
    "Доставка": { title: "Доставка", text: "Доставляємо Новою Поштою по всій Україні: Київ, Львів, Одеса, Дніпро та інші міста." },
    "Контакти": { title: "Контакти", text: "Telegram: @cybershop_bot<br>Instagram: @cyber_shop_ua<br>Email: support@cybershop.ua" },
    "Підтримка": { title: "Підтримка", text: "Гаряча лінія: 0 800 123 456<br>Працюємо щодня з 9:00 до 21:00" },
    "Допомога": { title: "Допомога", text: "Використовуйте каталог для пошуку товарів. Натискайте 'Купити' для оформлення замовлення." },
    "👤": { title: "Авторизація", text: "Тут незабаром буде підключена бекенд-логіка для входу та реєстрації." },
    "⚖": { title: "Порівняння", text: "Ви ще не додали жодного товару для порівняння характеристик." },
    "🛒": { title: "Кошик", text: "Ваш кошик порожній. Перейдіть до каталогу, щоб додати товари." }
};

const navLinks = document.querySelectorAll('.top-links a, .top-right a');
const headerIcons = document.querySelectorAll('.right-icons .icon');

function openModal(key) {
    if (modalContent[key]) {
        modalTitle.textContent = modalContent[key].title;
        modalText.innerHTML = modalContent[key].text; 
        modal.classList.add("active");
    }
}

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); 
        openModal(e.target.textContent.trim());
    });
});

headerIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        openModal(e.target.textContent.trim());
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

async function addToCart(productId) {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        alert("Будь ласка, увійдіть в акаунт, щоб додавати товари в кошик!");
        return;
    }

    try {
        const res = await fetch("http://localhost:5129/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ productId: productId, quantity: 1 })
        });

        if (res.ok) {
            alert("Товар успішно додано до кошика!");
        } else {
            alert("Помилка додавання. Спробуйте ще раз.");
        }
    } catch (err) {
        console.error(err);
        alert("Помилка з'єднання з сервером.");
    }
}

window.removeFromCart = async function(cartItemId) {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
        const res = await fetch(`http://localhost:5129/api/cart/${cartItemId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
            const modalText = document.getElementById("modalText");
            modalText.innerHTML = "<p>Оновлення...</p>";
            modalText.innerHTML = await loadCartData();
        } else {
            alert("Помилка видалення.");
        }
    } catch (err) {
        alert("Помилка з'єднання.");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("simpleModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const closeModal = document.getElementById("closeModal");

    if (!modal) return;

    const token = localStorage.getItem("jwtToken");

    const authFormHTML = `
        <input type="text" id="authUsername" placeholder="Логін" style="width:100%; margin-bottom:10px; padding:10px; border-radius:8px; border:2px solid #00e5ff; background:#09131d; color:white; outline:none;">
        <input type="password" id="authPassword" placeholder="Пароль" style="width:100%; margin-bottom:15px; padding:10px; border-radius:8px; border:2px solid #00e5ff; background:#09131d; color:white; outline:none;">
        <button id="btnLogin" class="buy-btn" style="margin-bottom:10px;">Увійти</button>
        <button id="btnRegister" class="buy-btn" style="background:transparent; border:2px solid #00ff99; color:#00ff99;">Зареєструватися</button>
        <p id="authMessage" style="margin-top:15px; font-size:14px; color:#00e5ff;"></p>
    `;

    const loggedInHTML = `
        <p style="margin-bottom:20px; color:#00ff99;">Ви успішно авторизовані в системі!</p>
        <button id="btnLogout" class="buy-btn" style="background:#ff3366; color:white;">Вийти з акаунта</button>
    `;

    const modalContent = {
        "Про нас": { title: "Про нас", text: "Ми — Cyber Shop, магазин техніки майбутнього." },
        "Доставка": { title: "Доставка", text: "Доставляємо Новою Поштою по всій Україні." },
        "Контакти": { title: "Контакти", text: "Telegram: @cybershop_bot<br>Email: support@cybershop.ua" },
        "Підтримка": { title: "Підтримка", text: "Гаряча лінія: 0 800 123 456" },
        "Допомога": { title: "Допомога", text: "Використовуйте каталог для пошуку товарів." },
        "👤": { 
            title: token ? "Особистий кабінет" : "Авторизація", 
            text: token ? loggedInHTML : authFormHTML 
        },
        "⚖": { title: "Порівняння", text: "Ви ще не додали жодного товару." },
        "🛒": { title: "Кошик", text: "Ваш кошик порожній." }
    };

    const navLinks = document.querySelectorAll('.top-links a, .top-right a');
    const headerIcons = document.querySelectorAll('.right-icons .icon');

    window.loadCartData = async function() {
        const token = localStorage.getItem("jwtToken");
        if (!token) return "<p style='color:#ff3366'>Увійдіть в акаунт, щоб побачити свій кошик.</p>";

        try {
            const res = await fetch("http://localhost:5129/api/cart", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (!res.ok) return "<p style='color:red'>Помилка завантаження</p>";

            const cartItems = await res.json();
            if (cartItems.length === 0) return "<p>Ваш кошик порожній.</p>";

            let html = "<ul style='list-style:none; padding:0; text-align:left;'>";
            let total = 0;
            
            cartItems.forEach(item => {
                const formattedPrice = item.totalPrice.toLocaleString('uk-UA');
                html += `<li style='margin-bottom:10px; border-bottom:1px solid #00e5ff33; padding-bottom:5px; display:flex; justify-content:space-between; align-items:center;'>
                    <span><span style='color:#00ff99'>${item.productName}</span> (x${item.quantity}) - ${formattedPrice} ₴</span>
                    <button onclick="removeFromCart(${item.id})" style="background:#ff3366; color:white; border:none; border-radius:5px; cursor:pointer; padding:2px 8px; font-weight:bold;">✕</button>
                </li>`;
                total += item.totalPrice;
            });
            
            html += `</ul><h3 style='color:#00e5ff; margin-top:15px;'>Всього: ${total.toLocaleString('uk-UA')} ₴</h3>`;
            return html;
            
        } catch (err) {
            return "<p>Помилка сервера</p>";
        }
    }

    async function openModal(key) {
        if (modalContent[key]) {
            modalTitle.textContent = modalContent[key].title;
            
            if (key === "🛒") {
                modalText.innerHTML = "Завантаження...";
                modal.classList.add("active");
                modalText.innerHTML = await loadCartData();
            } else {
                modalText.innerHTML = modalContent[key].text; 
                modal.classList.add("active");
            }

            if (key === "👤") {
                setupAuthLogic();
            }
        }
    }

    function setupAuthLogic() {
        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout) {
            btnLogout.addEventListener("click", () => {
                localStorage.removeItem("jwtToken"); 
                location.reload(); 
            });
            return;
        }

        const btnLogin = document.getElementById("btnLogin");
        const btnRegister = document.getElementById("btnRegister");
        const msg = document.getElementById("authMessage");

        btnRegister.addEventListener("click", async () => {
            const u = document.getElementById("authUsername").value.trim();
            const p = document.getElementById("authPassword").value.trim();
            
            if(!u || !p) return msg.textContent = "Заповніть всі поля!";

            try {
                const res = await fetch("http://localhost:5129/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: u, password: p })
                });

                if (res.ok) {
                    msg.style.color = "#00ff99";
                    msg.textContent = "Реєстрація успішна! Тепер увійдіть.";
                } else {
                    msg.style.color = "#ff3366";
                    msg.textContent = await res.text();
                }
            } catch (err) {
                msg.textContent = "Помилка з'єднання з сервером.";
            }
        });

        btnLogin.addEventListener("click", async () => {
            const u = document.getElementById("authUsername").value.trim();
            const p = document.getElementById("authPassword").value.trim();

            if(!u || !p) return msg.textContent = "Заповніть всі поля!";

            try {
                const res = await fetch("http://localhost:5129/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: u, password: p })
                });

                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem("jwtToken", data.token);
                    msg.style.color = "#00ff99";
                    msg.textContent = "Вхід успішний!";
                    
                    setTimeout(() => location.reload(), 1000);
                } else {
                    msg.style.color = "#ff3366";
                    msg.textContent = await res.text();
                }
            } catch (err) {
                msg.textContent = "Помилка з'єднання з сервером.";
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            openModal(e.target.textContent.trim());
        });
    });

    headerIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
            openModal(e.target.textContent.trim());
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});