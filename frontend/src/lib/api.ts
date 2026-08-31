import axios from "axios";
import {
  OverviewData,
  NewsItem,
  CalendarEvent,
  TrumpPost,
  MarketTicker,
  AssetOutlook,
  AlertItem,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getOverview: async (): Promise<OverviewData> => {
    try {
      const response = await apiClient.get<OverviewData>("/overview");
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, using fallback mock data for overview:", error);
      throw error;
    }
  },

  getNews: async (params?: {
    category?: string;
    impact?: string;
    asset?: string;
    tier?: string;
    search?: string;
  }): Promise<{ total: number; categories: string[]; items: NewsItem[] }> => {
    const response = await apiClient.get("/news", { params });
    return response.data;
  },

  getCalendar: async (params?: {
    impact?: string;
    status?: string;
    search?: string;
  }): Promise<{
    total: number;
    upcoming_count: number;
    completed_count: number;
    events: CalendarEvent[];
  }> => {
    const response = await apiClient.get("/calendar", { params });
    return response.data;
  },

  getTrumpPosts: async (params?: {
    topic?: string;
    relevance?: string;
    search?: string;
  }): Promise<{
    total: number;
    high_impact_count: number;
    topics: string[];
    posts: TrumpPost[];
  }> => {
    const response = await apiClient.get("/trump-posts", { params });
    return response.data;
  },

  getMarketData: async (): Promise<{ total: number; tickers: MarketTicker[] }> => {
    const response = await apiClient.get("/market-data");
    return response.data;
  },

  getOutlooks: async (): Promise<{
    xauusd: AssetOutlook;
    btcusd: AssetOutlook;
    usd: AssetOutlook;
    eurusd?: AssetOutlook;
  }> => {
    const response = await apiClient.get("/outlook");
    return response.data;
  },

  getAlerts: async (): Promise<{
    total: number;
    unread_count: number;
    alerts: AlertItem[];
  }> => {
    const response = await apiClient.get("/alerts");
    return response.data;
  },

  markAlertRead: async (alertId: number): Promise<any> => {
    const response = await apiClient.post(`/alerts/mark-read/${alertId}`);
    return response.data;
  },

  getDailyReport: async (): Promise<any> => {
    const response = await apiClient.get("/reports/daily");
    return response.data;
  },

  getWeeklyReport: async (): Promise<any> => {
    const response = await apiClient.get("/reports/weekly");
    return response.data;
  },
};
