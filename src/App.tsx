import { useState } from 'react';
import { TransactionsProvider } from './hooks/useTransactions';
import { Dashboard } from './Dashboard';
import { Header } from './Header';
import { NewTransactionModal } from './NewTransactionModal';
import { GlobalStyles } from './styles/global';
function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider >
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />

      <GlobalStyles />
    </TransactionsProvider>
  );
}

export default App;
