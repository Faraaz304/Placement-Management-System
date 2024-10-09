import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    
      
  
    
    
      <div className="d-flex mb-5">
        <Link to="/login" className="btn btn-primary btn-lg mx-2" style={{ backgroundColor: '#3498db', borderColor: '#3498db', fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>Login</Link>
        <Link to="/signup" className="btn btn-secondary btn-lg mx-2" style={{ backgroundColor: '#2ecc71', borderColor: '#2ecc71', fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>Signup</Link>
      </div>
   
  );
}

export default Home;


// modern, minimalist, vibrant, professional, elegant, responsive, user-friendly, innovative, sleek, dynamic, intuitive, clean, bold, creative, functional, engaging, interactive, stylish, efficient, customizable, accessible, trendy, versatile, seamless, informative, eye-catching, organized, balanced, harmonious, inviting
