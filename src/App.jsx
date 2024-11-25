import React, { useState } from 'react';
    import './App.css';
    import WalletConnect from './components/WalletConnect';
    import RouletteGame from './components/RouletteGame';
    import TransactionHistory from './components/TransactionHistory';
    import GameStatistics from './components/GameStatistics';
    import CryptoPriceFeed from './components/CryptoPriceFeed';
    import DepositVerification from './components/DepositVerification';

    function App() {
      const [transactions, setTransactions] = useState([
        { type: 'Bet', amount: 10, currency: 'ETH', status: 'Pending' },
        { type: 'Win', amount: 20, currency: 'ETH', status: 'Completed' },
      ]);

      const [stats, setStats] = useState({
        totalBets: 10,
        totalWins: 5,
        totalLosses: 5,
        winRate: 50,
      });

      const [provider, setProvider] = useState(null);
      const [account, setAccount] = useState(null);

      return (
        <div className="App">
          <h1>Welcome to Roulette Game</h1>
          <WalletConnect setProvider={setProvider} setAccount={setAccount} />
          <RouletteGame />
          <CryptoPriceFeed />
          <DepositVerification provider={provider} account={account} />
          <TransactionHistory transactions={transactions} />
          <GameStatistics stats={stats} />
        </div>
      );
    }

    export default App;
