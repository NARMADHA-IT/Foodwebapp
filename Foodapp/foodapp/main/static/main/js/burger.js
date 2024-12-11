const burgers = [
    { name: "Classic Beef Burger", price: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeJSDKNyFyYjgwZzrLaXEYtERujvLqhcgFtvpoRHgMo1N5qgXKWIL61XhWrX7fbN2Szr4&usqp=CAU" },
    { name: "Chicken Burger", price: 220, img: "https://www.recipetineats.com/tachyon/2019/08/Avocado-Chicken-Burgers_9.jpg?resize=500%2C375" },
    { name: "Cheese Burger", price: 280, img: "https://png.pngtree.com/background/20230426/original/pngtree-large-burger-with-cheese-picture-image_2484848.jpg" },
    { name: "Veggie Burger", price: 200, img: "https://static.vecteezy.com/system/resources/previews/030/655/157/non_2x/veggie-burger-on-wholegrain-bun-with-lettuce-tomato-free-photo.jpg" },
    { name: "Bacon Burger", price: 300, img: "https://media.istockphoto.com/id/520215281/photo/bacon-burger.jpg?s=612x612&w=0&k=20&c=oeN1zlDU0_CiXXbSaH9ugzdUqaUmaUXUJXmLn-pw4jM=" },
    { name: "Mushroom Swiss Burger", price: 270, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwWBjbQILJI0lct99KJc9jidGz77Npnw-x5Q&s" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage

// Function to display burgers
function displayBurgers(filteredBurgers) {
    const burgerCards = document.querySelector('.burger-cards');
    burgerCards.innerHTML = ''; // Clear existing cards
    filteredBurgers.forEach(burger => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${burger.img}" alt="${burger.name}">
            <div class="burger-info">
                <p>${burger.name} - ₹${burger.price}</p>
                <button class="add-to-cart" data-name="${burger.name}" data-price="${burger.price}">Add to Cart</button>
            </div>
        `;
        burgerCards.appendChild(card);
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

// Initial display of all burgers
displayBurgers(burgers);

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredBurgers = burgers.filter(burger => burger.name.toLowerCase().includes(searchValue));
    displayBurgers(filteredBurgers);
});

// Sort functionality
document.getElementById('sort-button').addEventListener('click', () => {
    const sortValue = document.getElementById('sort-select').value;
    let sortedBurgers;

    if (sortValue === "low-to-high") {
        sortedBurgers = [...burgers].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
        sortedBurgers = [...burgers].sort((a, b) => b.price - a.price);
    } else {
        sortedBurgers = burgers; // Default, no sorting
    }

    displayBurgers(sortedBurgers);
});

// Call this function on page load to set initial cart count
updateCartCount();
