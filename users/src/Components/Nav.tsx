import React from "react";
import { Routes, Route } from "react-router-dom";
import Formpage from "./Formpage";
import Form1 from "./Form1";
import Todo from "./Todo";
import About from "./About";
import Home from "./Home";
import Dummy from "./Dummy";
import Form from "./Form";

const Nav = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formpage" element={<Formpage />} />
        <Route path="/about" element={<About />} />
        <Route path="/nav1" element={<Form1 />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/item2" element={<Form/>} />
        
      </Routes>
    </div>
  );
};

export default Nav;
