import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Register, NewTransaction, UpdateTransaction } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { TransactionOpProvider } from "./contexts/TransactionOpContext";

export default function App() {

  return (
    <AuthProvider>
      <TransactionOpProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/cadastro" element={<Register />} ></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/nova-transacao/:tipo" element={<NewTransaction />}></Route>
            <Route path="/editar-registro/:tipo/:id" element={<UpdateTransaction />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TransactionOpProvider>
    </AuthProvider>
  );
}