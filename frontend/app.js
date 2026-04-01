import { renderRegister, renderLogin, bindRegister, bindLogin } from './auth.js';
import {
    renderAllArticles, renderCreateArticle, renderSingleArticle,
    bindAllArticles, bindCreateArticle, bindSingleArticle
} from './articles.js';
import { renderProfile, bindProfile } from './profile.js';

// ── Global toast ─────────────────────────────────────────────────────────────
window.showToast = function (msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
};

// ── Routes ───────────────────────────────────────────────────────────────────
const routes = {
    '#register': { render: renderRegister, bind: bindRegister },
    '#login': { render: renderLogin, bind: bindLogin },
    '#articles': { render: renderAllArticles, bind: bindAllArticles },
    '#new-article': { render: renderCreateArticle, bind: bindCreateArticle },
    '#single-article': { render: renderSingleArticle, bind: bindSingleArticle },
    '#profile': { render: renderProfile, bind: bindProfile },
};

function navigate(hash) {
    const route = routes[hash] || routes['#articles'];
    const view = document.getElementById('view');
    view.innerHTML = route.render();
    route.bind();

    // Update active nav
    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === hash);
    });
}

window.addEventListener('hashchange', () => navigate(window.location.hash));
window.addEventListener('DOMContentLoaded', () => {
    navigate(window.location.hash || '#articles');
});
