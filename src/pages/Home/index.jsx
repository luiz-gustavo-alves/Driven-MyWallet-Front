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

  if (transactions === null) {
    return <h1>Carregando...</h1>
  }

  return (
    <Container>
      <UserContent>
        <Title>Olá, {auth.username}</Title>
        <Button>
          <img src="./src/assets/images/exit-door.svg"></img>
        </Button>
      </UserContent>

      <Transactions transactions={transactions} />

      <Footer>
        <Option>
          <Button>
            <img src="./src/assets/images/plus.svg"></img>
          </Button>

          <StyledLink to="/nova-transacao/entrada">
            <p>Nova Entrada</p>
          </StyledLink>
        </Option>

        <Option>
          <Button>
            <img src="./src/assets/images/minus.svg"></img>
          </Button>

          <StyledLink to="/nova-transacao/saida">
            <p>Nova Saída</p>
          </StyledLink>
        </Option>
      </Footer>

    </Container>
  );
}