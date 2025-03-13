// src/hooks/useStakingData.ts
import { useState, useEffect, useCallback } from 'react';
import { getStakingData, ProcessedStakingData } from '../services/roninBlockchainService';

interface UseStakingDataReturn {
  data: ProcessedStakingData | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (address: string) => Promise<void>;
  resetData: () => void;
}

// Custom hook for fetching and managing staking data
export const useStakingData = (): UseStakingDataReturn => {
  const [data, setData] = useState<ProcessedStakingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch staking data
  const fetchData = useCallback(async (address: string) => {
    if (!address) {
      setError('Please provide a valid Ronin address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const stakingData = await getStakingData(address);
      setData(stakingData);
    } catch (err) {
      console.error('Error fetching staking data:', err);
      setError('Failed to fetch staking data. Please check the address and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to reset the data
  const resetData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);
  
  // Save recent searches to localStorage
  useEffect(() => {
    if (data) {
      try {
        // Get existing recent searches
        const recentSearchesStr = localStorage.getItem('recentStakingSearches') || '[]';
        const recentSearches = JSON.parse(recentSearchesStr);
        
        // Add the current search to the beginning of the list
        const timestamp = new Date().toISOString();
        const newSearch = { 
          address: data.uniqueStakers[0]?.address || '', 
          timestamp,
          totalStakers: data.totalUniqueStakers,
          totalNfts: data.totalNftsStaked
        };
        
        // Add to beginning and limit to 5 recent searches
        const updatedSearches = [
          newSearch,
          ...recentSearches.filter((search: any) => search.address !== newSearch.address)
        ].slice(0, 5);
        
        localStorage.setItem('recentStakingSearches', JSON.stringify(updatedSearches));
      } catch (err) {
        console.error('Error saving recent search:', err);
      }
    }
  }, [data]);
  
  return {
    data,
    isLoading,
    error,
    fetchData,
    resetData
  };
};

// Helper hook to get recent searches
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      const recentSearchesStr = localStorage.getItem('recentStakingSearches') || '[]';
      setRecentSearches(JSON.parse(recentSearchesStr));
    } catch (err) {
      console.error('Error loading recent searches:', err);
      setRecentSearches([]);
    }
  }, []);
  
  return recentSearches;
};