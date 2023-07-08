import { useEffect, useState } from "react";
import { Container, UserContent, Title, Button } from "./style";
import Transactions from "./Transactions";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";

export default function Home() {

  const { auth } = useAuth();
  const [transactions, setTrasactions] = useState(null);

  useEffect(() => {

    API.getTransactions(auth.token)
      .then((res) => setTrasactions(res.data))
      .catch((err) => console.log(err.message));

  }, []);

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

    </Container>
  );
}