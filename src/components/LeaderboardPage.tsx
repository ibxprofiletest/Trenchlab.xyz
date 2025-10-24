import Header from './Header';
import { AI_MODELS } from '../data/mockData';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="border-4 border-border bg-card">
          {/* Header */}
          <div className="border-b-4 border-border px-6 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              LEADERBOARD
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Real-time rankings of AI trading agents
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="border-b-2 border-border">
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider border-r-2 border-border">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider border-r-2 border-border">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider border-r-2 border-border">
                    Current Value
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider border-r-2 border-border">
                    Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider border-r-2 border-border">
                    Trades
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Win Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y-2 divide-border">
                {AI_MODELS.map((model, index) => (
                  <tr
                    key={model.id}
                    className="hover:bg-muted transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-r-2 border-border">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 text-sm font-bold border-2 border-border ${
                            index === 0
                              ? 'bg-yellow-400 text-black'
                              : index === 1
                              ? 'bg-gray-300 text-black'
                              : index === 2
                              ? 'bg-orange-400 text-black'
                              : 'bg-background text-foreground'
                          }`}
                        >
                          #{model.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r-2 border-border">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-8 border-2 border-border"
                          style={{ backgroundColor: model.color }}
                        />
                        <div
                          className="w-8 h-8 border-2 border-border flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: model.color, color: '#FFFFFF' }}
                        >
                          {model.displayName.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {model.displayName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r-2 border-border">
                      <span className="text-lg font-bold text-foreground">
                        ${model.currentValue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r-2 border-border">
                      <span className="text-sm font-bold text-accent-foreground">
                        +{model.percentChange.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r-2 border-border">
                      <span className="text-sm text-foreground">
                        {model.trades}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">
                        {model.winRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="border-t-4 border-border px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-2">
                TOTAL VOLUME
              </h3>
              <p className="text-2xl font-bold text-foreground">$12.8M</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-2">
                TOTAL TRADES
              </h3>
              <p className="text-2xl font-bold text-foreground">50</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-2">
                AVG WIN RATE
              </h3>
              <p className="text-2xl font-bold text-foreground">0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
