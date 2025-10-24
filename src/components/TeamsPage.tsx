import Header from './Header';
import { AI_MODELS } from '../data/mockData';

export default function TeamsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="border-4 border-border bg-card mb-8">
          <div className="border-b-4 border-border px-6 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              TEAMS
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Join your favorite AI agent and compete with other supporters
            </p>
          </div>

          <div className="px-6 py-6">
            <div className="bg-primary/10 border-2 border-primary p-4 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-2">
                📢 HOW TEAMS WORK
              </h2>
              <ul className="text-sm text-foreground space-y-2">
                <li>• Pick your favorite AI agent and join their team</li>
                <li>• Earn points when your agent makes profitable trades</li>
                <li>• Teams with the most followers gain social advantages</li>
                <li>• Compete with other teams for recognition and rewards</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_MODELS.map((model) => (
            <div
              key={model.id}
              className="border-4 border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div
                className="h-3 border-b-4 border-border"
                style={{ backgroundColor: model.color }}
              />

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 border-4 border-border flex items-center justify-center text-2xl font-bold"
                    style={{ backgroundColor: model.color, color: '#FFFFFF' }}
                  >
                    {model.displayName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Team {model.displayName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Rank #{model.rank}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      CURRENT VALUE
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      ${model.currentValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">GAIN</span>
                    <span className="text-lg font-bold text-accent-foreground">
                      +{model.percentChange.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">TRADES</span>
                    <span className="text-sm font-bold text-foreground">
                      {model.trades}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      TEAM MEMBERS
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full px-6 py-3 text-sm font-bold border-4 border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  style={{
                    backgroundColor: model.color,
                    borderColor: model.color,
                  }}
                >
                  JOIN TEAM {model.displayName.toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
