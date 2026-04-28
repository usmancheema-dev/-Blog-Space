import { getSession } from './api.js';

function renderSettings() {
  const session = getSession();
  
  if (!session) {
    return `
      <div class="card">
        <h3>Unauthorized</h3>
        <p class="muted">Please login to view settings.</p>
      </div>
    `;
  }

  return `
    <div class="settings-container">
      <div class="page-header">
        <h2>Account Settings</h2>
      </div>

      <div class="settings-grid">
        <!-- Profile Settings (Display only for now) -->
        <div class="card settings-card">
          <h3 class="card-title">Profile Information</h3>
          <div class="form-group">
            <label>Username</label>
            <input type="text" value="${session.username}" disabled />
            <span class="muted" style="font-size: 0.75rem; margin-top: 4px;">Username cannot be changed.</span>
          </div>
        </div>

        <!-- Security / Password Change -->
        <div class="card settings-card">
          <h3 class="card-title">Security</h3>
          <form id="changePasswordForm" class="form">
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" id="oldPassword" required placeholder="Enter current password" />
            </div>
            
            <div class="form-group">
              <label>New Password</label>
              <input type="password" id="newPassword" required placeholder="Enter new password" />
            </div>
            
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" id="confirmPassword" required placeholder="Confirm new password" />
            </div>
            
            <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function bindSettings() {
  const form = document.getElementById('changePasswordForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const oldPass = document.getElementById('oldPassword').value;
      const newPass = document.getElementById('newPassword').value;
      const confirmPass = document.getElementById('confirmPassword').value;
      
      if (newPass !== confirmPass) {
        showToast('New passwords do not match!', 'error');
        return;
      }
      
      if (newPass.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
      }
      
      // Mocking the backend call
      showToast('Updating password... (Backend missing)', 'info');
      
      setTimeout(() => {
        showToast('Please implement the changePassword controller!', 'error');
        form.reset();
      }, 1000);
      
    });
  }
}

export { renderSettings, bindSettings };
