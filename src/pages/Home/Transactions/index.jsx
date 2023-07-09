import { Container, Transaction, Content, LeftContent, Day, Title, RightContent, Value, Button, Footer, Default } from "./style";
import API from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import useTransactionOp from "../../../hooks/useTransactionOp";

export default function Transactions(props) {

  const { total, transactions } = props.transactions;
  const { auth } = useAuth();
  const { setTransactionOp } = useTransactionOp();

  const deleteTransaction = (index) => {

    if (!window.confirm("Tem certeza de que quer excluir esta transação?")) {
      return;
    }

    const transactionIndex = (transactions.length - 1) - index;
    API.deleteTransaction(transactionIndex, auth.token)
      .then(() => setTransactionOp({ delete: true }))
      .catch((err) => {

        if (err.response.status === 403) {
          alert("Operação invalida.");

        } else {
          alert(err.message);
        }
      });
  }

  return (
    <Container>

      {transactions &&
        <>
          <Content>
            {transactions.map((transaction, index) => (
              <Transaction key={index}>
                <LeftContent>
                  <Day>{transaction.date}</Day>
                  <Title data-test="registry-name">{transaction.description}</Title>
                </LeftContent>
                <RightContent>
                  <Value type={transaction.type} data-test="registry-amount">{(transaction.value.toFixed(2)).replace(".", ",")}</Value>
                  <Button onClick={() => deleteTransaction(index)}>{"x"}</Button>
                </RightContent>
              </Transaction>
            ))}
          </Content>

          <Footer>
            {"SALDO"}
            <Value total={total} data-test="total-amount">
              {(total.toFixed(2)).replace(".", ",")}
            </Value>
          </Footer>
        </>
      }

      {!transactions &&
        <Default>{"Não há registros de entrada ou saída"}</Default>
      }

    </Container>
  );
}