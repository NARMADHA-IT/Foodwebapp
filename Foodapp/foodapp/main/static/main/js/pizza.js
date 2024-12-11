const pizzas = [
    { name: "Margherita Pizza", price: 450, img: "https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?s=612x612&w=0&k=20&c=CFDDjavIC5l8Zska16UZRZDXDwd47fwmRsUNzY0Ym6o=" },
    { name: "Pepperoni Pizza", price: 500, img: "https://static.wixstatic.com/media/92be87_bd29ffb7fc444234a7e96133f3b723fc~mv2.jpg/v1/fill/w_480,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/92be87_bd29ffb7fc444234a7e96133f3b723fc~mv2.jpg" },
    { name: "Veggie Pizza", price: 400, img: "https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-thumb.jpg" },
    { name: "BBQ Chicken Pizza", price: 550, img: "https://bakingmischief.com/wp-content/uploads/2020/08/bbq-chicken-pizza-image-square-2.jpg" },
    { name: "Hawaiian Pizza", price: 680, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhd2FpaWFuJTIwcGl6emF8ZW58MHx8MHx8fDA%3D" },
    { name: "Meat Lovers Pizza", price: 800, img: "https://www.thecookierookie.com/wp-content/uploads/2023/09/meat-lovers-pizza-recipe-3.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage

// Function to display pizzas
function displayPizzas(filteredPizzas) {
    const pizzaCards = document.querySelector('.pizza-cards');
    pizzaCards.innerHTML = ''; // Clear existing cards
    filteredPizzas.forEach(pizza => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${pizza.img}" alt="${pizza.name}">
            <div class="pizza-info">
                <p>${pizza.name} - ₹${pizza.price}</p>
                <button class="add-to-cart" data-name="${pizza.name}" data-price="${pizza.price}">Add to Cart</button>
            </div>
        `;
        pizzaCards.appendChild(card);
    });

    // Attach event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseInt(event.target.getAttribute('data-price'), 10);
            addToCart(name, price);
        });
    });
}

// Function to update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length; // Set the text to the number of items in cart
}

// Function to add items to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    alert(`${name} has been added to your cart!`);
    updateCartCount(); // Update the cart count display
}

// Initial display of all pizzas
displayPizzas(pizzas);

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredPizzas = pizzas.filter(pizza => pizza.name.toLowerCase().includes(searchValue));
    displayPizzas(filteredPizzas);
});

// Sort functionality
document.getElementById('sort-button').addEventListener('click', () => {
    const sortValue = document.getElementById('sort-select').value;
    let sortedPizzas;

    if (sortValue === "low-to-high") {
        sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
        sortedPizzas = [...pizzas].sort((a, b) => b.price - a.price);
    } else {
        sortedPizzas = pizzas; // Default to original order if no sorting is selected
    }
    displayPizzas(sortedPizzas);
});

// Initial update of cart count when the page loads
updateCartCount();
