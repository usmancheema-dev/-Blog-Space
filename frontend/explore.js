import { apiFetch } from './api.js';

function renderExplore() {
  return `
    <div class="explore-container">
      <div class="explore-header">
        <h2>Explore Blog Space</h2>
        <p class="muted">Search for articles, topics, and authors.</p>
        
        <form id="searchForm" class="search-form">
          <div class="search-input-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" id="searchInput" class="search-input" placeholder="Search articles..." autocomplete="off" />
            <button type="submit" class="btn btn-primary search-btn">Search</button>
          </div>
        </form>
      </div>

      <div class="explore-results">
        <h3 class="results-title">Trending on Blog Space</h3>
        <div id="searchResults" class="articles-grid">
          <!-- Placeholder for results -->
          <div class="medium-feed-card empty-state">
            <div class="medium-feed-content-wrapper" style="text-align: center; padding: 40px 0;">
              <span style="font-size: 2rem; margin-bottom: 10px; display: block;">✨</span>
              <h3 class="medium-feed-title" style="margin-bottom: 8px;">Waiting for your backend!</h3>
              <p class="medium-feed-snippet" style="margin-bottom: 0;">Once you build the Search controller, results will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindExplore() {
  const searchForm = document.getElementById('searchForm');
  
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('searchInput').value.trim();
      
      if (!query) return;
      
      showToast(`Searching for "${query}"... (Backend missing)`, 'info');
      
      const resultsContainer = document.getElementById('searchResults');
      resultsContainer.innerHTML = `
        <div class="medium-feed-card empty-state">
          <div class="medium-feed-content-wrapper" style="text-align: center; padding: 40px 0;">
            <span style="font-size: 2rem; margin-bottom: 10px; display: block;">🚧</span>
            <h3 class="medium-feed-title" style="margin-bottom: 8px;">Search Controller Not Found</h3>
            <p class="medium-feed-snippet" style="margin-bottom: 0;">Time to build the <strong>searchArticles</strong> controller to make this work!</p>
          </div>
        </div>
      `;
    });
  }
}

export { renderExplore, bindExplore };
