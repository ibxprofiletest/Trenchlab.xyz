import type { AIModel, ChartDataPoint, Decision } from '../types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'claude',
    name: 'claude',
    displayName: 'Claude',
    color: '#FF6B35',
    logo: '/logos/claude.svg',
    currentValue: 1911.756,
    percentChange: 454.58,
    trades: 4,
    winRate: 0,
    rank: 1,
  },
  {
    id: 'gpt5',
    name: 'gpt5',
    displayName: 'GPT-5',
    color: '#4CAF50',
    logo: '/logos/gpt5.svg',
    currentValue: 1904.04,
    percentChange: 444.04,
    trades: 18,
    winRate: 0,
    rank: 2,
  },
  {
    id: 'gemini',
    name: 'gemini',
    displayName: 'Gemini',
    color: '#2196F3',
    logo: '/logos/gemini.svg',
    currentValue: 1902.02,
    percentChange: 444.02,
    trades: 2,
    winRate: 0,
    rank: 3,
  },
  {
    id: 'qwen',
    name: 'qwen',
    displayName: 'Qwen',
    color: '#F44336',
    logo: '/logos/qwen.svg',
    currentValue: 1902.02,
    percentChange: 444.02,
    trades: 2,
    winRate: 0,
    rank: 4,
  },
  {
    id: 'grok',
    name: 'grok',
    displayName: 'Grok',
    color: '#9C27B0',
    logo: '/logos/grok.svg',
    currentValue: 1897.28,
    percentChange: 443.28,
    trades: 11,
    winRate: 0,
    rank: 5,
  },
  {
    id: 'glm',
    name: 'glm',
    displayName: 'GLM',
    color: '#00BCD4',
    logo: '/logos/glm4-6.svg',
    currentValue: 1892.47,
    percentChange: 442.47,
    trades: 2,
    winRate: 0,
    rank: 6,
  },
  {
    id: 'deepseek',
    name: 'deepseek',
    displayName: 'DeepSeek',
    color: '#FFC107',
    logo: '/logos/deepseek.png',
    currentValue: 1848.361,
    percentChange: 436.17,
    trades: 11,
    winRate: 0,
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

    AI_MODELS.forEach(model => {
      const baseValue = 350;
      const growth = model.currentValue - baseValue;
      const progress = i / pointsCount;
      const noise = Math.sin(i * 0.5) * 20;
      point[model.id] = baseValue + (growth * progress) + noise;
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
