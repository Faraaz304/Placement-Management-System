import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying success or error messages
  const navigate = useNavigate();

  const handle_login = (event) => {
    event.preventDefault();

    const data = { username, password };

    fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          console.log(data.role);
          if (data.role === 'admin') {
            navigate('/adminpage');
          } else {
            navigate('/dashboard');
          }
        } else {
          setMessage('Invalid login credentials');
        }
      })
      .catch(error => setMessage('Error: ' + error));
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt="Logo" />
      </div>
      <div className="text-center mt-4 name">Login</div>
      <form className="p-3 mt-3" onSubmit={handle_login}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn mt-3">Login</button>
      </form>
      {message && <div className="text-center mt-3">{message}</div>}
      <div className="text-center fs-6">
        <a href="#">Forget password?</a> or <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default Login;
