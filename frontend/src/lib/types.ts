export type BiasDirection = "BULLISH" | "BEARISH" | "NEUTRAL" | "STRONG BULLISH" | "STRONG BEARISH";
export type ImpactLevel = "LOW" | "MEDIUM" | "HIGH" | "VERY HIGH";
export type SourceTier = "TIER 1" | "TIER 2" | "TIER 3" | "TIER 4";

export interface BiasCardData {
  asset: "USD" | "XAUUSD" | "BTCUSD" | "EURUSD" | string;
  bias: BiasDirection;
  score: number; // -100 to +100
  confidence: number; // 0 to 100
  reasons: string[];
  dxy_trend?: string;
  fed_expectations?: string;
  treasury_yield_direction?: string;
  risk_sentiment?: string;
}

export interface SystemStatusData {
  status: string;
  is_demo: boolean;
  last_updated: string;
  timezone_name: string;
  data_sources: {
    news: string;
    economic_calendar: string;
    market_data: string;
    ai_analysis: string;
    trump_feed: string;
  };
}

export interface MacroTransmissionNode {
  trigger: string;
  transmission_steps: string[];
  usd_effect: string;
  xauusd_effect: string;
  btcusd_effect: string;
  eurusd_effect?: string;
  status: string;
}

export interface OverviewData {
  system_status: SystemStatusData;
  bias_cards: {
    USD: BiasCardData;
    XAUUSD: BiasCardData;
    BTCUSD: BiasCardData;
    EURUSD?: BiasCardData;
  };
  macro_transmission: MacroTransmissionNode[];
  next_high_impact_event?: CalendarEvent;
  recent_trump_post?: TrumpPost;
  top_alerts: AlertItem[];
}

export interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  full_content?: string;
  source: string;
  source_url?: string;
  source_tier: SourceTier;
  category: string;
  impact_level: ImpactLevel;
  published_at: string;
  
  ai_summary?: string;
  usd_impact: string;
  xauusd_impact: string;
  btcusd_impact: string;
  eurusd_impact?: string;
  ai_why?: string;
  confidence: number;
  
  actual?: string;
  forecast?: string;
  previous?: string;
  surprise?: string;
  
  market_reaction?: {
    dxy?: string;
    us10y?: string;
    gold?: string;
    btc?: string;
    eurusd?: string;
    nasdaq?: string;
  };
  
  cluster_id?: string;
  sources_count: number;
  related_sources: string[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  currency: string;
  country: string;
  category: string;
  impact_level: ImpactLevel;
  scheduled_time: string;
  period?: string;
  
  forecast?: string;
  previous?: string;
  actual?: string;
  surprise?: string;
  surprise_classification?: string;
  
  usd_effect: string;
  xauusd_effect: string;
  btcusd_effect: string;
  eurusd_effect?: string;
  
  ai_interpretation?: string;
  expected_effect?: string;
  
  pre_market?: {
    dxy?: number;
    us10y?: number;
    gold?: number;
    btc?: number;
    eurusd?: number;
  };
  post_market?: {
    dxy?: number;
    us10y?: number;
    gold?: number;
    btc?: number;
    eurusd?: number;
  };
  market_change?: {
    dxy?: string;
    us10y?: string;
    gold?: string;
    btc?: string;
    eurusd?: string;
  };
  
  is_completed: boolean;
  confidence: number;
}

export interface TrumpPost {
  id: number;
  post_identifier: string;
  author_name: string;
  author_handle: string;
  platform: string;
  source_url?: string;
  original_text: string;
  published_at: string;
  
  topic: string;
  market_relevance: string;
  risk_level: string;
  
  ai_interpretation: string;
  usd_impact: string;
  xauusd_impact: string;
  btcusd_impact: string;
  eurusd_impact?: string;
  confidence: number;
  alert_triggered: boolean;
}

export interface MarketTicker {
  id: number;
  symbol: string;
  name: string;
  asset_class: string;
  price: number;
  change: number;
  change_percent: number;
  intraday_trend: "BULLISH" | "BEARISH" | "SIDEWAYS";
  previous_close: number;
  day_high: number;
  day_low: number;
  sparkline: number[];
  last_updated: string;
}

export interface FactorItem {
  title: string;
  description: string;
  impact: "BULLISH" | "BEARISH" | "NEUTRAL";
  strength: number;
  source?: string;
}

export interface AssetOutlook {
  asset: string;
  bias: BiasDirection;
  score: number;
  confidence: number;
  executive_summary: string;
  primary_drivers: string[];
  bullish_factors: FactorItem[];
  bearish_factors: FactorItem[];
  key_events_to_watch: string[];
  market_reaction_validation: string;
  macro_transmission_rule: string;
  last_updated: string;
}

export interface AlertItem {
  id: number;
  alert_type: string;
  title: string;
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  affected_assets: string[];
  payload?: any;
  sent_telegram: boolean;
  sent_web: boolean;
  is_read: boolean;
  created_at: string;
}
