import React from 'react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdminNav = () => {
  const [animationData, setAnimationData] = useState(null);
  const [displayText, setDisplayText] = useState('Round 1');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/adminhome') {
      setDisplayText('Congratulations, You Cracked It!!');
    } else {
      setDisplayText('Round 1');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch('https://lottie.host/06d394be-5126-4b89-96d3-d15da7f63086/Mw0LS0VFfT.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation data:', error);
      }
    };

    fetchAnimation();
  }, []);

  const textStyle1 = {
    color: 'linear-gradient(90deg, green, red, blue)', // Gradient colors
    background: 'linear-gradient(90deg, blue, red, green)', // Same gradient for background
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '34px',
    fontWeight: "bold",
    textAlign: 'center',
    width: '100%',
    display: 'block',
    marginTop: '20px',
  };

  const textStyle2 = {
    color: 'linear-gradient(90deg, red, black)', // Gradient colors
    background: 'linear-gradient(90deg, black, red)', // Same gradient for background
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '34px',
    fontWeight: "bold",
    textAlign: 'center',
    width: '100%',
    display: 'block',
    marginTop: '20px',
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/images/ts.png" width="55" height="55" alt="Tech Shuttle" />
          </a>
          <a className="navbar-brand" href="#">
            <div style={{ ...textStyle1, display: 'flex', alignItems: 'center' }}>
              {animationData && (
                <Lottie animationData={animationData} style={{ width: '70px', height: '70px', marginRight: '15px' }} />
              )}
              Break The Password
            </div>
          </a>
          <a className="navbar-brand" href="#">
            <div style={textStyle2}>Tech Shuttle</div>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div style={textStyle1}>{displayText}</div>
    </div>
  );
};

export default AdminNav;
