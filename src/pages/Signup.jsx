import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying success or error messages
  const navigate = useNavigate();

  const handle_signup = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const data = { username, password };

    fetch('http://127.0.0.1:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'User created successfully') {
          setMessage('User registered successfully! Please go to the login page.');
          setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        } else {
          setMessage(data.message);
        }
      })
      .catch(error => setMessage('Error: ' + error));
  };

  return (
    <div className="wrapper">
      <div className="logo">
          <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt="Logo" />
        </div>
        <div className="text-center mt-4 name">
          Signup
        </div>
        <form className="p-3 mt-3" onSubmit={handle_signup}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="confirmpassword"
              id="pwd2"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <button className="btn mt-3" type="submit">
            Signup
          </button>
        </form>
        {message && <div className="text-center mt-3">{message}</div>}
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="/login">Login</a>
        </div>
    </div>
  );
}

export default Signup;
