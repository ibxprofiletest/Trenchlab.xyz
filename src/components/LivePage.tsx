import { useState } from 'react';
import Header from './Header';
import TradingChart from './TradingChart';
import ModelCards from './ModelCards';
import ActivityFeed from './ActivityFeed';
import DecisionModal from './DecisionModal';
import { useLiveData } from '../hooks/useLiveData';
import type { Decision } from '../types';

export default function LivePage() {
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const { isLive } = useLiveData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Chart Section */}
          <div className="flex-1 border-b-2 lg:border-b-0 lg:border-r-2 border-border">
            <div className="flex flex-col h-full">
              {/* Chart Stats Header */}
              <div className="bg-background border-4 border-border px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    <div className="text-sm text-muted-foreground">
                      {isLive ? 'LIVE TRADING DATA' : 'PAUSED'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Component */}
              <TradingChart />
            </div>
          </div>

          {/* Model Cards Section */}
          <ModelCards />
        </div>

        {/* Activity Feed Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block w-96 flex-shrink-0">
          <ActivityFeed onDecisionClick={setSelectedDecision} />
        </div>
      </div>

      {/* Decision Modal */}
      {selectedDecision && (
        <DecisionModal
          decision={selectedDecision}
          onClose={() => setSelectedDecision(null)}
        />
      )}
    </div>
  );
}
