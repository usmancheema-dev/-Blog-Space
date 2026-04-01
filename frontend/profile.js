import { apiFetch } from './api.js';

function renderProfile() {
    return `
    <div class="profile-grid">

      <!-- View Profile -->
      <div class="card">
        <h2 class="card-title">👤 View Profile</h2>
        <div class="form-row">
          <input id="view-userId" type="text" placeholder="User MongoDB ObjectId" />
          <button class="btn btn-primary" id="viewProfileBtn">Fetch</button>
        </div>
        <div id="profileResult" class="result-box"></div>
      </div>

      <!-- Update About -->
      <div class="card">
        <h2 class="card-title">✏️ Update About</h2>
        <form id="updateAboutForm" class="form">
          <div class="form-group">
            <label>User ID</label>
            <input id="about-userId" type="text" placeholder="MongoDB ObjectId" required />
          </div>
          <div class="form-group">
            <label>About</label>
            <textarea id="about-text" rows="3" placeholder="Tell the world about yourself..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>

      <!-- Follow -->
      <div class="card">
        <h2 class="card-title">➕ Follow User</h2>
        <form id="followForm" class="form">
          <div class="form-group">
            <label>Your ID (idA)</label>
            <input id="follow-idA" type="text" placeholder="Your MongoDB ObjectId" required />
          </div>
          <div class="form-group">
            <label>Target ID (idB)</label>
            <input id="follow-idB" type="text" placeholder="User to follow's ObjectId" required />
          </div>
          <button type="submit" class="btn btn-success">Follow</button>
        </form>
      </div>

      <!-- Unfollow -->
      <div class="card">
        <h2 class="card-title">➖ Unfollow User</h2>
        <form id="unfollowForm" class="form">
          <div class="form-group">
            <label>Your ID (idA)</label>
            <input id="unfollow-idA" type="text" placeholder="Your MongoDB ObjectId" required />
          </div>
          <div class="form-group">
            <label>Target ID (idB)</label>
            <input id="unfollow-idB" type="text" placeholder="User to unfollow's ObjectId" required />
          </div>
          <button type="submit" class="btn btn-danger">Unfollow</button>
        </form>
      </div>

    </div>
  `;
}

function bindProfile() {
    // View Profile
    document.getElementById('viewProfileBtn')?.addEventListener('click', async () => {
        const id = document.getElementById('view-userId').value.trim();
        const el = document.getElementById('profileResult');
        if (!id) { el.innerHTML = '<p class="error">Enter a user ID</p>'; return; }
        const { ok, data } = await apiFetch('GET', `/users/${id}`);
        if (!ok) { el.innerHTML = `<p class="error">${data.msg || 'Error fetching profile'}</p>`; return; }
        el.innerHTML = `<div class="profile-display"><span class="badge badge-lg">👤 ${data}</span></div>`;
    });

    // Update About
    document.getElementById('updateAboutForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('about-userId').value.trim();
        const about = document.getElementById('about-text').value.trim();
        const { ok, data } = await apiFetch('POST', `/users/${id}`, { about });
        showToast(data.msg, ok ? 'success' : 'error');
    });

    // Follow
    document.getElementById('followForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const idA = document.getElementById('follow-idA').value.trim();
        const idB = document.getElementById('follow-idB').value.trim();
        const { ok, data } = await apiFetch('POST', `/users/followers/${idB}`, { idA });
        showToast(data.msg, ok ? 'success' : 'error');
    });

    // Unfollow
    document.getElementById('unfollowForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const idA = document.getElementById('unfollow-idA').value.trim();
        const idB = document.getElementById('unfollow-idB').value.trim();
        const { ok, data } = await apiFetch('POST', `/users/followers/${idB}`, { idA });
        showToast(data.msg, ok ? 'success' : 'error');
    });
}

export { renderProfile, bindProfile };
