// URL for your backend API
const API_URL = "http://localhost:5000"; // Change to your backend URL if different

// Show Register Form
function showRegisterForm() {
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}

// Show Login Form
function showLoginForm() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Register a new user
async function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            showLoginForm();
        } else {
            alert(data.message || "Error during registration.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

// Login a user
async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            showSecurePage(data.username);
        } else {
            alert(data.message || "Error during login.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

// Show secured page after successful login
function showSecurePage() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("securePage").style.display = "block";
    document.getElementById("welcomeMessage").textContent = "Welcome!";
}


// Logout user
function logout() {
    localStorage.removeItem("token");
    document.getElementById("securePage").style.display = "none";
    showLoginForm();
}

// Check if user is already logged in (on page load)
window.onload = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const user = jwtDecode(token);
        showSecurePage(user.username);
    } else {
        showLoginForm();
    }
};

// Simple JWT decoding (use 'jwt-decode' library for production)
function jwtDecode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}
