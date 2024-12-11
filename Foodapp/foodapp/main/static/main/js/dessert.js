const desserts = [
    { name: "Chocolate Cake", price: 250, img: "https://img.freepik.com/premium-photo/chocolate-cake-with-chocolate-frosting-strawberries-plate_1271802-16886.jpg?semt=ais_hybrid" },
    { name: "Cheesecake", price: 300, img: "https://img.freepik.com/premium-photo/special-homemade-cheesecake-with-fresh_779468-1212.jpg" },
    { name: "Ice Cream", price: 150, img: "https://agronfoodprocessing.com/wp-content/uploads/2024/04/24.jpg" },
    { name: "Fruit Tart", price: 200, img: "https://i.redd.it/jyv8qtf5e8u71.jpg" },
    { name: "Brownie", price: 180, img: "https://img.freepik.com/premium-photo/professional-food-photography-chocolate-brownie-with-walnuts_964851-12202.jpg" },
    { name: "Panna Cotta", price: 220, img: "https://t3.ftcdn.net/jpg/05/74/34/74/360_F_574347484_kMCVPFMxQyi5lwXXi9GwHBGpHZX4aFN0.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage

// Function to display desserts
function displayDesserts(filteredDesserts) {
    const dessertCards = document.querySelector('.dessert-cards');
    dessertCards.innerHTML = ''; // Clear existing cards
    filteredDesserts.forEach(dessert => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${dessert.img}" alt="${dessert.name}">
            <div class="dessert-info">
                <p>${dessert.name} - ₹${dessert.price}</p>
                <button class="add-to-cart" data-name="${dessert.name}" data-price="${dessert.price}">Add to Cart</button>
            </div>
        `;
        dessertCards.appendChild(card);
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

// Initial display of all desserts
displayDesserts(desserts);

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredDesserts = desserts.filter(dessert => dessert.name.toLowerCase().includes(searchValue));
    displayDesserts(filteredDesserts);
});

// Sort functionality
document.getElementById('sort-button').addEventListener('click', () => {
    const sortValue = document.getElementById('sort-select').value;
    let sortedDesserts;

    if (sortValue === "low-to-high") {
        sortedDesserts = [...desserts].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
        sortedDesserts = [...desserts].sort((a, b) => b.price - a.price);
    } else {
        sortedDesserts = desserts; // Default, no sorting
    }

    displayDesserts(sortedDesserts);
});

// Call this function on page load to set initial cart count
updateCartCount();
