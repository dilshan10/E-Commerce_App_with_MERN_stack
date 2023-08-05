import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Poilcy from "./pages/Policy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Regidter from "./pages/Auth/Regidter";
import Login from "./pages/Auth/Login";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/Routes/private"
import ForgotPassword from "./pages/Auth/ForgotPassword";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/dashboard" element={<PrivateRoute/>} >
        <Route path="" element={<DashBoard/>} />
      </Route>
      
      <Route path="/about" element={<About/>} />
      <Route path="/policy" element={<Poilcy/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/register" element={<Regidter/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/login" element={<Login/>} />
      
    </Routes>
    </>
  );
}

export default App;
