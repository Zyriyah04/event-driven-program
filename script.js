// Array to keep track of the selected fruits and their prices
let basket = [];
let totalCost = 0;

// Function to handle fruit selection by clicking on it
function handleFruitClick(event) {
    const fruit = event.target.closest('.fruit');
    if (fruit) {
        const fruitName = fruit.getAttribute('data-name');
        const fruitPrice = parseFloat(fruit.getAttribute('data-price'));

        // Check if the fruit is already in the basket
        const existingFruitIndex = basket.findIndex(item => item.name === fruitName);

        if (existingFruitIndex > -1) {
            // Remove the fruit from the basket
            basket.splice(existingFruitIndex, 1);
            totalCost -= fruitPrice;
        } else {
            // Add the fruit to the basket
            basket.push({ name: fruitName, price: fruitPrice });
            totalCost += fruitPrice;
        }

        updateBasket();
        updateFruitSelection(fruit);
    }
}

// Function to handle fruit 
function handleFruitConfirm(event) {
    if (event.key === 'Enter') {
        const selectedFruit = document.querySelector('.selected');
        if (selectedFruit) {
            const fruitName = selectedFruit.getAttribute('data-name');
            const fruitPrice = parseFloat(selectedFruit.getAttribute('data-price'));

            // Check if the fruit is already in the basket
            const existingFruitIndex = basket.findIndex(item => item.name === fruitName);

            if (existingFruitIndex > -1) {
                // Remove the fruit from the basket
                basket.splice(existingFruitIndex, 1);
                totalCost -= fruitPrice;
            } else {
                // Add the fruit to the basket
                basket.push({ name: fruitName, price: fruitPrice });
                totalCost += fruitPrice;
            }

            updateBasket();
        }
    }
}

// Function to handle fruit information preview 
function handleFruitHover(event) {
    const fruit = event.target.closest('.fruit');
    if (fruit) {
        const fruitInfo = fruit.getAttribute('data-info');
        document.getElementById('fruit-info').innerText = `Fruit Info: ${fruitInfo}`;
    }
}

// Function to update the basket display
function updateBasket() {
    const basketItems = document.getElementById('basket-items');
    basketItems.innerHTML = ''; // Clear the items

    basket.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - ${item.price} coins`;
        basketItems.appendChild(listItem);
    });

    document.getElementById('total-cost').innerText = totalCost;
}

// Function to update the selected fruit
function updateFruitSelection(selectedFruit) {
    document.querySelectorAll('.fruit').forEach(el => el.classList.remove('selected'));
    selectedFruit.classList.add('selected');
}

// Event listeners
document.getElementById('fruit-selection').addEventListener('click', handleFruitClick);
document.addEventListener('keydown', handleFruitConfirm);
document.getElementById('fruit-selection').addEventListener('mouseover', handleFruitHover);
document.getElementById('fruit-selection').addEventListener('mouseout', () => {
    document.getElementById('fruit-info').innerText = 'Hover over a fruit to see details.';
});
