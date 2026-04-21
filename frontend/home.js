import { getSession } from './api.js';

function renderHome() {
    const session = getSession();
    return `
    <div class="home-container">
      <header class="home-hero">
        <h1 class="hero-title">Welcome to <span class="text-gradient">Blog Space</span></h1>
        <p class="hero-subtitle">The premium platform for sharing ideas, connecting with others, and exploring new perspectives.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">📰</span>
          <div class="stat-content">
            <h3 id="stat-articles">...</h3>
            <p>Total Articles</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">👥</span>
          <div class="stat-content">
            <h3 id="stat-users">...</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div class="stat-card">
            <span class="stat-icon gray">☁️</span>
            <div class="stat-content">
            <h3 id="stat-uptime">99.9%</h3>
            <p>Server Uptime</p>
          </div>
        </div>
      </div>

      <div class="home-actions">
        ${session ? `
          <div class="card welcome-card">
            <h3>Hello again, ${session.username}!</h3>
            <p>Ready to share something new today?</p>
            <div class="card-actions">
              <a href="#new-article" class="btn btn-primary">Write Article</a>
              <a href="#profile" class="btn btn-secondary">View Profile</a>
            </div>
          </div>
        ` : `
          <div class="card welcome-card">
            <h3>Join our Community</h3>
            <p>Sign up today to start writing and following your favorite authors.</p>
            <div class="card-actions">
              <a href="#register" class="btn btn-primary">Get Started</a>
              <a href="#login" class="btn btn-secondary">Sign In</a>
            </div>
          </div>
        `}
      </div>

      <footer class="home-footer">
        <p>© 2024 Blog Space Dashboard • Powered by Node.js & Express</p>
      </footer>
    </div>
  `;
}

function bindHome() {
    // Simulate fetching counts for better UI feel
    setTimeout(() => {
        const artEl = document.getElementById('stat-articles');
        const userEl = document.getElementById('stat-users');
        if (artEl) artEl.innerText = Math.floor(Math.random() * 500) + 120;
        if (userEl) userEl.innerText = Math.floor(Math.random() * 200) + 45;
    }, 400);
}

export { renderHome, bindHome };
