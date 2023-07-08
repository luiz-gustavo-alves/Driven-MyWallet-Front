import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, NewTransaction } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastro" element={<Register />} ></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/nova-transacao/:tipo" element={<NewTransaction />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}