import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Types
interface StakingData {
  address: string;
  nftsStaked: number;
  totalDurationInDays: number;
}

interface StakingVisualizationProps {
  stakingData: {
    uniqueStakers: StakingData[];
    totalUniqueStakers: number;
    totalNftsStaked: number;
    averageStakingDuration: number;
  } | null;
}

// Format address for display
const formatAddress = (address: string) => {
  if (!address || address.length < 15) return address;
  return `${address.substring(0, 7)}...${address.substring(address.length - 4)}`;
};

const StakingVisualization: React.FC<StakingVisualizationProps> = ({ stakingData }) => {
  // If no data, return nothing
  if (!stakingData || !stakingData.uniqueStakers.length) {
    return null;
  }
  
  // Prepare data for pie chart - NFTs by staker
  const pieData = useMemo(() => {
    // Take top 5 stakers and combine the rest
    const topStakers = stakingData.uniqueStakers.slice(0, 5);
    
    // Calculate sum of NFTs for remaining stakers
    const otherStakersNfts = stakingData.uniqueStakers
      .slice(5)
      .reduce((sum, staker) => sum + staker.nftsStaked, 0);
    
    const result = topStakers.map(staker => ({
      name: formatAddress(staker.address),
      value: staker.nftsStaked
    }));
    
    // Add "Others" category if there are more than 5 stakers
    if (otherStakersNfts > 0) {
      result.push({
        name: 'Others',
        value: otherStakersNfts
      });
    }
    
    return result;
  }, [stakingData]);
  
  // Duration groups for bar chart
  const durationGroups = useMemo(() => {
    const groups = [
      { name: '0-30 days', count: 0 },
      { name: '31-90 days', count: 0 },
      { name: '91-180 days', count: 0 },
      { name: '181-365 days', count: 0 },
      { name: '365+ days', count: 0 }
    ];
    
    stakingData.uniqueStakers.forEach(staker => {
      const duration = staker.totalDurationInDays;
      
      if (duration <= 30) groups[0].count += staker.nftsStaked;
      else if (duration <= 90) groups[1].count += staker.nftsStaked;
      else if (duration <= 180) groups[2].count += staker.nftsStaked;
      else if (duration <= 365) groups[3].count += staker.nftsStaked;
      else groups[4].count += staker.nftsStaked;
    });
    
    return groups;
  }, [stakingData]);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#4A90E2'];
  
  return (
    <div className="mt-8 space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">NFT Distribution by Staker</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} NFTs`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">NFTs by Staking Duration</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={durationGroups}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} NFTs`, 'Count']} />
              <Bar dataKey="count" name="NFT Count" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StakingVisualization;