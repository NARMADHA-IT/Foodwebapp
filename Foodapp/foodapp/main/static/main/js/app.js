const sliders = document.querySelectorAll('.slider-btn');
sliders.forEach(button => {
    button.addEventListener('click', function() {
        const isNext = button.classList.contains('next');
        
        // Adjusted query to select the direct container sibling of the button
        const cardContainer = button.parentElement.querySelector('.category-cards') || button.parentElement.querySelector('.restaurant-cards');
        
        const scrollAmount = 300; // Adjust this value if needed based on card width and gap

        if (cardContainer) {
            cardContainer.scrollBy({ left: isNext ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        }
    });
});



        let currentSlide = 0;
        const totalSlides = 3;

        function moveSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            } else if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            document.querySelector('.gift-hamper-cards').style.transform = `translateX(${-currentSlide * 300}px)`;
        }

        // Set interval for automatic sliding
        setInterval(() => {
            moveSlide(1); // Move to the next slide every 2 seconds
        }, 2000); // 2000 milliseconds = 2 seconds

        // app.js

const items = [
    { name: "Gift Hampers 1", image: "https://www.kolkatagiftsonline.com/pic/GG07676.jpg" },
    { name: "Gift Hampers 2", image: "https://i.gifer.com/origin/11/11ecdb4bef25fc8e1001d4fc88b79293.gif" },
    { name: "Gift Hampers 3", image: "C:/Users/narma/Downloads/your_image.gif" }, // Use a valid URL or change this to a relative path
    { name: "Dessert", image: "https://images3.alphacoders.com/133/1338868.png" },
    { name: "Pizza", image: "https://rookie-chef.com/wp-content/uploads/2014/09/output_ekyotw.gif" },
    { name: "Burger", image: "https://images6.alphacoders.com/831/thumb-1920-831475.jpg" },
    { name: "Soups", image: "https://static.toiimg.com/thumb/62378548.cms?width=1200&height=900" },
    { name: "Drinks", image: "https://cdn.shopify.com/s/files/1/0517/4609/files/HD-Coca-Cola-Photos_large.jpg?v=1544425170" }
];

// Function to filter items based on search input
function searchItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const results = items.filter(item => item.name.toLowerCase().includes(searchInput));
    
    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const categoryCards = document.querySelector('.category-cards');
    categoryCards.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="#">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            </a>
        `;
        categoryCards.appendChild(card);
    });

    // If no results found, show a message
    if (results.length === 0) {
        categoryCards.innerHTML = '<p>No results found.</p>';
    }
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', searchItems);


