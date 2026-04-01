import { apiFetch, getSession } from './api.js';

function renderAllArticles() {
    return `
    <div class="page-header">
      <h2>All Articles</h2>
      <button class="btn btn-primary" id="refreshArticles">↻ Refresh</button>
    </div>
    <div id="articlesList" class="articles-grid">
      <p class="muted">Loading articles...</p>
    </div>
  `;
}

function renderCreateArticle() {
    const session = getSession();
    return `
    <div class="card">
      <h2 class="card-title">Write an Article</h2>
      ${!session ? '<div class="alert alert-info">Tip: Login first so the author ID is pre-filled.</div>' : ''}
      <form id="createArticleForm" class="form">
        <div class="form-group">
          <label>Author User ID</label>
          <input id="art-userId" type="text" placeholder="MongoDB ObjectId of the author"
            value="${session ? '' : ''}" required />
        </div>
        <div class="form-group">
          <label>Title</label>
          <input id="art-title" type="text" placeholder="My awesome article" required />
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea id="art-content" rows="6" placeholder="Write your content here..." required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Publish Article</button>
      </form>
    </div>
  `;
}

function renderSingleArticle() {
    return `
    <div class="card">
      <h2 class="card-title">Get Article by ID</h2>
      <div class="form-row">
        <input id="single-art-id" type="text" placeholder="Article MongoDB ObjectId" />
        <button class="btn btn-primary" id="fetchArticleBtn">Fetch</button>
      </div>
      <div id="singleArticleResult" class="result-box"></div>
    </div>
  `;
}

async function loadArticles() {
    const el = document.getElementById('articlesList');
    if (!el) return;
    const { ok, data } = await apiFetch('GET', '/articles/');
    if (!ok || !Array.isArray(data.msg) || data.msg.length === 0) {
        el.innerHTML = '<p class="muted">No articles found.</p>';
        return;
    }
    el.innerHTML = data.msg.map(a => `
    <div class="article-card">
      <h3>${escHtml(a.title)}</h3>
      <p>${escHtml(a.content?.substring(0, 120))}${a.content?.length > 120 ? '…' : ''}</p>
      <div class="article-meta">
        <span class="badge">By: ${a.createdBy}</span>
        <span class="badge">${new Date(a.createdAt).toLocaleDateString()}</span>
        <span class="article-id">ID: ${a._id}</span>
      </div>
    </div>
  `).join('');
}

function bindAllArticles() {
    loadArticles();
    document.getElementById('refreshArticles')?.addEventListener('click', loadArticles);
}

function bindCreateArticle() {
    document.getElementById('createArticleForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('art-userId').value.trim();
        const title = document.getElementById('art-title').value.trim();
        const content = document.getElementById('art-content').value.trim();
        showToast('Publishing...', 'info');
        const { ok, data } = await apiFetch('POST', `/articles/article/${userId}`, { title, content });
        showToast(ok ? 'Article published!' : (data.msg || 'Error'), ok ? 'success' : 'error');
    });
}

function bindSingleArticle() {
    document.getElementById('fetchArticleBtn')?.addEventListener('click', async () => {
        const id = document.getElementById('single-art-id').value.trim();
        const el = document.getElementById('singleArticleResult');
        if (!id) { el.innerHTML = '<p class="error">Enter an article ID</p>'; return; }
        const { ok, data } = await apiFetch('GET', `/articles/${id}`);
        if (!ok) { el.innerHTML = `<p class="error">${data.msg}</p>`; return; }
        const a = data.msg;
        el.innerHTML = `
      <div class="result-article">
        <h3>${escHtml(a.title)}</h3>
        <p>${escHtml(a.content)}</p>
        <div class="article-meta">
          <span class="badge">By: ${a.createdBy}</span>
          <span class="badge">${new Date(a.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    });
}

function escHtml(str = '') {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export {
    renderAllArticles, renderCreateArticle, renderSingleArticle,
    bindAllArticles, bindCreateArticle, bindSingleArticle
};
