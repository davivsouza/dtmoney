import { Transaction } from '../hooks/useTransactions';

export function getValuesFromTransactions(transactionType: Transaction[]) {
  const value = transactionType.reduce((total,{amount}) => {
    return total + amount;
  }, 0);

  return value;
}
