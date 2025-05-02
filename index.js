<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dinero x Anuncios</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    body {
      background-color: #121212;
      color: #f1f1f1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #1e1e1e;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 0 10px rgba(0,0,0,0.8);
      max-width: 400px;
      width: 100%;
    }
    h1 {
      text-align: center;
      margin-bottom: 1rem;
      color: #00c6ff;
    }
    input, button {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
    }
    input {
      background-color: #2c2c2c;
      color: #fff;
    }
    button {
      background: linear-gradient(90deg, #00c6ff, #0072ff);
      color: #fff;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: linear-gradient(90deg, #0072ff, #00c6ff);
    }
    #user-section {
      display: none;
    }
    .balance {
      margin: 1rem 0;
      font-size: 1.2rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dinero x Anuncios</h1>

    <div id="auth-section">
      <input type="text" id="username" placeholder="Usuario" />
      <input type="password" id="password" placeholder="Contraseña" />
      <button onclick="register()">Registrarse</button>
      <button onclick="login()">Iniciar sesión</button>
    </div>

    <div id="user-section">
      <div class="balance">Balance: $<span id="balance">0.00</span></div>
      <button onclick="watchAd()">Ver anuncio y ganar $0.01</button>
      <input type="email" id="paypal" placeholder="Correo de PayPal" />
      <button onclick="withdraw()">Solicitar retiro</button>
      <button onclick="logout()">Cerrar sesión</button>
    </div>
  </div>

  <script>
    const apiURL = "https://TU-BACKEND-EN-RENDER.com"; // <- Reemplaza esto con tu URL real
    let userId = null;

    function register() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => alert(data.message));
    }

    function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          userId = data.user.id;
          document.getElementById('balance').textContent = data.user.balance.toFixed(2);
          document.getElementById('auth-section').style.display = 'none';
          document.getElementById('user-section').style.display = 'block';
        } else {
          alert(data.message);
        }
      });
    }

    function watchAd() {
      // Aquí va la integración de AdMob en Android, en web es simulado:
      alert("Anuncio visto!");
      fetch(`${apiURL}/reward`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, reward: 0.01 })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        document.getElementById('balance').textContent = data.newBalance.toFixed(2);
      });
    }

    function withdraw() {
      const paypalEmail = document.getElementById('paypal').value;
      fetch(`${apiURL}/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, paypalEmail })
      })
      .then(res => res.json())
      .then(data => alert(data.message));
    }

    function logout() {
      userId = null;
      document.getElementById('user-section').style.display = 'none';
      document.getElementById('auth-section').style.display = 'block';
    }
  </script>
</body>
</html>
