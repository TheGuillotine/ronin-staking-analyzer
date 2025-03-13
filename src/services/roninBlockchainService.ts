// src/services/roninBlockchainService.ts

// ABI for the staking contract - this is just an example
// You'll need to replace this with the actual ABI of the staking contract you're interacting with
const STAKING_CONTRACT_ABI = [
  // Events
  "event Staked(address indexed user, uint256 indexed tokenId, uint256 timestamp)",
  "event Unstaked(address indexed user, uint256 indexed tokenId, uint256 timestamp)",
  
  // Read functions
  "function getStakedTokens(address staker) view returns (uint256[])",
  "function stakingInfo(uint256 tokenId) view returns (address staker, uint256 timestamp)"
];

// Interface for the staking data
export interface StakingEvent {
  staker: string;
  tokenId: string;
  stakingStartTime: number;
  stakingEndTime: number | null;
}

export interface ProcessedStakingData {
  uniqueStakers: {
    address: string;
    nftsStaked: number;
    totalDurationInDays: number;
  }[];
  totalUniqueStakers: number;
  totalNftsStaked: number;
  averageStakingDuration: number;
}

// Convert Ronin address to Ethereum format
const convertToEthAddress = (roninAddress: string): string => {
  if (roninAddress.startsWith('ronin:')) {
    return '0x' + roninAddress.substring(6);
  }
  return roninAddress; // already in eth format
};

// Convert Ethereum address to Ronin format
const convertToRoninAddress = (ethAddress: string): string => {
  if (ethAddress.startsWith('0x')) {
    return 'ronin:' + ethAddress.substring(2);
  }
  return ethAddress; // already in ronin format
};

/**
 * Fetch all staking events for a contract
 * 
 * Note: This is a mock implementation for demonstration purposes.
 * In a real-world application, you would use ethers.js to interact with the blockchain.
 */
export const fetchStakingEvents = async (contractAddress: string): Promise<StakingEvent[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data representing staking events
    const mockEvents: StakingEvent[] = [
      { staker: 'ronin:abc123def456abc123def456abc123def456abcd', tokenId: '1001', stakingStartTime: Date.now() - 90 * 24 * 60 * 60 * 1000, stakingEndTime: Date.now() - 10 * 24 * 60 * 60 * 1000 },
      { staker: 'ronin:abc123def456abc123def456abc123def456abcd', tokenId: '1002', stakingStartTime: Date.now() - 120 * 24 * 60 * 60 * 1000, stakingEndTime: null },
      { staker: 'ronin:5678abcd5678abcd5678abcd5678abcd5678abcd', tokenId: '1003', stakingStartTime: Date.now() - 60 * 24 * 60 * 60 * 1000, stakingEndTime: Date.now() - 30 * 24 * 60 * 60 * 1000 },
      { staker: 'ronin:5678abcd5678abcd5678abcd5678abcd5678abcd', tokenId: '1004', stakingStartTime: Date.now() - 45 * 24 * 60 * 60 * 1000, stakingEndTime: null },
      { staker: 'ronin:5678abcd5678abcd5678abcd5678abcd5678abcd', tokenId: '1005', stakingStartTime: Date.now() - 30 * 24 * 60 * 60 * 1000, stakingEndTime: null },
      { staker: 'ronin:9012efgh9012efgh9012efgh9012efgh9012efgh', tokenId: '1006', stakingStartTime: Date.now() - 180 * 24 * 60 * 60 * 1000, stakingEndTime: Date.now() - 90 * 24 * 60 * 60 * 1000 },
      { staker: 'ronin:3456ijkl3456ijkl3456ijkl3456ijkl3456ijkl', tokenId: '1007', stakingStartTime: Date.now() - 200 * 24 * 60 * 60 * 1000, stakingEndTime: null },
      { staker: 'ronin:7890mnop7890mnop7890mnop7890mnop7890mnop', tokenId: '1008', stakingStartTime: Date.now() - 150 * 24 * 60 * 60 * 1000, stakingEndTime: Date.now() - 120 * 24 * 60 * 60 * 1000 },
    ];
    
    return mockEvents;
  } catch (error) {
    console.error('Error fetching staking events:', error);
    throw new Error('Failed to fetch staking data from Ronin blockchain');
  }
};

/**
 * Process staking data to get analytics
 */
export const processStakingData = (events: StakingEvent[]): ProcessedStakingData => {
  // Group staking events by staker address
  const stakerMap = new Map<string, { nfts: Set<string>, totalDuration: number }>();
  
  // Process each staking event
  events.forEach(event => {
    const currentTime = Date.now();
    const endTime = event.stakingEndTime || currentTime; // If still staked, use current time
    const durationInDays = (endTime - event.stakingStartTime) / (24 * 60 * 60 * 1000);
    
    if (stakerMap.has(event.staker)) {
      const stakerData = stakerMap.get(event.staker)!;
      stakerData.nfts.add(event.tokenId);
      stakerData.totalDuration += durationInDays;
    } else {
      stakerMap.set(event.staker, {
        nfts: new Set([event.tokenId]),
        totalDuration: durationInDays
      });
    }
  });
  
  // Convert map to array of staker data
  const uniqueStakers = Array.from(stakerMap.entries()).map(([address, data]) => ({
    address,
    nftsStaked: data.nfts.size,
    totalDurationInDays: Math.round(data.totalDuration)
  }));
  
  // Sort by number of NFTs staked (descending)
  uniqueStakers.sort((a, b) => b.nftsStaked - a.nftsStaked);
  
  // Calculate summary statistics
  const totalUniqueStakers = uniqueStakers.length;
  const totalNftsStaked = uniqueStakers.reduce((sum, staker) => sum + staker.nftsStaked, 0);
  const totalDuration = uniqueStakers.reduce((sum, staker) => sum + staker.totalDurationInDays, 0);
  const averageStakingDuration = totalUniqueStakers > 0 
    ? Math.round(totalDuration / totalUniqueStakers) 
    : 0;
  
  return {
    uniqueStakers,
    totalUniqueStakers,
    totalNftsStaked,
    averageStakingDuration
  };
};

/**
 * Analyze staking data for a contract address
 */
export const analyzeStakingContract = async (contractAddress: string): Promise<ProcessedStakingData> => {
  try {
    const stakingEvents = await fetchStakingEvents(contractAddress);
    return processStakingData(stakingEvents);
  } catch (error) {
    console.error('Error analyzing staking contract:', error);
    throw error;
  }
};

/**
 * Get real-time staking data
 * This function includes caching to reduce API calls
 */
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const stakingDataCache = new Map<string, { data: ProcessedStakingData, timestamp: number }>();

export const getStakingData = async (contractAddress: string): Promise<ProcessedStakingData> => {
  // Check cache first
  const cachedData = stakingDataCache.get(contractAddress);
  const now = Date.now();
  
  if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
    return cachedData.data;
  }
  
  // Fetch fresh data
  const data = await analyzeStakingContract(contractAddress);
  
  // Update cache
  stakingDataCache.set(contractAddress, { data, timestamp: now });
  
  return data;
};