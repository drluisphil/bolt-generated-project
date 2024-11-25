import React from 'react';

    const GameStatistics = ({ stats }) => {
      return (
        <div>
          <h2>Game Statistics</h2>
          <p>Total Bets: {stats.totalBets}</p>
          <p>Total Wins: {stats.totalWins}</p>
          <p>Total Losses: {stats.totalLosses}</p>
          <p>Win Rate: {stats.winRate}%</p>
        </div>
      );
    };

    export default GameStatistics;
