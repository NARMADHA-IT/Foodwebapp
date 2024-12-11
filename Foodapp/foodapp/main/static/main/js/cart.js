const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsDiv = document.getElementById('cart-items');
const totalPriceDiv = document.getElementById('total-price');
const finalPriceDiv = document.getElementById('final-price');
const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');

// Function to display cart items and calculate total price
function displayCart() {
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceDiv.innerHTML = '';
        finalPriceDiv.innerHTML = '';
        payNowBtn.style.display = 'none'; // Hide Pay Now button when cart is empty
        return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = ''; // Clear the cart display
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ₹${item.price}`;
        
        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => removeItem(index)); // Remove item on click

        // Append item text and Remove button to itemDiv
        itemDiv.appendChild(removeButton);
        cartItemsDiv.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceDiv.textContent = `Total Price: ₹${total}`;
    updateFinalPrice(total); // Update the final price based on selected payment method
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    displayCart(); // Refresh the cart display
}

// Function to calculate and display final price
function updateFinalPrice(total) {
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
    let finalPrice = total;

    if (selectedPayment === 'cod') {
        finalPrice += 50; // Add ₹50 for Cash on Delivery
        payNowBtn.style.display = 'none'; // Hide "Pay Now" button for COD
    } else {
        payNowBtn.style.display = 'block'; // Show "Pay Now" button for GPay
    }

    finalPriceDiv.textContent = `Final Price: ₹${finalPrice}`;
}

// Event listeners for payment method change
paymentMethodInputs.forEach(input => {
    input.addEventListener('change', () => {
        const total = parseInt(totalPriceDiv.textContent.replace(/[^0-9]/g, ''), 10); // Get the original total price
        updateFinalPrice(total);
    });
});


// Display cart items on page load
displayCart();
