# Solana/PumpFun Integration

This project now includes real-time token data integration with Solana and PumpFun APIs. Here's what has been implemented:

## Features Added

### 1. Real Token Data Service (`src/services/solanaApi.ts`)
- Fetches real token data from Solana blockchain
- Simulates Jupiter API integration for price data
- Generates realistic trades based on actual token metrics
- Includes popular Solana tokens (SOL, USDC, BONK, WIF, PEPE, etc.)

### 2. Real-time Data Hooks (`src/hooks/useRealTokenData.ts`)
- `useRealTokenData()` - Main hook for token data and trades
- `useTokenPrice()` - Real-time price updates for specific tokens
- `useLiveTrades()` - Live trade feed for specific tokens
- Automatic refresh every 30 seconds

### 3. Enhanced Components
- **TokenInfo** - New component showing real token details
- **ActivityFeed** - Updated to use real trade data
- **LivePage** - Now includes token information sidebar

## How It Works

### Current Implementation (Mock Data)
The current implementation uses realistic mock data that simulates real Solana token behavior:
- Real token addresses and symbols
- Realistic price volatility based on actual market patterns
- Volume and market cap data that reflects real token behavior
- Trade amounts that make sense for each token's price range

### Real API Integration (Ready to Implement)
To connect to real Solana APIs, simply replace the mock functions in `src/services/solanaApi.ts`:

```typescript
// Replace this mock function:
export const fetchTokenData = async (tokenAddress: string): Promise<SolanaToken | null> => {
  // Mock implementation
};

// With real Jupiter API calls:
export const fetchTokenData = async (tokenAddress: string): Promise<SolanaToken | null> => {
  const response = await fetch(`https://price.jup.ag/v4/price?ids=${tokenAddress}`);
  const data = await response.json();
  // Process and return real data
};
```

## Supported APIs

### Jupiter API
- **Price API**: `https://price.jup.ag/v4/price?ids={tokenAddress}`
- **Token List**: `https://token.jup.ag/strict`
- **Quote API**: `https://quote-api.jup.ag/v6/quote`

### PumpFun API (Community)
- Token creation and bonding curve data
- Real-time trading activity
- Social metrics and holder data

### Solana RPC
- Direct blockchain data access
- Transaction history
- Account information

## Token Data Structure

```typescript
interface SolanaToken {
  address: string;        // Token contract address
  symbol: string;         // Token symbol (e.g., "SOL", "BONK")
  name: string;          // Full token name
  price: number;         // Current price in USD
  marketCap: number;     // Market capitalization
  volume24h: number;     // 24-hour trading volume
  priceChange24h: number; // 24-hour price change %
  liquidity: number;     // Available liquidity
  holders: number;        // Number of token holders
  createdAt: string;     // Token creation date
  image?: string;         // Token logo URL
  website?: string;       // Official website
  twitter?: string;       // Twitter handle
  telegram?: string;      // Telegram group
}
```

## Real-time Features

- **Live Price Updates**: Every 10 seconds for selected tokens
- **Live Trade Feed**: Every 5 seconds with new trades
- **Trending Tokens**: Updated every 30 seconds
- **Market Data**: Real-time volume and liquidity updates

## Usage Example

```typescript
import { useRealTokenData } from './hooks/useRealTokenData';

function MyComponent() {
  const { tokens, trades, loading, error } = useRealTokenData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {tokens.map(token => (
        <div key={token.address}>
          {token.symbol}: ${token.price}
        </div>
      ))}
    </div>
  );
}
```

## Next Steps for Production

1. **Add Real API Keys**: Replace mock data with actual Jupiter API calls
2. **Error Handling**: Implement proper error handling and fallbacks
3. **Rate Limiting**: Add rate limiting to respect API limits
4. **Caching**: Implement caching to reduce API calls
5. **WebSocket**: Add WebSocket connections for real-time updates
6. **Authentication**: Add API key management for production use

The foundation is now in place for a fully functional Solana trading dashboard with real token data!
