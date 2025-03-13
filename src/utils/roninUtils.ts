/**
 * Utility functions for interacting with the Ronin blockchain
 */

// Convert a Ronin address to Ethereum format
export const convertRoninToEthAddress = (roninAddress: string): string => {
  if (!roninAddress.startsWith('ronin:')) {
    throw new Error('Invalid Ronin address format');
  }
  
  // Remove the 'ronin:' prefix and add '0x' prefix
  return '0x' + roninAddress.substring(6);
};

// Convert an Ethereum address to Ronin format
export const convertEthToRoninAddress = (ethAddress: string): string => {
  if (!ethAddress.startsWith('0x')) {
    throw new Error('Invalid Ethereum address format');
  }
  
  // Remove the '0x' prefix and add 'ronin:' prefix
  return 'ronin:' + ethAddress.substring(2);
};

// Validate a Ronin address
export const isValidRoninAddress = (address: string): boolean => {
  return /^ronin:[0-9a-fA-F]{40}$/.test(address);
};

// Format a Ronin address for display (abbreviate the middle)
export const formatRoninAddress = (address: string): string => {
  if (!address || address.length < 12) return address;
  return `${address.substring(0, 9)}...${address.substring(address.length - 6)}`;
};

// Calculate staking duration in days
export const calculateStakingDuration = (startTimestamp: number, endTimestamp?: number | null): number => {
  const end = endTimestamp || Date.now();
  const durationMs = end - startTimestamp;
  return Math.round(durationMs / (24 * 60 * 60 * 1000)); // Convert ms to days
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
};