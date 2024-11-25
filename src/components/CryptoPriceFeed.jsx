import React, { useEffect, useState } from 'react';

    const CryptoPriceFeed = () => {
      const [prices, setPrices] = useState({});

      useEffect(() => {
        const fetchPrices = async () => {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network&vs_currencies=usd'
          );
          const data = await response.json();
          setPrices(data);
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Update every minute
        return () => clearInterval(interval);
      }, []);

      return (
        <div>
          <h2>Crypto Prices</h2>
          <p>Ethereum: ${prices['ethereum']?.usd}</p>
          <p>Binance Coin: ${prices['binancecoin']?.usd}</p>
          <p>Polygon: ${prices['matic-network']?.usd}</p>
        </div>
      );
    };

    export default CryptoPriceFeed;
