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
      
      <form id="createArticleForm" class="form">
        <div class="form-group">
          <label>Title</label>
          <input id="art-title" type="text" placeholder="My awesome article" required />
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea id="art-content" rows="6" placeholder="Write your content here..." required></textarea>
        </div>
        <button type="submit" class="btn btn-primary"> Publish Article</button>
      </form>
    </div>
  `;
}

function renderSingleArticle() {
  return `
    <div class="card">
      <h2 class="card-title"> Enter Article Title </h2>
      <div class="form-row">
        <input id="single-art-id" type="text" placeholder=" Enter name" />
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
  el.innerHTML = data.msg.map(a => {
    const authorInitial = a.createdBy ? a.createdBy.toString().charAt(0).toUpperCase() : '?';
    const dateStr = new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `
      <div class="medium-feed-card" onclick="window.location.hash='#single-article'; setTimeout(() => { document.getElementById('single-art-id').value='${escHtml(a.title).replace(/'/g, "\\'")}'; document.getElementById('fetchArticleBtn').click(); }, 100);">
        <div class="medium-feed-author">
          <div class="medium-feed-avatar">${authorInitial}</div>
          <span class="medium-feed-author-name">Author ID: ${a.createdBy}</span>
          <span class="medium-feed-date">· ${dateStr}</span>
        </div>
        <div class="medium-feed-content-wrapper">
          <div class="medium-feed-text">
            <h3 class="medium-feed-title">${escHtml(a.title)}</h3>
            <p class="medium-feed-snippet">${escHtml(a.content?.substring(0, 160))}${a.content?.length > 160 ? '...' : ''}</p>
          </div>
        </div>
        <div class="medium-feed-footer">
          <span class="medium-feed-meta">3 min read · <span class="badge" style="background:#f2f2f2; color:#242424; border:none; padding:4px 8px; font-size:0.75rem;">Technology</span></span>
          <div class="medium-feed-actions">
            <span style="cursor:pointer;" title="Save for later">🔖</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function bindAllArticles() {
  loadArticles();
  document.getElementById('refreshArticles')?.addEventListener('click', loadArticles);
}

function bindCreateArticle() {
  document.getElementById('createArticleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('art-title').value.trim();
    const content = document.getElementById('art-content').value.trim();

    showToast('Publishing...', 'info');

    const { ok, data } = await apiFetch('POST', '/articles/creates', { title, content });

    if (ok) {
      showToast('Article published!', 'success');
      // Clear form
      document.getElementById('art-title').value = '';
      document.getElementById('art-content').value = '';
      // Redirect to all articles
      setTimeout(() => { window.location.hash = '#articles'; }, 1000);
    } else {
      showToast(data.msg || 'Error publishing article', 'error');
    }
  });
}

function bindSingleArticle() {
  document.getElementById('fetchArticleBtn')?.addEventListener('click', async () => {
    const title = document.getElementById('single-art-id').value.trim();
    const el = document.getElementById('singleArticleResult');
    if (!title) { el.innerHTML = '<p class="error">Enter an article title</p>'; return; }

    el.innerHTML = '<p class="muted">Fetching article...</p>';
    const { ok, data } = await apiFetch('GET', `/articles/getsingleArticle/${encodeURIComponent(title)}`);

    if (!ok) { el.innerHTML = `<p class="error">${data.msg || 'Article not found'}</p>`; return; }

    const a = data.msg;
    el.innerHTML = `
      <div class="medium-article-wrapper" id="article-view-mode">
        
        <h1 class="medium-title">${escHtml(a.title)}</h1>
        
        <div class="medium-author-block">
          <div class="medium-avatar">${a.createdBy ? a.createdBy.toString().charAt(0).toUpperCase() : '?'}</div>
          <div class="medium-author-info">
            <span class="medium-author-name">Author ID: ${a.createdBy}</span>
            <span class="medium-author-meta">Published on ${new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · 3 min read</span>
          </div>
        </div>

        <div class="medium-content">${escHtml(a.content)}</div>

        <div class="medium-actions-bar">
          <div class="medium-clap">
            👏 <span>${a.likes ? a.likes.length : 0} Claps</span>
          </div>
          <div class="action-buttons">
            <button class="btn btn-sm btn-primary" id="editArticleBtn">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" id="deleteArticleBtn">🗑️ Delete</button>
          </div>
        </div>
        
      </div>
      
      <div class="result-article" id="article-edit-mode" style="display: none;">
        <h3>Edit Article</h3>
        <form id="editArticleForm" class="form">
          <div class="form-group">
            <label>Title</label>
            <input id="edit-art-title" type="text" value="${escHtml(a.title)}" required />
          </div>
          <div class="form-group">
            <label>Content</label>
            <textarea id="edit-art-content" rows="6" required>${escHtml(a.content)}</textarea>
          </div>
          <div class="form-row">
            <button type="submit" class="btn btn-sm btn-success">💾 Save</button>
            <button type="button" class="btn btn-sm btn-secondary" id="cancelEditBtn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    // --- Wire up Delete ---
    document.getElementById('deleteArticleBtn')?.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to delete this article?')) return;

      const res = await apiFetch('DELETE', `/articles/deleteArticle/${a._id}`);
      if (res.ok) {
        showToast('Article deleted successfully!', 'success');
        el.innerHTML = '<p class="success">Article was deleted.</p>';
        document.getElementById('single-art-id').value = '';
      } else {
        showToast(res.data.msg || 'Error deleting article (Are you the author?)', 'error');
      }
    });

    // --- Wire up Edit Toggle ---
    const viewMode = document.getElementById('article-view-mode');
    const editMode = document.getElementById('article-edit-mode');

    document.getElementById('editArticleBtn')?.addEventListener('click', () => {
      viewMode.style.display = 'none';
      editMode.style.display = 'block';
    });

    document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
      viewMode.style.display = 'block';
      editMode.style.display = 'none';
    });

    // --- Wire up Save Edit ---
    document.getElementById('editArticleForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newTitle = document.getElementById('edit-art-title').value.trim();
      const newContent = document.getElementById('edit-art-content').value.trim();

      const res = await apiFetch('PUT', `/articles/updateArticle/${a._id}`, { title: newTitle, content: newContent });

      if (res.ok) {
        showToast('Article updated successfully!', 'success');
        // Refresh the single article view
        document.getElementById('single-art-id').value = newTitle;
        document.getElementById('fetchArticleBtn').click();
      } else {
        showToast(res.data.msg || 'Error updating article (Are you the author?)', 'error');
      }
    });
  });
}

function escHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export {
  renderAllArticles, renderCreateArticle, renderSingleArticle,
  bindAllArticles, bindCreateArticle, bindSingleArticle
};
