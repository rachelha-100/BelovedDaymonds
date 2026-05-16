// Mock data - will be replaced with Firebase/backend data
let jewelryItems = [
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

let currentCategory = 'all';

function showCategory(category) {
    currentCategory = category;
    updateTabButtons(category);
    renderGallery();
}

function updateTabButtons(activeCategory) {
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');

        if (btn.dataset.category === activeCategory) {
            btn.classList.add('active');
        }
    });
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const filteredItems = currentCategory === 'all' 
        ? jewelryItems 
        : jewelryItems.filter(item => item.category === currentCategory);

    if (filteredItems.length === 0) {
        gallery.innerHTML = '<div class="empty-state"><p>אין תכשיטים בקטגוריה זו עדיין</p></div>';
        return;
    }

    filteredItems.forEach(item => {
        const card = createJewelryCard(item);
        gallery.appendChild(card);
    });
}

function createJewelryCard(item) {
    const card = document.createElement('div');
    card.className = 'jewelry-card';
    
    const categoryLabels = {
        'sets': 'סט תכשיטים',
        'earrings': 'עגילים',
        'rings': 'טבעות',
        'bracelets': 'צמידים',
        'necklaces': 'שרשרות'
    };
    
    const whatsappMessage = encodeURIComponent(`שלום! אני מעוניין בתכשיט זה: ${item.title}\n\nלינק: ${window.location.href}#item-${item.id}`);
    const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;
    
    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" />
        <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-category">${categoryLabels[item.category] || item.category}</p>
            <a href="${whatsappLink}" target="_blank" class="whatsapp-btn">
                <span>📱 שלח בוואטסאפ</span>
            </a>
        </div>
    `;
    
    return card;
}

// Load data from localStorage (simulating database)
function loadFromStorage() {
    const stored = localStorage.getItem('jewelryItems');
    if (stored) {
        jewelryItems = JSON.parse(stored);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderGallery();
});
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        showCategory(button.dataset.category);
    });
});
