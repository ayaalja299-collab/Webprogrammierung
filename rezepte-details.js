// Webprogrammierung frontend/rezepte-details.js
const API_BASE = 'http://127.0.0.1:3000';

function getId() {
    const p = new URLSearchParams(location.search);
    return p.get('id');
}

async function fetchRecipe(id) {
    const res = await fetch(`${API_BASE}/recipes/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Rezept nicht gefunden');
    return await res.json();
}

function guessImage(name) {
    const lower = (name || '').toLowerCase();
    if (lower.includes('chocolate') || lower.includes('cake') || lower.includes('kuchen') || lower.includes('cheesecake')) return 'images/chocolate-cake.jpg';
    if (lower.includes('ratatouille') || lower.includes('gemüse')) return 'images/Ratatouille.jpg';
    if (lower.includes('apple') || lower.includes('apfel') || lower.includes('crumble') || lower.includes('pie')) return 'images/Apple Crumble.jpg';
    if (lower.includes('chicken tikka')) return 'images/Chicken Tikka Masala.jpg';
    if (lower.includes('risotto') || lower.includes('mushroom')) return 'images/Creamy Mushroom Risotto.jpg';
    if (lower.includes('quinoa')) return 'images/Quinoa-Gemüse-Bowl.jpg';
    if (lower.includes('harissa') || lower.includes('karotten')) return 'images/Harissa-Röstkarotten.jpg';
    if (lower.includes('caprese')) return 'images/Caprese-Garlic-Bread .jpg';
    return 'images/cake.png';
}

function applyData(r) {
    document.getElementById('recipe-name').textContent = r.name;
    document.getElementById('recipe-desc').textContent = r.description || 'Leckeres Rezept für jeden Tag.';
    document.getElementById('instructions-text').textContent = r.instructions;

    const ul = document.getElementById('ingredients-list');
    ul.innerHTML = '';
    (r.ingredients || []).forEach((item, i) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.className = 'ingredient-item';
        li.style.animationDelay = `${i * 60}ms`;
        ul.appendChild(li);
    });

    const img = document.getElementById('recipe-image');
    img.src = r.image || guessImage(r.name);
    img.alt = r.name;

    // Shimmer aus
    document.getElementById('recipe-detail').classList.remove('shimmer');

    // Zutaten animiert einblenden
    requestAnimationFrame(() => {
        document.querySelectorAll('.ingredient-item').forEach(li => li.classList.add('reveal-item'));
    });
}

(async function init() {
    const id = getId();
    const root = document.getElementById('recipe-detail');
    try {
        const recipe = await fetchRecipe(id);
        applyData(recipe);
    } catch (e) {
        root.innerHTML = `<p>Fehler: ${e.message}</p>`;
        console.error(e);
    }
})();
