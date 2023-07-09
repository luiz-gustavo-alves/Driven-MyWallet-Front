import { Container, Transaction, Content, LeftContent, Day, Title, RightContent, Value, Button, Footer, Default } from "./style";
import API from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import useTransactionOp from "../../../hooks/useTransactionOp";
import { useNavigate } from "react-router-dom";

export default function Transactions(props) {

  const { total, transactions } = props.transactions;
  const { auth } = useAuth();
  const { setTransactionOp } = useTransactionOp();
  const navigate = useNavigate();

  const formatTotal = (total) => {
    
    return (total >= 0) ? 
      (total.toFixed(2)).replace(".", ",") : ((total.toFixed(2)).replace(".", ",")).replace("-", "");
  }

  const getTransactionIndex = (index) => {
    return (transactions.length - 1) - index;
  }

  const deleteTransaction = (index) => {

    if (!window.confirm("Tem certeza de que quer excluir esta transação?")) {
      return;
    }

    const transactionIndex = getTransactionIndex(index);

    API.deleteTransaction(transactionIndex, auth.token)
      .then(() => setTransactionOp({ operation: "delete" }))
      .catch((err) => {

        if (err.response.status === 403) {
          alert("Operação invalida.");

        } else {
          alert(err.message);
          localStorage.removeItem("auth");
          navigate("/");
        }
      });
  }

  const editTransaction = (transaction, index) => {

    const transactionIndex = getTransactionIndex(index);
    navigate(`/editar-registro/${transaction.type}/${transactionIndex}`);
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
                  <Title 
                    data-test="registry-name" 
                    onClick={() => editTransaction(transaction, index)}
                    title="Editar registro"
                    >{transaction.description}
                  </Title>
                </LeftContent>

                <RightContent>
                  <Value 
                    type={transaction.type} 
                    data-test="registry-amount"
                  >{(transaction.value.toFixed(2)).replace(".", ",")}</Value>
                  <Button
                    data-test="registry-delete"
                    onClick={() => deleteTransaction(index)}
                    title="Apagar registro"
                    >{"x"}
                  </Button>
                </RightContent>
              </Transaction>
            ))}
          </Content>

          <Footer>
            {"SALDO"}
            <Value total={total} data-test="total-amount">
              {formatTotal(total)}
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