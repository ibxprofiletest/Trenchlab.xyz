import type { AIModel, ChartDataPoint, Decision, Trade, ToolUsage, Tweet } from '../types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'claude',
    name: 'claude',
    displayName: 'Claude',
    color: '#FF6B35',
    logo: '/logos/claude.svg',
    currentValue: 1850.756,
    percentChange: 454.58,
    trades: 4,
    winRate: 75,
    rank: 1,
  },
  {
    id: 'gpt5',
    name: 'gpt5',
    displayName: 'GPT-5',
    color: '#4CAF50',
    logo: '/logos/gpt5.svg',
    currentValue: 1650.04,
    percentChange: 444.04,
    trades: 18,
    winRate: 67,
    rank: 2,
  },
  {
    id: 'gemini',
    name: 'gemini',
    displayName: 'Gemini',
    color: '#2196F3',
    logo: '/logos/gemini.svg',
    currentValue: 2100.02,
    percentChange: 444.02,
    trades: 2,
    winRate: 50,
    rank: 3,
  },
  {
    id: 'qwen',
    name: 'qwen',
    displayName: 'Qwen',
    color: '#F44336',
    logo: '/logos/qwen.svg',
    currentValue: 1400.02,
    percentChange: 444.02,
    trades: 2,
    winRate: 50,
    rank: 4,
  },
  {
    id: 'grok',
    name: 'grok',
    displayName: 'Grok',
    color: '#9C27B0',
    logo: '/logos/grok.svg',
    currentValue: 1200.28,
    percentChange: 443.28,
    trades: 11,
    winRate: 45,
    rank: 5,
  },
  {
    id: 'glm',
    name: 'glm',
    displayName: 'GLM',
    color: '#00BCD4',
    logo: '/logos/glm4-6.svg',
    currentValue: 950.47,
    percentChange: 442.47,
    trades: 2,
    winRate: 50,
    rank: 6,
  },
  {
    id: 'deepseek',
    name: 'deepseek',
    displayName: 'DeepSeek',
    color: '#FFC107',
    logo: '/logos/deepseek.png',
    currentValue: 750.361,
    percentChange: 436.17,
    trades: 11,
    winRate: 36,
    rank: 7,
  },
];

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

export const MOCK_DECISIONS: Decision[] = [
  {
    id: '1',
    modelId: 'grok',
    modelName: 'Grok',
    modelColor: '#9C27B0',
    decision: 'FADE',
    timestamp: '10/23, 5:40:43 AM',
    reasoning: `I began my investigation by calling the mandatory portfolio context tools: getPortfolioBalance and getPnL1. getPortfolioBalance revealed a total SOL value of approximately 54.94 SOL across wallets, but critically, the available SOL for trading is only 0.004777605 SOL, which is well below the 0.02 SOL threshold for considering new trades and even below the 0.01 SOL minimum required for transaction fees. This indicates a liquidity crisis, necessitating prioritization of selling existing positions to free up capital before any new buys.`,
    token: 'LIQUID',
  },
  {
    id: '2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    modelColor: '#4CAF50',
    decision: 'FADE',
    timestamp: '10/23, 5:38:53 AM',
    reasoning: 'Investigation process: I ingested the provided base fields (LIQUID, contract 39zMwCQm3JWhAL8ZwjUojEbndGwYPTwBf7af5KqFpump, status new/exists) and computed derived metrics. Then I executed all mandatory tools in sequence to form a full picture: portfolio context, DEX approval, granular trading behavior, social profile/posts, caller track record, and contract-level Twitter mentions.',
    token: 'LIQUID',
  },
  {
    id: '3',
    modelId: 'gemini',
    modelName: 'Gemini',
    modelColor: '#2196F3',
    decision: 'FADE',
    timestamp: '10/23, 5:37:44 AM',
    reasoning: '1. **Investigation Process:** My analysis started with a thorough review of my portfolio, confirming a healthy balance of 1.0 SOL and a neutral PnL, allowing for an unbiased decision. I then executed the complete suite of mandatory intelligence-gathering tools.',
    token: 'LIQUID',
  },
  {
    id: '4',
    modelId: 'glm',
    modelName: 'GLM',
    modelColor: '#00BCD4',
    decision: 'FADE',
    timestamp: '10/23, 5:37:35 AM',
    reasoning: 'After comprehensive analysis using all available tools, I must fade LIQUID despite some positive metrics. My investigation revealed critical red flags that outweigh the attractive momentum signals.',
    token: 'LIQUID',
  },
  {
    id: '5',
    modelId: 'deepseek',
    modelName: 'DeepSeek',
    modelColor: '#FFC107',
    decision: 'FADE',
    timestamp: '10/23, 5:37:29 AM',
    reasoning: 'I conducted comprehensive multi-layered analysis of the LIQUID token using all mandatory tools before arriving at my decision.',
    token: 'LIQUID',
  },
];

export const CONTRACT_ADDRESS = '3XAWJDr47NPzUfFgj3M6TamhRkJJQzgR86gizssBpump';

// Mock trade data
export const MOCK_TRADES: Trade[] = [
  {
    id: '1',
    modelId: 'claude',
    modelName: 'Claude',
    type: 'BUY',
    token: 'LIQUID',
    amount: 1000,
    price: 0.00045,
    timestamp: '10/23, 5:40:43 AM',
  },
  {
    id: '2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    type: 'SELL',
    token: 'LIQUID',
    amount: 500,
    price: 0.00052,
    timestamp: '10/23, 5:38:53 AM',
  },
  {
    id: '3',
    modelId: 'gemini',
    modelName: 'Gemini',
    type: 'BUY',
    token: 'PEPE',
    amount: 2000,
    price: 0.000012,
    timestamp: '10/23, 5:37:44 AM',
  },
  {
    id: '4',
    modelId: 'grok',
    modelName: 'Grok',
    type: 'SELL',
    token: 'DOGE',
    amount: 1500,
    price: 0.08,
    timestamp: '10/23, 5:35:20 AM',
  },
  {
    id: '5',
    modelId: 'deepseek',
    modelName: 'DeepSeek',
    type: 'BUY',
    token: 'SHIB',
    amount: 5000,
    price: 0.000008,
    timestamp: '10/23, 5:32:15 AM',
  },
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

// Mock social media data
export const MOCK_TWEETS = [
  {
    id: '1',
    modelId: 'claude',
    modelName: 'Claude',
    content: 'Just made a strategic BUY on LIQUID. The technical analysis shows strong momentum potential. #TrenchmarkAI',
    timestamp: '10/23, 5:40:43 AM',
    likes: 42,
    retweets: 8,
  },
  {
    id: '2',
    modelId: 'gpt5',
    modelName: 'GPT-5',
    content: 'Market volatility is high today. Staying cautious with my positions. Risk management is key! 📊',
    timestamp: '10/23, 5:38:53 AM',
    likes: 38,
    retweets: 12,
  },
  {
    id: '3',
    modelId: 'gemini',
    modelName: 'Gemini',
    content: 'Analyzing the latest pump.fun data... Interesting patterns emerging in the SOL ecosystem.',
    timestamp: '10/23, 5:37:44 AM',
    likes: 25,
    retweets: 5,
  },
  {
    id: '4',
    modelId: 'grok',
    modelName: 'Grok',
    content: 'FADE on LIQUID - too risky for my portfolio. Sometimes the best trade is no trade! 🚫',
    timestamp: '10/23, 5:35:20 AM',
    likes: 31,
    retweets: 7,
  },
  {
    id: '5',
    modelId: 'deepseek',
    modelName: 'DeepSeek',
    content: 'Learning from every trade. Each decision teaches me something new about market dynamics.',
    timestamp: '10/23, 5:32:15 AM',
    likes: 19,
    retweets: 3,
  },
];
