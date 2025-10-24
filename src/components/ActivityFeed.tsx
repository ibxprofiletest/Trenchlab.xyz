import { useState } from 'react';
import { MOCK_DECISIONS, AI_MODELS } from '../data/mockData';
import type { Decision } from '../types';

type TabType = 'reasoning' | 'trades' | 'tools' | 'tweets';

interface ActivityFeedProps {
  onDecisionClick?: (decision: Decision) => void;
}

export default function ActivityFeed({ onDecisionClick }: ActivityFeedProps) {
  const [activeTab, setActiveTab] = useState<TabType>('reasoning');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  const filteredDecisions = selectedAgent === 'all'
    ? MOCK_DECISIONS
    : MOCK_DECISIONS.filter(d => d.modelId === selectedAgent);

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
              <div className="p-4">
                <p className="text-sm text-muted-foreground">No recent trades</p>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Tool usage data will appear here
                </p>
              </div>
            )}

            {activeTab === 'tweets' && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Social media activity will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
