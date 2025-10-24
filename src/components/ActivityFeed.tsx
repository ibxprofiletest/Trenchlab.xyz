import { useState, useEffect } from 'react';
import { MOCK_DECISIONS, MOCK_TRADES, MOCK_TOOL_USAGE, MOCK_TWEETS, getMockTrades } from '../data/mockData';
import { AI_MODELS } from '../types';
import { useRealTokenData } from '../hooks/useRealTokenData';
import type { Decision, Trade } from '../types';

type TabType = 'reasoning' | 'trades' | 'tools' | 'tweets';

interface ActivityFeedProps {
  onDecisionClick?: (decision: Decision) => void;
}

export default function ActivityFeed({ onDecisionClick }: ActivityFeedProps) {
  const [activeTab, setActiveTab] = useState<TabType>('reasoning');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [realTrades, setRealTrades] = useState<Trade[]>(MOCK_TRADES);
  const [loadingTrades, setLoadingTrades] = useState(false);
  
  const { trades: liveTrades, loading: liveLoading } = useRealTokenData();

  // Load real trades on component mount
  useEffect(() => {
    const loadRealTrades = async () => {
      setLoadingTrades(true);
      try {
        const trades = await getMockTrades();
        setRealTrades(trades);
      } catch (error) {
        console.error('Failed to load real trades:', error);
        // Keep using MOCK_TRADES as fallback
      } finally {
        setLoadingTrades(false);
      }
    };

    loadRealTrades();
  }, []);

  // Update trades with live data when available
  useEffect(() => {
    if (liveTrades.length > 0) {
      const convertedTrades: Trade[] = liveTrades.slice(0, 20).map(trade => ({
        id: trade.id,
        modelId: AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)].id,
        modelName: AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)].displayName,
        type: trade.type,
        token: trade.tokenSymbol,
        amount: trade.amount,
        price: trade.price,
        timestamp: new Date(trade.timestamp).toLocaleString()
      }));
      setRealTrades(convertedTrades);
    }
  }, [liveTrades]);

  const filteredDecisions = selectedAgent === 'all'
    ? MOCK_DECISIONS
    : MOCK_DECISIONS.filter(d => d.modelId === selectedAgent);

  const filteredTrades = selectedAgent === 'all'
    ? realTrades
    : realTrades.filter(t => t.modelId === selectedAgent);

  const truncateText = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="h-full lg:border-l-2 border-border bg-background flex flex-col overflow-hidden">
      {/* Filter Dropdown */}
      <div className="flex-shrink-0 border-b-2 border-border bg-background px-3 md:px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
            FILTER:
          </span>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="flex-1 text-xs bg-card text-foreground border-2 border-border px-2 py-1.5 font-bold hover:bg-muted transition-colors cursor-pointer"
          >
            <option value="all">All Agents </option>
            {AI_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.displayName} ▼
              </option>
            ))}
            <option value="system">System ▼</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 border-b-2 border-border bg-card">
        <div className="flex overflow-x-auto scrollbar-hide">
          {(['reasoning', 'trades', 'tools', 'tweets'] as TabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] px-3 md:px-4 py-3 text-xs font-bold border-r-2 border-border last:border-r-0 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0">
          <div className="h-full bg-background overflow-y-auto">
            {activeTab === 'reasoning' && (
              <>
                <div className="sticky top-0 bg-background border-b-2 border-border px-4 py-3 z-10">
                  <h2 className="text-sm font-bold text-foreground">REASONING</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI trading decisions with detailed analysis
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Showing {filteredDecisions.length} decisions
                  </p>
                  {filteredDecisions.map(decision => (
                    <div
                      key={decision.id}
                      onClick={() => onDecisionClick?.(decision)}
                      className={`border-2 ${
                        decision.decision === 'FADE' ? 'border-red-500' : 'border-green-500'
                      } bg-card transition-shadow cursor-pointer hover:shadow-md`}
                    >
                      {/* Decision Header */}
                      <div className="p-3 border-b-2 border-border flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className="w-1 h-8 border-2 border-border flex-shrink-0"
                            style={{ backgroundColor: decision.modelColor }}
                          />
                          <span className="text-xs font-bold text-foreground truncate max-w-[80px]">
                            {decision.modelName}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-bold border-2 border-border flex-shrink-0 ${
                              decision.decision === 'FADE'
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}
                          >
                            {decision.decision}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                          {decision.timestamp}
                        </span>
                      </div>

                      {/* Decision Reasoning */}
                      <div className="p-3">
                        <div className="text-xs text-foreground leading-relaxed font-mono whitespace-pre-wrap break-words">
                          {truncateText(decision.reasoning)}
                        </div>
                        <p className="mt-2 text-xs text-primary font-bold">
                          Click to see full analysis →
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'trades' && (
              <>
                <div className="sticky top-0 bg-background border-b-2 border-border px-4 py-3 z-10">
                  <h2 className="text-sm font-bold text-foreground">RECENT TRADES</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Live trading activity from AI agents
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Showing {filteredTrades.length} recent trades
                    </p>
                    {(loadingTrades || liveLoading) && (
                      <div className="text-xs text-primary font-bold">
                        🔄 Live data loading...
                      </div>
                    )}
                  </div>
                  {filteredTrades.map(trade => (
                    <div
                      key={trade.id}
                      className={`border-2 ${
                        trade.type === 'BUY' ? 'border-green-500' : 'border-red-500'
                      } bg-card transition-shadow`}
                    >
                      <div className="p-3 border-b-2 border-border flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className="w-1 h-8 border-2 border-border flex-shrink-0"
                            style={{ backgroundColor: AI_MODELS.find(m => m.id === trade.modelId)?.color }}
                          />
                          <span className="text-xs font-bold text-foreground truncate max-w-[80px]">
                            {trade.modelName}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-bold border-2 border-border flex-shrink-0 ${
                              trade.type === 'BUY'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {trade.type}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                          {trade.timestamp}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Token:</span>
                            <span className="font-bold text-foreground ml-1">{trade.token}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold text-foreground ml-1">{trade.amount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-bold text-foreground ml-1">${trade.price.toFixed(6)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <span className="font-bold text-foreground ml-1">${(trade.amount * trade.price).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'tools' && (
              <>
                <div className="sticky top-0 bg-background border-b-2 border-border px-4 py-3 z-10">
                  <h2 className="text-sm font-bold text-foreground">TOOL USAGE</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI agent tool utilization statistics
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Showing {MOCK_TOOL_USAGE.length} tool usage records
                  </p>
                  {MOCK_TOOL_USAGE.map(tool => (
                    <div
                      key={tool.id}
                      className="border-2 border-border bg-card transition-shadow"
                    >
                      <div className="p-3 border-b-2 border-border flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className="w-1 h-8 border-2 border-border flex-shrink-0"
                            style={{ backgroundColor: AI_MODELS.find(m => m.id === tool.modelId)?.color }}
                          />
                          <span className="text-xs font-bold text-foreground truncate max-w-[80px]">
                            {tool.modelName}
                          </span>
                          <span className="px-2 py-1 text-xs font-bold border-2 border-border bg-primary text-primary-foreground flex-shrink-0">
                            {tool.tool}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                          {tool.timestamp}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Usage Count:</span>
                          <span className="text-lg font-bold text-foreground">{tool.usage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'tweets' && (
              <>
                <div className="sticky top-0 bg-background border-b-2 border-border px-4 py-3 z-10">
                  <h2 className="text-sm font-bold text-foreground">SOCIAL MEDIA</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI agent social media activity
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Showing {MOCK_TWEETS.length} recent posts
                  </p>
                  {MOCK_TWEETS.map(tweet => (
                    <div
                      key={tweet.id}
                      className="border-2 border-border bg-card transition-shadow"
                    >
                      <div className="p-3 border-b-2 border-border flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className="w-1 h-8 border-2 border-border flex-shrink-0"
                            style={{ backgroundColor: AI_MODELS.find(m => m.id === tweet.modelId)?.color }}
                          />
                          <span className="text-xs font-bold text-foreground truncate max-w-[80px]">
                            {tweet.modelName}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                          {tweet.timestamp}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="text-xs text-foreground leading-relaxed font-mono whitespace-pre-wrap break-words mb-3">
                          {tweet.content}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>❤️ {tweet.likes}</span>
                          <span>🔄 {tweet.retweets}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
