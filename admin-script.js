// Data storage
let jewelryItems = [];

function loadItems() {
    const stored = localStorage.getItem('jewelryItems');

    if (stored) {
        try {
            jewelryItems = JSON.parse(stored);
        } catch {
            jewelryItems = [];
        }
    }

    if (!stored) {
        jewelryItems = [
            { id: 1, title: 'עגילים יהלום', category: 'earrings', imageUrl: 'https://via.placeholder.com/280x250?text=Diamond+Earrings', description: 'עגילים אלגנטיים עם יהלום' },
            { id: 2, title: 'טבעת נישואין', category: 'rings', imageUrl: 'https://via.placeholder.com/280x250?text=Wedding+Ring', description: 'טבעת נישואין קלאסית' },
            { id: 3, title: 'צמיד זהב', category: 'bracelets', imageUrl: 'https://via.placeholder.com/280x250?text=Gold+Bracelet', description: 'צמיד זהב יוקרתי' },
            { id: 4, title: 'שרשרת יהלום', category: 'necklaces', imageUrl: 'https://via.placeholder.com/280x250?text=Diamond+Necklace', description: 'שרשרת עם יהלום' },
            { id: 5, title: 'סט תכשיטים יוקרתי', category: 'sets', imageUrl: 'https://via.placeholder.com/280x250?text=Jewelry+Set', description: 'סט תכשיטים מלא' }
        ];
        saveItems();
    }
}

function saveItems() {
    localStorage.setItem('jewelryItems', JSON.stringify(jewelryItems));
}

document.getElementById('addJewelryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const imageInput = document.getElementById('imageInput');

    if (!imageInput.files[0]) {
        alert('בחר תמונה בבקשה');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const newItem = {
            id: Date.now(),
            title,
            category,
            imageUrl: event.target.result,
            description
        };

        jewelryItems.push(newItem);
        saveItems();
        renderItems();
        document.getElementById('addJewelryForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
        alert('התכשיט הוסף בהצלחה!');
    };

    reader.readAsDataURL(imageInput.files[0]);
});

document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (!file) {
        document.getElementById('imagePreview').innerHTML = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        document.getElementById('imagePreview').innerHTML =
            `<img src="${event.target.result}" alt="תצוגה מקדימה">`;
    };

    reader.readAsDataURL(file);
});

function renderItems() {
    const itemsList = document.getElementById('itemsList');

    if (jewelryItems.length === 0) {
        itemsList.innerHTML = '<div class="empty-state">אין תכשיטים עדיין</div>';
        return;
    }

    itemsList.innerHTML = '';

    const categoryLabels = {
        sets: 'סט תכשיטים',
        earrings: 'עגילים',
        rings: 'טבעות',
        bracelets: 'צמידים',
        necklaces: 'שרשרות'
    };

    jewelryItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="item-card-content">
                <div class="item-card-title" title="${item.title}">${item.title}</div>
                <div class="item-card-category">${categoryLabels[item.category] || item.category}</div>
                <button class="btn-delete" onclick="deleteItem(${item.id})">מחק</button>
            </div>
        `;

        itemsList.appendChild(card);
    });
}

function deleteItem(id) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התכשיט?')) {
        jewelryItems = jewelryItems.filter(item => item.id !== id);
        saveItems();
        renderItems();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadItems();
    renderItems();
});
