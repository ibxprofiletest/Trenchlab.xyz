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
  