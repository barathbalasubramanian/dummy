import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import SocialMedia from "./pages/SocialMedia";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Test from "./pages/Test";
import UserBlogs from "./pages/UserBlogs";
import SocioHome from "./pages/socailMedia/SocioHome";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home/> }/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/Sociohome" element={<SocioHome />} />
        <Route path="/test" element={<Test/>}/>
        <Route path="/blogs" element={<UserBlogs/>}/>
        <Route path="/dashboard" element={< DashBoard/>} />
      </Routes>
    </>
  );
}

export default App;
