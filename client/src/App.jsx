import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Register } from "./pages/Register/register";
import { Homepage } from "./pages/Homepage/homepage";
import { AddEmployee } from "./pages/AddEmployee/addEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
