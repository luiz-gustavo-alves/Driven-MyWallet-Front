import { Container, Transaction, Content, LeftContent, Date, Title, Value, Footer, Default } from "./style";

export default function Transactions(props) {

  const { total, transactions } = props.transactions;

  return (
    <Container>

      {transactions &&
        <>
          <Content>
            {transactions.map((transaction, index) => (
              <Transaction key={index}>
                <LeftContent>
                  <Date>{transaction.date}</Date>
                  <Title data-test="registry-name">{transaction.description}</Title>
                </LeftContent>
                <Value type={transaction.type} data-test="registry-amount">{(transaction.value.toFixed(2)).replace(".", ",")}</Value>
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