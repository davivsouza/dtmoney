import { Container } from './styles';
import incomeImg from '../assets/income.svg';
import outcomeImg from '../assets/outcome.svg';
import totalImg from '../assets/total.svg';
import {useTransactions} from '../hooks/useTransactions';
import { formatCurrency } from '../utils/formatCurrency';
export function Summary(){

  const {transactions} = useTransactions();


  // MANEIRA QUE FIZ SEM AJUDA DO VÍDEO
  // const transactionsIncomes = transactions.filter(transaction => transaction.type === 'deposit');
  // const incomes = getValuesFromTransactions(transactionsIncomes);

  // const transactionsOutcomes = transactions.filter(transaction => transaction.type === 'withdraw');
  // const outcomes = getValuesFromTransactions(transactionsOutcomes);

  // MANEIRA DO VÍDEO
  const summary = transactions.reduce((acc, transaction) => {

    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    }else{
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    //valores do accumulator
    deposits: 0,
    withdraws: 0,
    total: 0
  });
  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entrada" />
        </header>
        <strong>{formatCurrency(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Sáidas</p>
          <img src={outcomeImg} alt="Entrada" />
        </header>
        <strong>-{formatCurrency(summary.withdraws)}</strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Entrada" />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
}
