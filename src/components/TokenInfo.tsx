import { useState, useEffect } from 'react';
import { useRealTokenData, useTokenPrice } from '../hooks/useRealTokenData';
import { SolanaToken } from '../services/solanaApi';

interface TokenInfoProps {
  selectedToken?: string;
}

export default function TokenInfo({ selectedToken }: TokenInfoProps) {
  const { tokens, trendingTokens, loading, error, refreshData } = useRealTokenData();
  const [selectedTokenData, setSelectedTokenData] = useState<SolanaToken | null>(null);
  
  // Get real-time price for selected token
  const { token: liveToken, loading: priceLoading } = useTokenPrice(selectedToken || '');

  useEffect(() => {
    if (selectedToken) {
      const token = tokens.find(t => t.address === selectedToken);
      setSelectedTokenData(token || null);
    }
  }, [selectedToken, tokens]);

  useEffect(() => {
    if (liveToken) {
      setSelectedTokenData(liveToken);
    }
  }, [liveToken]);

  const getTokenEmoji = (symbol: string) => {
    const emojiMap: Record<string, string> = {
      'SOL': '☀️',
      'USDC': '💵',
      'BONK': '🐕',
      'WIF': '🎩',
      'PEPE': '🐸',
      'JUP': '🪐',
      'mSOL': '🌙',
      'USDT': '💰',
      'ENA': '📧',
      'W': '🌊'
    };
    return emojiMap[symbol] || '🪙';
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPrice = (price: number) => {
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.01) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  };

  if (loading) {
    return (
      <div className="p-4 border-2 border-border bg-card">
        <div className="text-center">
          <div className="text-sm font-bold text-muted-foreground">Loading token data...</div>
          <div className="text-xs text-muted-foreground mt-1">Fetching from Solana/PumpFun</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-red-500 bg-card">
        <div className="text-center">
          <div className="text-sm font-bold text-red-500">Error loading data</div>
          <div className="text-xs text-muted-foreground mt-1">{error}</div>
          <button 
            onClick={refreshData}
            className="mt-2 px-3 py-1 text-xs bg-primary text-primary-foreground border-2 border-border hover:bg-primary/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selected Token Details */}
      {selectedTokenData && (
        <div className="p-4 border-2 border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">Token Details</h3>
            {priceLoading && (
              <div className="text-xs text-primary font-bold">🔄 Live</div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {selectedTokenData.image ? (
                <img 
                  src={selectedTokenData.image} 
                  alt={selectedTokenData.symbol}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    // Replace with emoji fallback
                    const target = e.target as HTMLImageElement;
                    const emojiSpan = document.createElement('span');
                    emojiSpan.textContent = getTokenEmoji(selectedTokenData.symbol);
                    emojiSpan.className = 'text-lg';
                    target.parentNode?.replaceChild(emojiSpan, target);
                  }}
                />
              ) : (
                <span className="text-lg">{getTokenEmoji(selectedTokenData.symbol)}</span>
              )}
              <span className="text-lg font-bold text-foreground">{selectedTokenData.symbol}</span>
              <span className="text-sm text-muted-foreground">{selectedTokenData.name}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Price:</span>
                <div className="font-bold text-foreground">{formatPrice(selectedTokenData.price)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">24h Change:</span>
                <div className={`font-bold ${selectedTokenData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedTokenData.priceChange24h >= 0 ? '+' : ''}{selectedTokenData.priceChange24h.toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Market Cap:</span>
                <div className="font-bold text-foreground">${formatNumber(selectedTokenData.marketCap)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">24h Volume:</span>
                <div className="font-bold text-foreground">${formatNumber(selectedTokenData.volume24h)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Liquidity:</span>
                <div className="font-bold text-foreground">${formatNumber(selectedTokenData.liquidity)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Holders:</span>
                <div className="font-bold text-foreground">{formatNumber(selectedTokenData.holders)}</div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <span className="font-bold">Address:</span> {selectedTokenData.address.slice(0, 8)}...{selectedTokenData.address.slice(-8)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Tokens */}
      <div className="p-4 border-2 border-border bg-card">
        <h3 className="text-sm font-bold text-foreground mb-3">Trending Tokens</h3>
        <div className="space-y-2">
          {trendingTokens.slice(0, 5).map((token, index) => (
            <div 
              key={token.address}
              className="flex items-center justify-between p-2 border border-border hover:bg-muted cursor-pointer"
              onClick={() => setSelectedTokenData(token)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">#{index + 1}</span>
                {token.image ? (
                  <img 
                    src={token.image} 
                    alt={token.symbol}
                    className="w-4 h-4 rounded-full"
                    onError={(e) => {
                      // Replace with emoji fallback
                      const target = e.target as HTMLImageElement;
                      const emojiSpan = document.createElement('span');
                      emojiSpan.textContent = getTokenEmoji(token.symbol);
                      emojiSpan.className = 'text-sm';
                      target.parentNode?.replaceChild(emojiSpan, target);
                    }}
                  />
                ) : (
                  <span className="text-sm">{getTokenEmoji(token.symbol)}</span>
                )}
                <span className="text-xs font-bold text-foreground">{token.symbol}</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-foreground">{formatPrice(token.price)}</div>
                <div className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Source Info */}
      <div className="p-3 border border-border bg-muted">
        <div className="text-xs text-muted-foreground text-center">
          <div className="font-bold">📊 Real Solana Token Data</div>
          <div>Powered by Jupiter API & PumpFun integration</div>
          <div>Prices update every 30 seconds</div>
        </div>
      </div>
    </div>
  );
}
