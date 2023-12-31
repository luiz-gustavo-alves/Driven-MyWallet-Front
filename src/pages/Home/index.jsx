import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, UserContent, Title, Button, Footer, Option, StyledLink, Loader } from "./style";
import Transactions from "./Transactions";
import useAuth from "../../hooks/useAuth";
import useTransactionOp from "../../hooks/useTransactionOp";
import { exit_door, minus, plus } from "../../assets/images";
import { Oval } from "react-loader-spinner";
import API from "../../services/api";

export default function Home() {

  const { auth } = useAuth();
  const { transactionOp } = useTransactionOp();
  const navigate = useNavigate();
  const [transactions, setTrasactions] = useState(null);

  useEffect(() => {

    if (!auth.token) {
      navigate("/");

    } else {

      API.getTransactions(auth.token)
        .then((res) => setTrasactions(res.data))
        .catch((err) => {

          alert(err.message);
          localStorage.removeItem("auth");
          navigate("/");
        });
    }

  }, [transactionOp, ]);

  const logout = () => {

    localStorage.removeItem("auth");
    navigate("/");
  }

  if (transactions === null) {
    return (
      <Loader>
        <Oval
          height="200"
          width="200"
          color="#fff"
          ariaLabel='oval-loading'
          secondaryColor="#fff"
          strokeWidth={2}
          strokeWidthSecondary={2}
          visible={true}
        />
      </Loader>
    );
  }

  return (
    <Container>
      <UserContent>
        <Title data-test="user-name">Olá, {auth.username}</Title>
        <Button onClick={logout} title="Sair" data-test="logout">
          <img src={exit_door}></img>
        </Button>
      </UserContent>

      <Transactions transactions={transactions} />

      <Footer>
        <Option>
          <Button onClick={() => navigate("/nova-transacao/entrada")} title="Nova Entrada" data-test="new-income">
            <img src={plus}></img>
          </Button>

          <StyledLink to="/nova-transacao/entrada">
            <p>Nova Entrada</p>
          </StyledLink>
        </Option>

        <Option>
          <Button onClick={() => navigate("/nova-transacao/saida")} title="Nova Saída" data-test="new-expense">
            <img src={minus}></img>
          </Button>

          <StyledLink to="/nova-transacao/saida">
            <p>Nova Saída</p>
          </StyledLink>
        </Option>
      </Footer>

    </Container>
  );
}