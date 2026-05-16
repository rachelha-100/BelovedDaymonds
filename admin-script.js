// Mock data storage
let jewelryItems = [];

// Load items from localStorage
function loadItems() {
    const stored = localStorage.getItem('jewelryItems');
    if (stored) {
        jewelryItems = JSON.parse(stored);
    } else {
        // Default items
        jewelryItems = [
            {
                id: 1,
                title: 'עגילים יהלום',
                category: 'earrings',
                imageUrl: 'https://via.placeholder.com/280x250?text=Diamond+Earrings',
                description: 'עגילים אלגנטיים עם יהלום'
            },
            {
                id: 2,
                title: 'טבעת נישואין',
                category: 'rings',
                imageUrl: 'https://via.placeholder.com/280x250?text=Wedding+Ring',
                description: 'טבעת נישואין קלאסית'
            },
            {
                id: 3,
                title: 'צמיד זהב',
                category: 'bracelets',
                imageUrl: 'https://via.placeholder.com/280x250?text=Gold+Bracelet',
                description: 'צמיד זהב יוקרתי'
            },
            {
                id: 4,
                title: 'שרשרת יהלום',
                category: 'necklaces',
                imageUrl: 'https://via.placeholder.com/280x250?text=Diamond+Necklace',
                description: 'שרשרת עם יהלום'
            },
            {
                id: 5,
                title: 'סט תכשיטים יוקרתי',
                category: 'sets',
                imageUrl: 'https://via.placeholder.com/280x250?text=Jewelry+Set',
                description: 'סט תכשיטים מלא'
            }
        ];
        saveItems();
    }
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem('jewelryItems', JSON.stringify(jewelryItems));
}

// Handle form submission
document.getElementById('addJewelryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    
    if (!imageInput.files[0]) {
        alert('בחר תמונה בבקשה');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const newItem = {
            id: Date.now(),
            title: title,
            category: category,
            imageUrl: e.target.result,
            description: description
        };
        
        jewelryItems.push(newItem);
        saveItems();
        renderItems();
        this.reset();
        document.getElementById('imagePreview').innerHTML = '';
        alert('התכשיט הוסף בהצלחה!');
    };
    reader.readAsDataURL(imageInput.files[0]);
});

// Handle image preview
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// Render items list
function renderItems() {
    const itemsList = document.getElementById('itemsList');
    
    if (jewelryItems.length === 0) {
        itemsList.innerHTML = '<div class="empty-state">אין תכשיטים עדיין</div>';
        return;
    }
    
    itemsList.innerHTML = '';
    
    const categoryLabels = {
        'sets': 'סט תכשיטים',
        'earrings': 'עגילים',
        'rings': 'טבעות',
        'bracelets': 'צמידים',
        'necklaces': 'שרשרות'
    };
    
    jewelryItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="item-card-content">
                <div class="item-card-title" title="${item.title}">${item.title}</div>
                <div class="item-card-category">${categoryLabels[item.category]}</div>
                <button class="btn-delete" onclick="deleteItem(${item.id})">מחק</button>
            </div>
        `;
        itemsList.appendChild(card);
    });
}

// Delete item
function deleteItem(id) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התכשיט?')) {
        jewelryItems = jewelryItems.filter(item => item.id !== id);
        saveItems();
        renderItems();
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    loadItems();
    renderItems();
});