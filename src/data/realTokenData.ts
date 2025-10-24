// Real-time token data fetcher from Solana/pump.fun
import { SolanaToken, SolanaTrade, fetchMultipleTokens, generateRealisticTradesFromTokens, POPULAR_SOLANA_TOKENS } from '../services/solanaApi';
import type { Decision, AIModel } from '../types';
import { AI_MODELS } from '../types';

export interface TokenData {
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
}

export interface RealTrade {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: string;
  trader: string;
}

// Mock real token data based on actual pump.fun patterns
export const REAL_TOKENS: TokenData[] = [
  {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    marketCap: 32000000000,
    volume24h: 2500000000,
    priceChange24h: 0.01,
    liquidity: 500000000,
    holders: 2500000,
    createdAt: '2021-01-01T00:00:00Z'
  },
  {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    price: 95.50,
    marketCap: 42000000000,
    volume24h: 1800000000,
    priceChange24h: 2.5,
    liquidity: 800000000,
    holders: 1200000,
    createdAt: '2020-03-01T00:00:00Z'
  },
  {
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    symbol: 'BONK',
    name: 'Bonk',
    price: 0.000012,
    marketCap: 800000000,
    volume24h: 45000000,
    priceChange24h: -5.2,
    liquidity: 25000000,
    holders: 180000,
    createdAt: '2022-12-25T00:00:00Z'
  },
  {
    address: '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm',
    symbol: 'WIF',
    name: 'dogwifhat',
    price: 2.85,
    marketCap: 2850000000,
    volume24h: 120000000,
    priceChange24h: 8.7,
    liquidity: 45000000,
    holders: 95000,
    createdAt: '2023-11-17T00:00:00Z'
  },
  {
    address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.0000085,
    marketCap: 3500000000,
    volume24h: 280000000,
    priceChange24h: 12.3,
    liquidity: 85000000,
    holders: 220000,
    createdAt: '2023-04-14T00:00:00Z'
  }
];

// Generate realistic trades based on real token data from Solana API
export const generateRealisticTrades = async (): Promise<RealTrade[]> => {
  try {
    // Fetch real token data
    const solanaTokens = await fetchMultipleTokens(POPULAR_SOLANA_TOKENS.slice(0, 5));
    
    // Convert SolanaToken to TokenData format
    const tokenData: TokenData[] = solanaTokens.map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      marketCap: token.marketCap,
      volume24h: token.volume24h,
      priceChange24h: token.priceChange24h,
      liquidity: token.liquidity,
      holders: token.holders,
      createdAt: token.createdAt
    }));
    
    // Generate realistic trades using the new service
    const solanaTrades = generateRealisticTradesFromTokens(solanaTokens);
    
    // Convert SolanaTrade to RealTrade format
    const trades: RealTrade[] = solanaTrades.map(trade => ({
      id: trade.id,
      tokenAddress: trade.tokenAddress,
      tokenSymbol: trade.tokenSymbol,
      type: trade.type,
      amount: trade.amount,
      price: trade.price,
      timestamp: trade.timestamp,
      trader: trade.trader
    }));
    
    return trades;
  } catch (error) {
    console.error('Error generating realistic trades:', error);
    // Fallback to static data if API fails
    return generateFallbackTrades();
  }
};

// Fallback trades if API fails
const generateFallbackTrades = (): RealTrade[] => {
  const trades: RealTrade[] = [];
  const now = Date.now();
  
  // Generate trades for the last 24 hours
  for (let i = 0; i < 50; i++) {
    const token = REAL_TOKENS[Math.floor(Math.random() * REAL_TOKENS.length)];
    const timestamp = new Date(now - (Math.random() * 24 * 60 * 60 * 1000));
    
    // Generate realistic trade amounts based on token price
    let amount: number;
    let price = token.price;
    
    if (token.price > 1) {
      // For higher value tokens, smaller amounts
      amount = Math.random() * 1000 + 100;
    } else if (token.price > 0.001) {
      // For medium value tokens
      amount = Math.random() * 10000 + 1000;
    } else {
      // For low value tokens (meme coins), larger amounts
      amount = Math.random() * 1000000 + 100000;
    }
    
    // Add some price volatility
    const volatility = (Math.random() - 0.5) * 0.1; // ±5% price change
    price = price * (1 + volatility);
    
    trades.push({
      id: `trade_${i}`,
      tokenAddress: token.address,
      tokenSymbol: token.symbol,
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      amount: Math.floor(amount),
      price: price,
      timestamp: timestamp.toISOString(),
      trader: `trader_${Math.floor(Math.random() * 1000)}`
    });
  }
  
  return trades.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Simulate AI model decisions based on real token data
export const generateAIDecisions = (): Decision[] => {
  const decisions: Decision[] = [];
  const tokens = REAL_TOKENS.slice(0, 3); // Use top 3 tokens
  
  tokens.forEach((token, tokenIndex) => {
    AI_MODELS.forEach((model, modelIndex) => {
      // Create realistic decision based on token metrics
      const decision = Math.random() > 0.5 ? 'BUY' : 'FADE';
      
      // Generate realistic reasoning based on token data
      const reasoning = generateReasoning(token, decision, model);
      
      decisions.push({
        id: `decision_${tokenIndex}_${modelIndex}`,
        modelId: model.id,
        modelName: model.displayName,
        modelColor: model.color,
        decision: decision,
        timestamp: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toLocaleString(),
        reasoning: reasoning,
        token: token.symbol
      });
    });
  });
  
  return decisions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate realistic AI reasoning based on token metrics
const generateReasoning = (token: TokenData, decision: 'BUY' | 'FADE', model: AIModel): string => {
  const factors = [];
  
  if (token.priceChange24h > 5) {
    factors.push(`Strong momentum with ${token.priceChange24h.toFixed(1)}% gain in 24h`);
  } else if (token.priceChange24h < -5) {
    factors.push(`Concerning decline of ${Math.abs(token.priceChange24h).toFixed(1)}% in 24h`);
  }
  
  if (token.volume24h > token.marketCap * 0.1) {
    factors.push(`High trading volume indicates strong interest`);
  }
  
  if (token.holders > 100000) {
    factors.push(`Large holder base provides stability`);
  } else if (token.holders < 10000) {
    factors.push(`Small holder base increases volatility risk`);
  }
  
  if (token.liquidity > token.marketCap * 0.05) {
    factors.push(`Good liquidity for entry/exit`);
  } else {
    factors.push(`Low liquidity poses slippage risk`);
  }
  
  const baseReasoning = `Analysis of ${token.symbol}: ${factors.join(', ')}. `;
  
  if (decision === 'BUY') {
    return baseReasoning + `Technical indicators suggest upward momentum. Risk-reward ratio favorable for position entry.`;
  } else {
    return baseReasoning + `Risk factors outweigh potential gains. Maintaining conservative position.`;
  }
};

// Export real token data for use in components
export const getRealTokenData = () => REAL_TOKENS;
export const getRealisticTrades = () => generateRealisticTrades();
export const getAIDecisions = () => generateAIDecisions();
