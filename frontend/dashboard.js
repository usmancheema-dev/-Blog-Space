import { apiFetch, getSession } from './api.js';

function renderDashboard() {
  const session = getSession();
  if (!session?.accessToken) {
    return `
      <div class="card">
        <h2 class="card-title">🔒 Not Logged In</h2>
        <p class="muted">Please <a href="#login">login</a> first to access your dashboard.</p>
      </div>
    `;
  }

  return `
    <div class="page-header">
      <h2>My Dashboard</h2>
    </div>

    <div class="dashboard-grid">

      <!-- Current User Card -->
      <div class="card">
        <h2 class="card-title">👤 Current User</h2>
        <div id="currentUserInfo" class="result-box">
          <p class="muted">Loading your profile...</p>
        </div>
      </div>

      <!-- Update Account Details -->
      <div class="card">
        <h2 class="card-title">✏️ Update Account Details</h2>
        <form id="updateAccountForm" class="form">
          <div class="form-group">
            <label>Username</label>
            <input id="update-username" type="text" placeholder="New username" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input id="update-email" type="email" placeholder="New email" required />
          </div>
          <button type="submit" class="btn btn-primary">Update Account</button>
        </form>
        <div id="updateResult" class="result-box"></div>
      </div>

    </div>
  `;
}

async function loadCurrentUser() {
  const el = document.getElementById('currentUserInfo');
  if (!el) return;

  const { ok, data } = await apiFetch('GET', '/users/current-user');

  if (!ok) {
    el.innerHTML = `<p class="error">${data.msg || 'Failed to fetch user'}</p>`;
    return;
  }

  const user = data.user;
  el.innerHTML = `
    <div class="user-profile-card">
      <div class="user-avatar">${(user.username?.[0] || '?').toUpperCase()}</div>
      <div class="user-details">
        <div class="user-detail-row">
          <span class="user-label">Username</span>
          <span class="user-value">${escHtml(user.username)}</span>
        </div>
        <div class="user-detail-row">
          <span class="user-label">Email</span>
          <span class="user-value">${escHtml(user.email)}</span>
        </div>
        <div class="user-detail-row">
          <span class="user-label">About</span>
          <span class="user-value">${user.about ? escHtml(user.about) : '<em class="muted">Not set</em>'}</span>
        </div>
        <div class="user-detail-row">
          <span class="user-label">Followers</span>
          <span class="badge">${user.followers?.length || 0}</span>
        </div>
        <div class="user-detail-row">
          <span class="user-label">Following</span>
          <span class="badge">${user.following?.length || 0}</span>
        </div>
        <div class="user-detail-row">
          <span class="user-label">Joined</span>
          <span class="user-value">${new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  `;

  // Pre-fill the update form with current values
  const usernameInput = document.getElementById('update-username');
  const emailInput = document.getElementById('update-email');
  if (usernameInput) usernameInput.value = user.username || '';
  if (emailInput) emailInput.value = user.email || '';
}

function bindDashboard() {
  loadCurrentUser();

  document.getElementById('updateAccountForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('update-username').value.trim();
    const email = document.getElementById('update-email').value.trim();
    const el = document.getElementById('updateResult');

    if (!username || !email) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    showToast('Updating account...', 'info');

    const { ok, data } = await apiFetch('POST', '/users/update-account', { username, email });

    if (ok) {
      showToast('Account updated successfully!', 'success');
      el.innerHTML = `<p style="color: var(--success); margin-top: 12px;">✓ Account details updated</p>`;
      // Reload current user to reflect changes
      loadCurrentUser();
    } else {
      showToast(data.msg || 'Error updating account', 'error');
      el.innerHTML = `<p class="error" style="margin-top: 12px;">${escHtml(data.msg || 'Update failed')}</p>`;
    }
  });
}

function escHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export { renderDashboard, bindDashboard };
