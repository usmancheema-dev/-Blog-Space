import { getSession, apiFetch } from './api.js';

function renderHome() {
  const session = getSession();
  return `
    <div class="home-container">
      <div class="glow-bg"></div>
      <header class="home-hero">
        <div class="hero-content">
          <span class="badge hero-badge">✨ Next-Generation Blogging</span>
          <h1 class="hero-title">Welcome to <span class="text-gradient">Blog Space</span></h1>
          <p class="hero-subtitle">The premium platform for sharing ideas, connecting with brilliant minds, and exploring fresh perspectives. Elevate your writing journey today.</p>
          
          <div class="home-actions-top">
            ${session ? `
              <a href="#new-article" class="btn btn-primary btn-glow">Write an Article</a>
              <a href="#dashboard" class="btn btn-secondary">My Dashboard</a>
            ` : `
              <a href="#register" class="btn btn-primary btn-glow">Join the Community</a>
              <a href="#login" class="btn btn-secondary">Sign In</a>
            `}
          </div>
        </div>
      </header>

      <section class="stats-section">
        <h2 class="section-title">Platform Pulse</h2>
        <div class="stats-grid">
          <div class="stat-card fade-up" style="animation-delay: 0.1s;">
            <div class="stat-icon-wrapper blue">
              <span class="stat-icon">📰</span>
            </div>
            <div class="stat-content">
              <h3 id="stat-articles">...</h3>
              <p>Published Articles</p>
            </div>
          </div>
          
          <div class="stat-card fade-up" style="animation-delay: 0.2s;">
            <div class="stat-icon-wrapper purple">
              <span class="stat-icon">👥</span>
            </div>
            <div class="stat-content">
              <h3 id="stat-users">...</h3>
              <p>Active Creators</p>
            </div>
          </div>
          
          <div class="stat-card fade-up" style="animation-delay: 0.3s;">
              <div class="stat-icon-wrapper green">
                <span class="stat-icon">⚡</span>
              </div>
              <div class="stat-content">
              <h3 id="stat-uptime">99.9%</h3>
              <p>Lightning Fast Delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="feature-card">
          <div class="feature-icon">✨</div>
          <h3>Premium Editor</h3>
          <p>Write with focus and clarity using our distraction-free, elegant composing tools.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3>Global Reach</h3>
          <p>Connect with an audience of readers and creators from all over the world.</p>
        </div>
      </section>

      <footer class="home-footer">
        <p>© 2026 Blog Space Platform • Engineered for Excellence</p>
      </footer>
    </div>
  `;
}

function bindHome() {
  async function fetchStats() {
    const artEl = document.getElementById('stat-articles');
    const userEl = document.getElementById('stat-users');
    const uptimeEl = document.getElementById('stat-uptime');
    
    try {
      const { ok, data } = await apiFetch('GET', '/articles/stats');
      if (ok) {
        // Animate numbers counting up
        animateValue(artEl, 0, data.articles, 1000);
        animateValue(userEl, 0, data.users, 1000);
        if (uptimeEl) uptimeEl.innerText = data.uptime || '99.9%';
      } else {
        if (artEl) artEl.innerText = '-';
        if (userEl) userEl.innerText = '-';
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      if (artEl) artEl.innerText = '-';
      if (userEl) userEl.innerText = '-';
    }
  }

  // Helper function for nice number counting animation
  function animateValue(obj, start, end, duration) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  fetchStats();
}

export { renderHome, bindHome };
