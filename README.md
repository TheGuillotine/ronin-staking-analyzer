# Ronin Staking Analyzer

A web application for analyzing staking activity on the Ronin blockchain. This tool allows users to input a Ronin blockchain address and view detailed analytics about staking activity, including:

- List of unique addresses that have staked NFTs
- Number of NFTs staked by each address
- Total staking duration for each NFT
- Visualizations of staking patterns and distributions

## Features

- **Address Lookup**: Enter any Ronin blockchain address to analyze staking activity
- **Staking Analytics**: View comprehensive statistics about staking patterns
- **Visualizations**: Interactive charts showing NFT distribution and staking duration
- **Recent Searches**: Quick access to previously analyzed addresses
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Blockchain Integration**: ethers.js
- **Visualizations**: Recharts
- **State Management**: React Hooks

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── RoninStakingAnalyzer.tsx     # Main analyzer component
│   │   ├── StakingVisualization.tsx     # Data visualization component
│   │   └── ui/                          # UI components
│   ├── services/
│   │   ├── roninBlockchainService.ts    # Blockchain interaction service
│   │   └── roninService.ts              # Staking data processing
│   ├── hooks/
│   │   └── useStakingData.ts            # Custom data fetching hook
│   ├── utils/
│   │   └── roninUtils.ts                # Utility functions for Ronin blockchain
│   ├── App.tsx                          # Main application component
│   └── index.tsx                        # Application entry point
└── package.json                         # Project dependencies
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/TheGuillotine/ronin-staking-analyzer.git
   ```

2. Navigate to the project directory:
   ```
   cd ronin-staking-analyzer
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to http://localhost:3000

## Usage

1. Enter a valid Ronin blockchain address in the format `ronin:abc123...` (42 characters total)
2. Click "Analyze" to fetch and process the staking data
3. View the analytics and visualizations of the staking activity
4. Explore individual staker details and patterns

## Blockchain Integration

This application interacts with the Ronin blockchain using the ethers.js library. It fetches staking events from staking contracts and processes them to provide meaningful analytics. 

### Real-World Implementation Notes

In a production environment, you would need to:

1. Configure a Ronin RPC provider or node access
2. Set up proper rate limiting and caching to avoid excessive blockchain requests
3. Implement error handling for blockchain connectivity issues
4. Consider pagination for large datasets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ronin Blockchain Team for providing the blockchain infrastructure
- Ethers.js team for the excellent Ethereum/Ronin interaction library
- React and Tailwind CSS communities for the frontend tools

## Contact

For questions or feedback, please open an issue in the GitHub repository.