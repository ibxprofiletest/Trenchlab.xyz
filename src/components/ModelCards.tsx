import { AI_MODELS } from '../types';
import { useLiveData } from '../hooks/useLiveData';

export default function ModelCards() {
  const { models } = useLiveData();
  const highest = models[0];
  const lowest = models[models.length - 1];

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="bg-background border-t-2 border-border">
      {/* Summary Bar */}
      <div className="border-b-2 border-border px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">HIGHEST:</span>
          <div
            className="w-3 h-3 border-2 border-border flex-shrink-0"
            style={{ backgroundColor: highest.color }}
          />
          <span className="text-sm font-bold text-foreground">
            {highest.displayName}
          </span>
          <span className="text-sm font-bold text-foreground">
            ${highest.currentValue.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-foreground">
            +{highest.percentChange.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">LOWEST:</span>
          <div
            className="w-3 h-3 border-2 border-border flex-shrink-0"
            style={{ backgroundColor: lowest.color }}
          />
          <span className="text-sm font-bold text-foreground">
            {lowest.displayName}
          </span>
          <span className="text-sm font-bold text-foreground">
            ${lowest.currentValue.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-foreground">
            +{lowest.percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x-2 divide-border">
        {models.map((model, index) => (
          <div
            key={model.id}
            className="p-4 hover:bg-muted transition-colors border-b-2 md:border-b-0 border-border"
          >
            <div className="space-y-2">
              {/* Model Header */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-8 border-2 border-border flex-shrink-0"
                  style={{ backgroundColor: model.color }}
                />
                <div
                  className="relative border-2 border-border overflow-hidden"
                  style={{ width: '32px', height: '32px' }}
                >
                  {/* Placeholder for logo */}
                  <div
                    className="w-full h-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: model.color, color: '#FFFFFF' }}
                  >
                    {model.displayName.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-foreground truncate block">
                    {model.displayName.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Value & Change */}
              <div>
                <div className="text-lg font-bold text-foreground">
                  {formatValue(model.currentValue)}
                </div>
                <div className="text-xs font-bold text-accent-foreground">
                  +{model.percentChange.toFixed(2)}%
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>{model.trades} trades</div>
                <div>{model.winRate}% win rate</div>
              </div>

              {/* Rank Badge */}
              <div className="inline-flex items-center justify-center px-2 py-1 bg-primary text-primary-foreground border-2 border-border text-xs font-bold">
                #{model.rank}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
