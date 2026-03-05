const axios = require('axios');

async function testSignup() {
    const newUser = {
        name: "New Test User",
        email: `test_${Date.now()}@example.com`,
        password: "password123",
        university: "Test Uni",
        year: "Junior",
        major: "CS"
    };

    try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", newUser);
        console.log("Signup Success:", response.data);
    } catch (error) {
        console.error("Signup Failed:", error.response ? error.response.status : error.message);
        if (error.response) {
            console.error("Error data:", error.response.data);
        }
    }
}

testSignup();
