import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import backgroundVideo from '../assets/vedio.mp4';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'a@gmail.com' && password === 'a123') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  // Inline styles
  const videoStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1,
    filter: 'brightness(0.7)', // darken video for text visibility
  };

  const containerStyle = {
    position: 'relative',
    maxWidth: '400px',
    margin: '80px auto',
    padding: '30px',
    backgroundColor: 'rgba(222, 240, 247, 0.6)', // semi-transparent dark overlay
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(187, 143, 143, 0.3)',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '700',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '6px',
    backgroundColor: '#3498db',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#2980b9';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#3498db';
  };

  return (
    <>
      <video style={videoStyle} autoPlay muted loop>
       <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
<div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // white with 30% opacity
    zIndex: 0,
  }}
></div>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
