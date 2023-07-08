import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, UserContent, Title, Button, Footer, Option, StyledLink } from "./style";
import Transactions from "./Transactions";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";

export default function Home() {

  const { auth } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTrasactions] = useState(null);

  useEffect(() => {

    if (!auth.token) {
      navigate("/");

    } else {

      API.getTransactions(auth.token)
        .then((res) => setTrasactions(res.data))
        .catch((err) => alert(err.message));
    }

  }, [auth.token, ]);

  const logout = () => {

    localStorage.removeItem("auth");
    navigate("/");
  }

  if (transactions === null) {
    return <h1>Carregando...</h1>
  }

  return (
    <Container>
      <UserContent>
        <Title>Olá, {auth.username}</Title>
        <Button onClick={logout} title="Sair">
          <img src="./src/assets/images/exit-door.svg"></img>
        </Button>
      </UserContent>

      <Transactions transactions={transactions} />

      <Footer>
        <Option>
          <Button onClick={() => navigate("/nova-transacao/entrada")} title="Nova Entrada">
            <img src="./src/assets/images/plus.svg"></img>
          </Button>

          <StyledLink to="/nova-transacao/entrada" title="Nova Entrada">
            <p>Nova Entrada</p>
          </StyledLink>
        </Option>

        <Option>
          <Button onClick={() => navigate("/nova-transacao/saida")} title="Nova Saída">
            <img src="./src/assets/images/minus.svg"></img>
          </Button>

          <StyledLink to="/nova-transacao/saida" title="Nova Saída">
            <p>Nova Saída</p>
          </StyledLink>
        </Option>
      </Footer>

    </Container>
  );
}