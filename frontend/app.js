import { renderRegister, renderLogin, bindRegister, bindLogin } from './auth.js';
import {
    renderAllArticles, renderCreateArticle, renderSingleArticle,
    bindAllArticles, bindCreateArticle, bindSingleArticle
} from './articles.js';
import { renderHome, bindHome } from './home.js';
import { renderDashboard, bindDashboard } from './dashboard.js';
import { renderExplore, bindExplore } from './explore.js';
import { renderSettings, bindSettings } from './settings.js';
import { renderFeed, bindFeed } from './feed.js';
import { renderBookmarks, bindBookmarks } from './bookmarks.js';
import { renderAuthor, bindAuthor } from './author.js';

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
    '#home': { render: renderHome, bind: bindHome },
    '#register': { render: renderRegister, bind: bindRegister },
    '#login': { render: renderLogin, bind: bindLogin },
    '#articles': { render: renderAllArticles, bind: bindAllArticles },
    '#new-article': { render: renderCreateArticle, bind: bindCreateArticle },
    '#single-article': { render: renderSingleArticle, bind: bindSingleArticle },
    '#dashboard': { render: renderDashboard, bind: bindDashboard },
    '#explore': { render: renderExplore, bind: bindExplore },
    '#settings': { render: renderSettings, bind: bindSettings },
    '#feed': { render: renderFeed, bind: bindFeed },
    '#bookmarks': { render: renderBookmarks, bind: bindBookmarks },
    '#author': { render: renderAuthor, bind: bindAuthor },
};

function navigate(hash) {
    const route = routes[hash] || routes['#home'];
    const view = document.getElementById('view');
    view.innerHTML = route.render();
    route.bind();

    // Update active nav
    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === hash);
    });
}

// === Theme Management ===
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const root = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    // Default to light for Medium style
    root.setAttribute('data-theme', 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

window.addEventListener('hashchange', () => navigate(window.location.hash));
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    navigate(window.location.hash || '#articles');
});
