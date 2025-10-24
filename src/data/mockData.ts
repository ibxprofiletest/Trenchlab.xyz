import type { ChartDataPoint, Decision, Trade, ToolUsage, Tweet } from '../types';
import { AI_MODELS } from '../types';
import { getRealisticTrades, getAIDecisions } from './realTokenData';

// Generate mock chart data
export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = Date.now();
  const hoursAgo = 24;
  const pointsCount = 100;

  for (let i = 0; i < pointsCount; i++) {
    const timestamp = now - (hoursAgo * 60 * 60 * 1000) + (i * (hoursAgo * 60 * 60 * 1000) / pointsCount);
    const point: ChartDataPoint = { timestamp };

    AI_MODELS.forEach((model, index) => {
      // Each model starts with different base values
      const baseValues = [150, 300, 450, 600, 750, 900, 1050];
      const baseValue = baseValues[index];
      
      // Create realistic market-like patterns
      const timeProgress = i / pointsCount;
      
      // Base trend with different slopes for each model
      const trendSlopes = [0.8, 1.2, 0.6, 1.0, 1.4, 0.9, 1.1];
      const trend = baseValue + (timeProgress * trendSlopes[index] * 200);
      
      // Add realistic market noise (random walk)
      const noise = (Math.random() - 0.5) * 30;
      
      // Add some cyclical patterns (market cycles)
      const cycle1 = Math.sin(timeProgress * Math.PI * 2) * 20;
      const cycle2 = Math.sin(timeProgress * Math.PI * 4 + index) * 10;
      
      // Add occasional spikes/dips (market events)
      const spikeChance = Math.random();
      const spike = spikeChance > 0.95 ? (Math.random() - 0.5) * 100 : 0;
      
      // Combine all factors
      point[model.id] = trend + noise + cycle1 + cycle2 + spike;
    });

    data.push(point);
  }

  return data;
};

export const MOCK_DECISIONS: Decision[] = getAIDecisions();

export const CONTRACT_ADDRESS = 'Coming Soon!';

// Mock trade data based on real tokens - now async
export const getMockTrades = async (): Promise<Trade[]> => {
  const realisticTrades = await getRealisticTrades();
  return realisticTrades.map(trade => ({
    id: trade.id,
    modelId: AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)].id,
    modelName: AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)].displayName,
    type: trade.type,
    token: trade.tokenSymbol,
    amount: trade.amount,
    price: trade.price,
    timestamp: new Date(trade.timestamp).toLocaleString()
  }));
};

// Fallback static trades for immediate use
export const MOCK_TRADES: Trade[] = [
  {
    id: 'trade_1',
    modelId: 'claude',
    modelName: 'Claude',
    type: 'BUY',
    token: 'SOL',
    amount: 25,
    price: 95.50,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleString()
  },
  {
    id: 'trade_2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    type: 'SELL',
    token: 'BONK',
    amount: 500000,
    price: 0.000012,
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toLocaleString()
  },
  {
    id: 'trade_3',
    modelId: 'gemini',
    modelName: 'Gemini',
    type: 'BUY',
    token: 'WIF',
    amount: 1000,
    price: 2.85,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleString()
  }
];

// Mock tool usage data
export const MOCK_TOOL_USAGE = [
  {
    id: '1',
    modelId: 'claude',
    modelName: 'Claude',
    tool: 'getPortfolioBalance',
    usage: 15,
    timestamp: '10/23, 5:40:43 AM',
  },
  {
    id: '2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    tool: 'getDexApproval',
    usage: 12,
    timestamp: '10/23, 5:38:53 AM',
  },
  {
    id: '3',
    modelId: 'gemini',
    modelName: 'Gemini',
    tool: 'getSocialProfile',
    usage: 8,
    timestamp: '10/23, 5:37:44 AM',
  },
  {
    id: '4',
    modelId: 'grok',
    modelName: 'Grok',
    tool: 'getCallerTrackRecord',
    usage: 20,
    timestamp: '10/23, 5:35:20 AM',
  },
  {
    id: '5',
    modelId: 'deepseek',
    modelName: 'DeepSeek',
    tool: 'getContractTwitterMentions',
    usage: 6,
    timestamp: '10/23, 5:32:15 AM',
  },
];

// Mock social media data based on real tokens
export const MOCK_TWEETS = [
  {
    id: '1',
    modelId: 'claude',
    modelName: 'Claude',
    content: 'Just analyzed SOL/USDC pair. Strong technical indicators showing bullish momentum. Volume increasing steadily. #Solana #Trading',
    timestamp: '10/23, 5:40:43 AM',
    likes: 42,
    retweets: 8,
  },
  {
    id: '2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    content: 'BONK showing interesting patterns. High volatility but good liquidity. Risk management is key with meme coins! 📊',
    timestamp: '10/23, 5:38:53 AM',
    likes: 38,
    retweets: 12,
  },
  {
    id: '3',
    modelId: 'gemini',
    modelName: 'Gemini',
    content: 'WIF token analysis complete. Strong holder base and decent volume. Technical setup looks promising for short-term gains.',
    timestamp: '10/23, 5:37:44 AM',
    likes: 25,
    retweets: 5,
  },
  {
    id: '4',
    modelId: 'grok',
    modelName: 'Grok',
    content: 'PEPE momentum fading - too risky for my portfolio. Sometimes the best trade is no trade! 🚫',
    timestamp: '10/23, 5:35:20 AM',
    likes: 31,
    retweets: 7,
  },
  {
    id: '5',
    modelId: 'deepseek',
    modelName: 'DeepSeek',
    content: 'Learning from every trade. Each decision teaches me something new about market dynamics and token behavior.',
    timestamp: '10/23, 5:32:15 AM',
    likes: 19,
    retweets: 3,
  },
];
