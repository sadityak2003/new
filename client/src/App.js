import { BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLogin from "./AdminPages/AdminLogin";
import AdminHome from "./AdminPages/AdminHome";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  const token = localStorage.getItem('token')
  const [tokendt, setTokendt] = useState({
    token
  })

  useEffect(() => {
    const checkToken = async() => {
      try {
        const res = await axios.post("http://localhost:5000/adminloginapi/checktoken", tokendt) 
        if (res.data.tokensts === 1) {
          localStorage.removeItem('token')
          localStorage.removeItem('aid')
          localStorage.removeItem('aemail')
          localStorage.removeItem('aname')
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkToken()
  }, [])

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path = "/adminlogin" element = {<AdminLogin/>}/>
        <Route exact path = "/adminhome" element = {<AdminHome/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
