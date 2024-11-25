import React, { useEffect, useState } from 'react';
    import { ethers } from 'ethers';
    import RouletteABI from '../contracts/Roulette.json';

    const DepositVerification = ({ provider, account }) => {
      const [balance, setBalance] = useState(0);
      const [deposits, setDeposits] = useState([]);

      useEffect(() => {
        if (provider && account) {
          const signer = provider.getSigner();
          const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
          const contract = new ethers.Contract(contractAddress, RouletteABI, signer);

          const fetchBalance = async () => {
            const balance = await contract.getBalance(account);
            setBalance(ethers.utils.formatEther(balance));
          };

          const handleDeposit = (user, amount) => {
            setDeposits((prevDeposits) => [
              ...prevDeposits,
              { user, amount: ethers.utils.formatEther(amount) },
            ]);
            fetchBalance();
          };

          contract.on('Deposit', handleDeposit);

          fetchBalance();

          return () => {
            contract.off('Deposit', handleDeposit);
          };
        }
      }, [provider, account]);

      return (
        <div>
          <h2>Deposit Verification</h2>
          <p>Balance: {balance} ETH</p>
          <h3>Deposits</h3>
          <ul>
            {deposits.map((deposit, index) => (
              <li key={index}>
                {deposit.user}: {deposit.amount} ETH
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default DepositVerification;
