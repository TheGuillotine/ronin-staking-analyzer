import React from 'react';
import RoninStakingAnalyzer from './components/RoninStakingAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Ronin Staking Explorer</h1>
          <p className="text-blue-200">Analyze staking activity on the Ronin blockchain</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <RoninStakingAnalyzer />
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Ronin Staking Explorer</p>
          <p className="text-sm text-gray-400 mt-2">
            This application interacts with the Ronin blockchain. All data is fetched directly from the blockchain.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;