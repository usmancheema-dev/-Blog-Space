import { getSession } from './api.js';

function renderBookmarks() {
  const session = getSession();
  
  if (!session) {
    return `
      <div class="explore-container">
        <div class="explore-header" style="margin-bottom: 20px;">
          <h2>Your Reading List</h2>
          <p class="muted">Sign in to save stories to read later.</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="explore-container">
      <div class="page-header" style="border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 30px;">
        <h2 style="font-size: 2.5rem; color: var(--text);">Reading List</h2>
        <p class="muted" style="margin-top: 8px;">Articles you've saved for later.</p>
      </div>
      
      <div id="bookmarksResults" class="articles-grid">
        <!-- Placeholder for bookmarks -->
        <div class="medium-feed-card empty-state">
          <div class="medium-feed-content-wrapper" style="text-align: center; padding: 40px 0;">
            <span style="font-size: 2rem; margin-bottom: 10px; display: block;">🔖</span>
            <h3 class="medium-feed-title" style="margin-bottom: 8px;">No bookmarks yet</h3>
            <p class="medium-feed-snippet" style="margin-bottom: 0;">Need to build the bookmarkArticle backend controller first!</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindBookmarks() {
  // Logic for un-bookmarking will go here once the backend is ready
}

export { renderBookmarks, bindBookmarks };
