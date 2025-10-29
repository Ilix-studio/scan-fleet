import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./mainComponent/Home/Home";
import Signup from "./mainComponent/Pages/Signup";
import Login from "./mainComponent/Pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
