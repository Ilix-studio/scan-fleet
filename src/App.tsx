import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./mainComponent/Home/Home";
import Signup from "./mainComponent/Pages/Signup";
import Login from "./mainComponent/Pages/Login";
import DecisionPage from "./mainComponent/Pages/DecisionPage";
import StickerEditor from "./mainComponent/Features/StickerEditor";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/decision-page' element={<DecisionPage />} />
        <Route path='/sticker-editor' element={<StickerEditor />} />
      </Routes>
    </>
  );
};

export default App;
