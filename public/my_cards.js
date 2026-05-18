async function loadSavedCards() {
    const response = await fetch('/saved-cards');
    const cards = await response.json();

    const savedCardsDiv = document.getElementById('savedCards');
    savedCardsDiv.innerHTML = '';

    cards.forEach(function(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-aos', 'zoom-in');

        cardDiv.innerHTML = `
            <h3>${card.name}</h3>
            <img src="${card.image_url}" width="200">
            <p><strong>Type:</strong> ${card.type}</p>
            <p>${card.description}</p>
        `;

        savedCardsDiv.appendChild(cardDiv);
    });

    AOS.init();
}

window.onload = function() {
    loadSavedCards();
};