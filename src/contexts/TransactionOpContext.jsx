import { createContext, useState } from "react";

const TransactionOpContext = createContext();

export function TransactionOpProvider({ children }) {

  const [transactionOp, setTransactionOp] = useState(null);

  return (
    <TransactionOpContext.Provider value={{ transactionOp, setTransactionOp }}>
      {children}
    </TransactionOpContext.Provider>
  );
}

export default TransactionOpContext;