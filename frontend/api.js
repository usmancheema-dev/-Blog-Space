const API_BASE = import.meta.env?.VITE_API_URL || '/api/v1';

async function apiFetch(method, path, body = null) {
    const session = getSession();
    const options = {
        method,
        headers: { 
            'Content-Type': 'application/json',
            ...(session?.accessToken && { 'Authorization': `Bearer ${session.accessToken}` })
        },
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${path}`, options);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
}

function getSession() {
    try { return JSON.parse(localStorage.getItem('blogUser')) || null; } catch { return null; }
}

function setSession(userData) {
    localStorage.setItem('blogUser', JSON.stringify(userData));
}

function clearSession() {
    localStorage.removeItem('blogUser');
}

export { apiFetch, getSession, setSession, clearSession };
