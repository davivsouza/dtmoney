import { createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../utils/api';


export interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  type: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps{
  children: ReactNode
}

interface TransactionsContextData{
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}:TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(()=>{
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput){
    const {data} = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date()
    });
    const {transaction} = data;

    setTransactions([
      ...transactions,
      transaction
    ]);
  }
  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}


export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}
