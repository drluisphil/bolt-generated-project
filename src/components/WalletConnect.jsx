import React, { useEffect, useState } from 'react';
    import { ethers } from 'ethers';
    import Web3Modal from 'web3modal';
    import WalletConnectProvider from '@walletconnect/web3-provider';

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'YOUR_INFURA_ID', // Replace with your Infura ID
        },
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    const WalletConnect = ({ setProvider, setAccount }) => {
      const [balance, setBalance] = useState(null);

      useEffect(() => {
        if (web3Modal.cachedProvider) {
          connectWallet();
        }
      }, []);

      const connectWallet = async () => {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        setProvider(provider);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const balance = await signer.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      };

      const disconnectWallet = async () => {
        await web3Modal.clearCachedProvider();
        setProvider(null);
        setAccount(null);
        setBalance(null);
      };

      return (
        <div>
          {!account ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <div>
              <p>Account: {account}</p>
              <p>Balance: {balance} ETH</p>
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
            </div>
          )}
        </div>
      );
    };

    export default WalletConnect;
