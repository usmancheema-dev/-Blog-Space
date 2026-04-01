const API_BASE = 'http://localhost:2000/api/v1';

async function apiFetch(method, path, body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${path}`, options);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

function getSession() {
    try { return JSON.parse(localStorage.getItem('blogUser')) || null; } catch { return null; }
}
function setSession(user) {
    localStorage.setItem('blogUser', JSON.stringify(user));
}
function clearSession() {
    localStorage.removeItem('blogUser');
}

export { apiFetch, getSession, setSession, clearSession };
