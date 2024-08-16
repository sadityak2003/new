import React, { useEffect, useState } from "react";
import ErrorMsg from "../CommonComponents/ErrorMsg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNav from '../CommonComponents/AdminNav';
import './AdminLogin.css';
import Lottie from "lottie-react";

const AdminLogin = () => {
  const [animationData, setAnimationData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const [logindt, setLogindt] = useState({
    admin_email: '',
    admin_pass: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogindt({
      ...logindt,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch('https://lottie.host/8ec1f976-b7ee-4191-98bd-986cfc11d66d/KSNjqoAInz.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation data:', error);
      }
    };

    fetchAnimation();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/adminloginapi/login", logindt);
      if (res.data.sts === 0) {
        localStorage.setItem('aid', res.data.aid);
        localStorage.setItem('aemail', res.data.aemail);
        localStorage.setItem('aname', res.data.aname);
        localStorage.setItem('token', res.data.token);
        navigate('/adminhome');
      } else {
        setShowToast(true);
        setMsg(res.data.msg);
        setType("error");
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const textStyle1 = {
    color: 'linear-gradient(90deg, green, red, blue)', // Gradient colors
    background: 'linear-gradient(90deg, blue, red, green)', // Same gradient for background
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '20px',
    fontWeight: "bold",
    textAlign: 'center',
    width: '100%',
    display: 'block',
    marginTop: '20px',
  };

  return (
    <div>
      <AdminNav />
      <ErrorMsg showToast={showToast} msg={msg} type={type} />
      <div className="container">
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-md-6 d-flex justify-content-left">
            {animationData && (
              <Lottie animationData={animationData} style={{ width: '400px', height: '400px' }} />
            )}
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header gradient-header text-white text-center">
                <h5>Crack your Salt</h5>
              </div>

              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="admin_email" className="form-label">
                    Entry Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="admin_email"
                    name="admin_email"
                    placeholder="Enter Username"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="admin_password" className="form-label">
                    Check Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="admin_password"
                    name="admin_password"
                    placeholder="Enter Password"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="button"
                    className="form-control btn btn-gradient"
                    name="admin_login"
                    value={"Let's Crack"}
                    onClick={handleLogin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={textStyle1}>Note: Do not change Email as it will track ur score.</div>
    </div>
  );
};

export default AdminLogin;
