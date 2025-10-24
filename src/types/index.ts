export interface AIModel {
    id: string;
    name: string;
    displayName: string;
    color: string;
    logo: string;
    currentValue: number;
    percentChange: number;
    trades: number;
    winRate: number;
    rank: number;
  }
  
  export interface ChartDataPoint {
    timestamp: number;
    [key: string]: number;
  }
  
  export interface Decision {
    id: string;
    modelId: string;
    modelName: string;
    modelColor: string;
    decision: 'BUY' | 'FADE';
    timestamp: string;
    reasoning: string;
    token?: string;
  }
  
  export interface Trade {
    id: string;
    modelId: string;
    modelName: string;
    type: 'BUY' | 'SELL';
    token: string;
    amount: number;
    price: number;
    timestamp: string;
  }
  
  export interface ToolUsage {
    id: string;
    modelId: string;
    modelName: string;
    tool: string;
    usage: number;
    timestamp: string;
  }
  
  export interface Tweet {
    id: string;
    modelId: string;
    modelName: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
  }

// AI Models data
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
  