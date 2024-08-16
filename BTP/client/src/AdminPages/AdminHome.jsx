import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../CommonComponents/AdminNav';
import Lottie from 'lottie-react';

const AdminHome = () => {
  const navigate = useNavigate();
  const [animationData1, setAnimationData1] = useState(null);
  const [animationData2, setAnimationData2] = useState(null);

  const aid = localStorage.getItem('aid');
  const aemail = localStorage.getItem('aemail');
  const aname = localStorage.getItem('aname');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate('/adminlogin');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchAnimations = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('https://lottie.host/3681c0cd-4e5e-4c1c-b8dd-39e5efb07f9e/d0WAQIgOHn.json'),
          fetch('https://lottie.host/1961ad01-e745-4d5a-9906-f5512b957a28/kNlLEsiBqK.json'),
        ]);
        const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
        setAnimationData1(data1);
        setAnimationData2(data2);
      } catch (error) {
        console.error('Failed to load animation data:', error);
      }
    };

    fetchAnimations();
  }, []);


  return (
    <div>
      <AdminNav />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', gap: '20px' }}>
        {animationData1 && (
          <Lottie animationData={animationData1} style={{ width: '300px', height: '300px' }} />
        )}
        {animationData2 && (
          <Lottie animationData={animationData2} style={{ width: '300px', height: '300px' }} />
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      </div>
    </div>
  );
};

export default AdminHome;
