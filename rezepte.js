// Webprogrammierung frontend/rezepte.js
const API_BASE = 'http://127.0.0.1:3000';

let allRecipes = [];
let filtered = [];

async function fetchRecipes() {
    const res = await fetch(`${API_BASE}/recipes`);
    if (!res.ok) throw new Error('Fehler beim Laden der Rezepte');
    return await res.json();
}

function guessImage(name) {
    const lower = (name || '').toLowerCase();
    // Passe hier gern weitere Regeln an deine Bilddateien an
    if (lower.includes('chocolate') || lower.includes('cake') || lower.includes('kuchen') || lower.includes('cheesecake')) return 'images/chocolate-cake.jpg';
    if (lower.includes('ratatouille') || lower.includes('gemüse')) return 'images/Ratatouille.jpg';
    if (lower.includes('apple') || lower.includes('apfel') || lower.includes('crumble') || lower.includes('pie')) return 'images/Apple Crumble.jpg';
    if (lower.includes('pancakes')) return 'images/cake.png';
    if (lower.includes('chicken tikka')) return 'images/Chicken Tikka Masala.jpg';
    if (lower.includes('risotto') || lower.includes('mushroom')) return 'images/Creamy Mushroom Risotto.jpg';
    if (lower.includes('quinoa')) return 'images/Quinoa-Gemüse-Bowl.jpg';
    if (lower.includes('harissa') || lower.includes('karotten')) return 'images/Harissa-Röstkarotten.jpg';
    if (lower.includes('caprese')) return 'images/Caprese-Garlic-Bread .jpg';
    return 'images/cake.png';
}

function createRecipeCard(recipe) {
    const card = document.createElement('a');
    card.className = 'recipe-card hover-rise reveal';
    card.href = `rezept-details.html?id=${encodeURIComponent(recipe.id)}`;

    const imgSrc = recipe.image || guessImage(recipe.name);
    const desc = recipe.description || (recipe.instructions ? recipe.instructions.slice(0, 110) + '…' : 'Leckeres Rezept.');

    card.innerHTML = `
    <img src="${imgSrc}" alt="${recipe.name}">
    <div class="recipe-card-body">
      <h3>${recipe.name}</h3>
      <p>${desc}</p>
      <span class="recipe-btn">View Recipe</span>
    </div>
  `;
    return card;
}

function render(list) {
    const grid = document.getElementById('recipes-grid');
    grid.innerHTML = '';
    list.forEach(r => grid.appendChild(createRecipeCard(r)));
    intersectionReveal();
}

function intersectionReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, {threshold: 0.2});
    els.forEach(el => io.observe(el));
}

function applySearchAndSort() {
    const q = document.getElementById('search')?.value?.toLowerCase() || '';
    const sort = document.getElementById('sort')?.value || 'name-asc';

    filtered = allRecipes.filter(r => {
        const hay = `${r.name} ${(r.ingredients||[]).join(' ')} ${r.instructions||''}`.toLowerCase();
        return hay.includes(q);
    });

    const byNameAsc = (a,b) => a.name.localeCompare(b.name);
    const byNameDesc = (a,b) => b.name.localeCompare(a.name);
    const byIdAsc = (a,b) => Number(a.id) - Number(b.id);
    const byIdDesc = (a,b) => Number(b.id) - Number(a.id);

    switch (sort) {
        case 'name-asc': filtered.sort(byNameAsc); break;
        case 'name-desc': filtered.sort(byNameDesc); break;
        case 'id-asc': filtered.sort(byIdAsc); break;
        case 'id-desc': filtered.sort(byIdDesc); break;
    }

    render(filtered);
}

(async function init() {
    const grid = document.getElementById('recipes-grid');
    grid.innerHTML = '<p>Lade Rezepte…</p>';

    try {
        allRecipes = await fetchRecipes();
        filtered = [...allRecipes];
        applySearchAndSort();
    } catch (e) {
        grid.innerHTML = `<p>Fehler: ${e.message}</p>`;
    }

    const search = document.getElementById('search');
    const sort = document.getElementById('sort');
    if (search) search.addEventListener('input', applySearchAndSort);
    if (sort) sort.addEventListener('change', applySearchAndSort);
})();
