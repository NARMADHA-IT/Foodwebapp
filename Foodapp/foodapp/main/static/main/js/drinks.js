const drinks = [
    { name: "Lemonade", price: 100, img: "https://img.freepik.com/premium-photo/lemonade-hd-8k-wallpaper-stock-photographic-image_890746-17535.jpg" },
    { name: "Iced Coffee", price: 150, img: "https://images7.alphacoders.com/132/1323971.png" },
    { name: "Fruit Smoothie", price: 200, img: "https://www.foodiesfeed.com/wp-content/uploads/2023/04/colorful-smoothies-with-fresh-berries.jpg" },
    { name: "Milkshake", price: 180, img: "https://png.pngtree.com/background/20230610/original/pngtree-four-milk-shakes-with-chocolate-ice-cream-in-the-bottles-picture-image_3054877.jpg" },
    { name: "Green Tea", price: 120, img: "https://img.freepik.com/premium-photo/green-tea-cup-attractive-engaging-hd-wallpaper-background-photo_853645-72283.jpg" },
    { name: "Coconut Water", price: 90, img: "https://static.toiimg.com/thumb/81238845/81238845.jpg?height=746&width=420&resizemode=76&imgsize=788304" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayDrinks(filteredDrinks) {
    const drinkCards = document.querySelector('.drink-cards');
    drinkCards.innerHTML = '';
    filteredDrinks.forEach(drink => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${drink.img}" alt="${drink.name}">
            <div class="drink-info">
                <p>${drink.name} - ₹${drink.price}</p>
                <button class="add-to-cart" data-name="${drink.name}" data-price="${drink.price}">Add to Cart</button>
            </div>
        `;
        drinkCards.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseInt(event.target.getAttribute('data-price'), 10);
            addToCart(name, price);
        });
    });
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
    updateCartCount();
}

displayDrinks(drinks);

document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredDrinks = drinks.filter(drink => drink.name.toLowerCase().includes(searchValue));
    displayDrinks(filteredDrinks);
});

document.getElementById('sort-button').addEventListener('click', () => {
    const sortValue = document.getElementById('sort-select').value;
    let sortedDrinks;

    if (sortValue === "low-to-high") {
        sortedDrinks = [...drinks].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
        sortedDrinks = [...drinks].sort((a, b) => b.price - a.price);
    } else {
        sortedDrinks = drinks;
    }

    displayDrinks(sortedDrinks);
});

updateCartCount();
