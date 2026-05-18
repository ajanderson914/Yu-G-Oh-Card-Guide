async function loadCards() {
    const response = await fetch('/cards');
    const data = await response.json();

    displayCards(data.data);
}

async function searchCards() {
    const searchInput = document.getElementById('cardSearch').value;

    const response = await fetch('/cards?search=' + searchInput);
    const data = await response.json();

    displayCards(data.data);
}

function displayCards(cards) {
    const cardResults = document.getElementById('cardResults');
    cardResults.innerHTML = '';

    cards.forEach(function(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-aos', 'fade-up');

        cardDiv.innerHTML = `
            <h3>${card.name}</h3>
            <img src="${card.card_images[0].image_url}" width="200">
            <p><strong>Type:</strong> ${card.type}</p>
            <p>${card.desc}</p>
            <button onclick="saveCard('${card.id}', '${card.name}', '${card.type}', '${card.card_images[0].image_url}', \`${card.desc}\`)">
                Save Card
            </button>
        `;

        cardResults.appendChild(cardDiv);
    });

    AOS.init();
}

async function saveCard(cardId, name, type, imageUrl, description) {
    const cardData = {
        card_id: cardId,
        name: name,
        type: type,
        image_url: imageUrl,
        description: description
    };

    const response = await fetch('/saved-cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    });

    if (response.ok) {
        Swal.fire('Saved!', 'The card was saved to My Cards.', 'success');
    } else {
        Swal.fire('Error', 'The card could not be saved.', 'error');
    }
}

window.onload = function() {
    loadCards();
};