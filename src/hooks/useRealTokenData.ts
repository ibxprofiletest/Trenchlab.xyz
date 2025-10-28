import { useState, useEffect, useCallback } from 'react';
import { 
  SolanaToken, 
  SolanaTrade, 
  fetchTokenData, 
  fetchMultipleTokens, 
  generateRealisticTradesFromTokens,
  getTrendingTokens,
  getRecentTokens,
  POPULAR_SOLANA_TOKENS 
} from '../services/solanaApi';

interface UseRealTokenDataReturn {
  tokens: SolanaToken[];
  trades: SolanaTrade[];
  trendingTokens: SolanaToken[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getTokenByAddress: (address: string) => SolanaToken | undefined;
}

export const useRealTokenData = (): UseRealTokenDataReturn => {
  const [tokens, setTokens] = useState<SolanaToken[]>([]);
  const [trades, setTrades] = useState<SolanaTrade[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<SolanaToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the known tokens from our list (USDC, SOL, BONK, WIF, PEPE, etc.)
      const tokenList = await getRecentTokens();
      
      setTokens(tokenList);

      // Generate realistic trades based on the tokens
      const realisticTrades = generateRealisticTradesFromTokens(tokenList);
      setTrades(realisticTrades);

      // Fetch trending tokens
      const trending = await getTrendingTokens();
      setTrendingTokens(trending);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data');
      console.error('Error fetching real token data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTokenByAddress = useCallback((address: string): SolanaToken | undefined => {
    return tokens.find(token => token.address === address);
  }, [tokens]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Set up periodic refresh every 30 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  return {
    tokens,
    trades,
    trendingTokens,
    loading,
    error,
    refreshData,
    getTokenByAddress
  };
};

// Hook for getting real-time price updates for a specific token
export const useTokenPrice = (tokenAddress: string) => {
  const [token, setToken] = useState<SolanaToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tokenData = await fetchTokenData(tokenAddress);
      setToken(tokenData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token price');
    } finally {
      setLoading(false);
    }
  }, [tokenAddress]);

  useEffect(() => {
    fetchPrice();
    
    // Refresh price every 10 seconds
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return { token, loading, error, refreshPrice: fetchPrice };
};

// Hook for getting live trades for a specific token
export const useLiveTrades = (tokenAddress: string) => {
  const [trades, setTrades] = useState<SolanaTrade[]>([]);
  const [loading, setLoading] = useState(true);

  const generateLiveTrades = useCallback(async () => {
    try {
      setLoading(true);
      const token = await fetchTokenData(tokenAddress);
      if (token) {
        const liveTrades = generateRealisticTradesFromTokens([token]);
        setTrades(liveTrades.slice(0, 20)); // Show last 20 trades
      }
    } catch (err) {
      console.error('Error generating live trades:', err);
    } finally {
      setLoading(false);
    }
  }, [tokenAddress]);

  useEffect(() => {
    generateLiveTrades();
    
    // Generate new trades every 5 seconds
    const interval = setInterval(generateLiveTrades, 5000);
    return () => clearInterval(interval);
  }, [generateLiveTrades]);

  return { trades, loading };
};
