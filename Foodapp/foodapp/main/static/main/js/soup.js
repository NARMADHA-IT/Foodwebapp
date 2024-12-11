const soups = [
    { name: "Tomato Soup", price: 120, img: "https://www.shutterstock.com/image-photo/dish-made-tomatoes-tasty-tomato-600nw-2494122805.jpg" },
    { name: "Mushroom Soup", price: 150, img: "https://thumbs.dreamstime.com/b/wooden-s-stirring-crockpot-filled-creamy-mushroom-soup-317226672.jpg" },
    { name: "Chicken Soup", price: 180, img: "https://t4.ftcdn.net/jpg/04/72/62/29/360_F_472622913_00rkwfTqr8kuBjq7Y9glR0yTJlLsrrLG.jpg" },
    { name: "Vegetable Soup", price: 100, img: "https://t3.ftcdn.net/jpg/06/07/83/76/360_F_607837697_RaFl9VbfPVgQReI63ZoKsZNQCqKu0lI4.jpg" },
    { name: "Minestrone", price: 160, img: "https://midwestfoodieblog.com/wp-content/uploads/2021/10/FINAL-olive-garden-minestrone-soup-2-2.jpg" },
    { name: "Pumpkin Soup", price: 140, img: "https://www.twopeasandtheirpod.com/wp-content/uploads/2020/10/pumpkin-soup-4.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displaySoups(filteredSoups) {
    const soupCards = document.querySelector('.soup-cards');
    soupCards.innerHTML = '';
    filteredSoups.forEach(soup => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${soup.img}" alt="${soup.name}">
            <div class="soup-info">
                <p>${soup.name} - ₹${soup.price}</p>
                <button class="add-to-cart" data-name="${soup.name}" data-price="${soup.price}">Add to Cart</button>
            </div>
        `;
        soupCards.appendChild(card);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseInt(event.target.getAttribute('data-price'), 10);
            addToCart(name, price);
        });
    });
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
    updateCartCount();
}

displaySoups(soups);

document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredSoups = soups.filter(soup => soup.name.toLowerCase().includes(searchValue));
    displaySoups(filteredSoups);
});

document.getElementById('sort-button').addEventListener('click', () => {
    const sortValue = document.getElementById('sort-select').value;
    let sortedSoups;

    if (sortValue === "low-to-high") {
        sortedSoups = [...soups].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
        sortedSoups = [...soups].sort((a, b) => b.price - a.price);
    } else {
        sortedSoups = soups;
    }

    displaySoups(sortedSoups);
});

updateCartCount();
