



export enum TokenActivityType {
  Sell = "sell",
  Buy = "buy",
  AddLiquidity = "add_liquidity",
  RemoveLiquidity = "remove_liquidity",
}

export interface TokenActivity {
  address: string;
  priceUsd: string;
  amount: string;
  type: TokenActivityType;
  // maker: string;
  txHash: string;
  timestamp: number;
}

export interface TokenStat {
  address: string;
  price: string;
  price_1m: string;
  price_5m: string;
  price_1h: string;
  price_6h: string;
  price_24h: string;
  buys_1m: string;
  buys_5m: string;
  buys_1h: string;
  buys_6h: string;
  buys_24h: string;
  sells_1m: string;
  sells_5m: string;
  sells_1h: string;
  sells_6h: string;
  sells_24h: string;
  volume_1m: string;
  volume_5m: string;
  volume_1h: string;
  volume_6h: string;
  volume_24h: string;
  buy_volume_1m: string;
  buy_volume_5m: string;
  buy_volume_1h: string;
  buy_volume_6h: string;
  buy_volume_24h: string;
  sell_volume_1m: string;
  sell_volume_5m: string;
  sell_volume_1h: string;
  sell_volume_6h: string;
  sell_volume_24h: string;
  swaps_1m: string;
  swaps_5m: string;
  swaps_1h: string;
  swaps_6h: string;
  swaps_24h: string;
  hot_level: number;
}