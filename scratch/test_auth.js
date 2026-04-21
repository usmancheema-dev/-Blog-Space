
const BASE_URL = 'http://localhost:2000/api/v1/users';
const testUser = {
    username: 'testu' + Date.now(), // Unique username
    email: 'test' + Date.now() + '@example.com',
    password: 'password123'
};

async function runTest() {
    try {
        console.log('--- Testing Registration ---');
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Body:', regData);

        console.log('\n--- Testing Login ---');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: testUser.username,
                password: testUser.password
            })
        });
        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Body:', loginData);
        
        const { accessToken, refreshToken } = loginData;
        console.log('Access Token Received:', accessToken ? 'YES' : 'NO');
        console.log('Refresh Token Received:', refreshToken ? 'YES' : 'NO');

        if (!accessToken) throw new Error('Login failed: No access token');

        console.log('\n--- Testing Logout ---');
        const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const logoutData = await logoutRes.json();
        console.log('Logout Status:', logoutRes.status);
        console.log('Logout Body:', logoutData);

        console.log('\n✅ JWT Implementation Test Passed!');
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
    }
}

runTest();
