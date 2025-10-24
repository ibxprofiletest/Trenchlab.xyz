// Solana/PumpFun API service for fetching real token data
export interface SolanaToken {
  address: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface SolanaTrade {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: string;
  trader: string;
  signature: string;
}

// Popular Solana tokens with real addresses
export const POPULAR_SOLANA_TOKENS = [
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  'So11111111111111111111111111111111111111112', // SOL
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
  '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm', // WIF
  'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3', // PEPE
  'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', // JUP
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
  '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', // ENA
  'A8Y2b3DqthjB9rpX9ytp8WXtU6X11K4R6rb5oW6FZ3Th', // W
];

// Mock data that simulates real PumpFun/Solana token data
const MOCK_TOKEN_DATA: Record<string, SolanaToken> = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    marketCap: 32000000000,
    volume24h: 2500000000,
    priceChange24h: 0.01,
    liquidity: 500000000,
    holders: 2500000,
    createdAt: '2021-01-01T00:00:00Z',
    image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
  },
  'So11111111111111111111111111111111111111112': {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    price: 95.50,
    marketCap: 42000000000,
    volume24h: 1800000000,
    priceChange24h: 2.5,
    liquidity: 800000000,
    holders: 1200000,
    createdAt: '2020-03-01T00:00:00Z',
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  },
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    symbol: 'BONK',
    name: 'Bonk',
    price: 0.000012,
    marketCap: 800000000,
    volume24h: 45000000,
    priceChange24h: -5.2,
    liquidity: 25000000,
    holders: 180000,
    createdAt: '2022-12-25T00:00:00Z',
    image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png'
  },
  '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm': {
    address: '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm',
    symbol: 'WIF',
    name: 'dogwifhat',
    price: 2.85,
    marketCap: 2850000000,
    volume24h: 120000000,
    priceChange24h: 8.7,
    liquidity: 45000000,
    holders: 95000,
    createdAt: '2023-11-17T00:00:00Z',
    image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm/logo.png'
  },
  'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3': {
    address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.0000085,
    marketCap: 3500000000,
    volume24h: 280000000,
    priceChange24h: 12.3,
    liquidity: 85000000,
    holders: 220000,
    createdAt: '2023-04-14T00:00:00Z',
    image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3/logo.png'
  }
};

// Simulate fetching real token data from Jupiter API
export const fetchTokenData = async (tokenAddress: string): Promise<SolanaToken | null> => {
  try {
    // In a real implementation, you would call Jupiter API here:
    // const response = await fetch(`https://price.jup.ag/v4/price?ids=${tokenAddress}`);
    // const data = await response.json();
    
    // For now, return mock data with some randomization to simulate real market data
    const baseData = MOCK_TOKEN_DATA[tokenAddress];
    if (!baseData) return null;
    
    // Add some realistic price volatility
    const volatility = (Math.random() - 0.5) * 0.05; // ±2.5% price change
    const newPrice = baseData.price * (1 + volatility);
    
    // Simulate volume changes
    const volumeChange = (Math.random() - 0.5) * 0.3; // ±15% volume change
    const newVolume = baseData.volume24h * (1 + volumeChange);
    
    return {
      ...baseData,
      price: newPrice,
      volume24h: newVolume,
      priceChange24h: volatility * 100,
      marketCap: baseData.marketCap * (1 + volatility),
      liquidity: baseData.liquidity * (1 + volumeChange * 0.5)
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
};

// Fetch multiple tokens at once
export const fetchMultipleTokens = async (tokenAddresses: string[]): Promise<SolanaToken[]> => {
  const promises = tokenAddresses.map(address => fetchTokenData(address));
  const results = await Promise.all(promises);
  return results.filter((token): token is SolanaToken => token !== null);
};

// Generate realistic trades based on actual token data
export const generateRealisticTradesFromTokens = (tokens: SolanaToken[]): SolanaTrade[] => {
  const trades: SolanaTrade[] = [];
  const now = Date.now();
  
  // Generate trades for the last 24 hours
  for (let i = 0; i < 100; i++) {
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const timestamp = new Date(now - (Math.random() * 24 * 60 * 60 * 1000));
    
    // Generate realistic trade amounts based on token price and market cap
    let amount: number;
    let price = token.price;
    
    if (token.price > 10) {
      // For high value tokens (SOL, etc.), smaller amounts
      amount = Math.random() * 50 + 5;
    } else if (token.price > 1) {
      // For medium value tokens (USDC, etc.)
      amount = Math.random() * 1000 + 100;
    } else if (token.price > 0.001) {
      // For low-medium value tokens (WIF, etc.)
      amount = Math.random() * 10000 + 1000;
    } else {
      // For very low value tokens (meme coins), larger amounts
      amount = Math.random() * 1000000 + 100000;
    }
    
    // Add realistic price volatility based on token's actual volatility
    const baseVolatility = Math.abs(token.priceChange24h) / 100;
    const volatility = (Math.random() - 0.5) * baseVolatility * 2;
    price = price * (1 + volatility);
    
    // Generate realistic trader addresses (shortened Solana addresses)
    const traderAddress = generateSolanaAddress();
    
    trades.push({
      id: `trade_${i}_${Date.now()}`,
      tokenAddress: token.address,
      tokenSymbol: token.symbol,
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      amount: Math.floor(amount),
      price: price,
      timestamp: timestamp.toISOString(),
      trader: traderAddress,
      signature: generateTransactionSignature()
    });
  }
  
  return trades.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate realistic Solana address
const generateSolanaAddress = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result + '...' + chars.charAt(Math.floor(Math.random() * chars.length));
};

// Generate realistic transaction signature
const generateTransactionSignature = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result + '...' + chars.charAt(Math.floor(Math.random() * chars.length));
};

// Get trending tokens (simulate PumpFun trending)
export const getTrendingTokens = async (): Promise<SolanaToken[]> => {
  // In a real implementation, you would call PumpFun API or Jupiter API
  // For now, return popular tokens with enhanced volatility
  const trendingAddresses = POPULAR_SOLANA_TOKENS.slice(0, 5);
  const tokens = await fetchMultipleTokens(trendingAddresses);
  
  // Add extra volatility to simulate trending behavior
  return tokens.map(token => ({
    ...token,
    priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 20, // Add ±10% extra volatility
    volume24h: token.volume24h * (1 + Math.random() * 0.5) // Increase volume by up to 50%
  }));
};

// Get token by symbol
export const getTokenBySymbol = async (symbol: string): Promise<SolanaToken | null> => {
  const allTokens = Object.values(MOCK_TOKEN_DATA);
  const token = allTokens.find(t => t.symbol.toLowerCase() === symbol.toLowerCase());
  
  if (token) {
    return await fetchTokenData(token.address);
  }
  
  return null;
};

// Export popular token addresses for easy access
