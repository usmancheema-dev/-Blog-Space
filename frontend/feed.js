import { getSession } from './api.js';

function renderFeed() {
  const session = getSession();
  
  if (!session) {
    return `
      <div class="explore-container">
        <div class="explore-header" style="margin-bottom: 20px;">
          <h2>Your Personalized Feed</h2>
          <p class="muted">Sign in to see stories from writers you follow.</p>
        </div>
        <div class="medium-feed-card empty-state">
          <div class="medium-feed-content-wrapper" style="text-align: center; padding: 40px 0;">
            <span style="font-size: 2rem; margin-bottom: 10px; display: block;">🔒</span>
            <h3 class="medium-feed-title" style="margin-bottom: 8px;">Sign in required</h3>
            <p class="medium-feed-snippet" style="margin-bottom: 20px;">Join Blog Space to customize your reading experience.</p>
            <button onclick="window.location.hash='#login'" class="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="explore-container">
      <div class="feed-tabs">
        <button class="feed-tab active" id="tab-following">Following</button>
        <button class="feed-tab" id="tab-recommended">Recommended</button>
      </div>
      
      <div id="feedResults" class="articles-grid" style="margin-top: 24px;">
        <!-- Placeholder for feed results -->
        <div class="medium-feed-card empty-state">
          <div class="medium-feed-content-wrapper" style="text-align: center; padding: 40px 0;">
            <span style="font-size: 2rem; margin-bottom: 10px; display: block;">⏳</span>
            <h3 class="medium-feed-title" style="margin-bottom: 8px;">getUserFeed not ready</h3>
            <p class="medium-feed-snippet" style="margin-bottom: 0;">Once the backend controller is built, this will show a personalized timeline!</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindFeed() {
  const tabFollowing = document.getElementById('tab-following');
  const tabRecommended = document.getElementById('tab-recommended');
  const resultsContainer = document.getElementById('feedResults');
  
  if (tabFollowing && tabRecommended) {
    tabFollowing.addEventListener('click', () => {
      tabFollowing.classList.add('active');
      tabRecommended.classList.remove('active');
      showToast('Loading Following feed... (Backend missing)', 'info');
    });
    
    tabRecommended.addEventListener('click', () => {
      tabRecommended.classList.add('active');
      tabFollowing.classList.remove('active');
      showToast('Loading Recommended feed... (Backend missing)', 'info');
    });
  }
}

export { renderFeed, bindFeed };
