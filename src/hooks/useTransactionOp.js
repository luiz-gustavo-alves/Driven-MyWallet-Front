import { useContext } from "react";
import TransactionOpContext from "../contexts/TransactionOpContext";

const useTransactionOp = () => useContext(TransactionOpContext);

export default useTransactionOp;