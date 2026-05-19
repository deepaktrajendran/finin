export interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  changeValue: number;
}

export interface PortfolioItem extends Stock {
  quantity: number;
  avgBuyPrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const MOCK_USER = {
  name: "Deepak T",
  email: "deepak@finin.in",
  avatarUrl: "https://i.pravatar.cc/150?u=deepak",
  portfolioValue: 1245000.50,
  dayGain: 15400.20,
  dayGainPercent: 1.25,
};

export const MOCK_WATCHLIST: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2950.45, changePercent: 1.5, changeValue: 43.60 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 4120.00, changePercent: -0.8, changeValue: -32.96 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1450.25, changePercent: 0.5, changeValue: 7.25 },
  { symbol: "INFY", name: "Infosys", price: 1680.90, changePercent: 2.1, changeValue: 34.55 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1090.15, changePercent: 1.1, changeValue: 11.87 },
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2950.45,
    changePercent: 1.5,
    changeValue: 43.60,
    quantity: 100,
    avgBuyPrice: 2500.00,
    totalInvested: 250000,
    currentValue: 295045,
    profitLoss: 45045,
    profitLossPercent: 18.01
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 4120.00,
    changePercent: -0.8,
    changeValue: -32.96,
    quantity: 50,
    avgBuyPrice: 3800.00,
    totalInvested: 190000,
    currentValue: 206000,
    profitLoss: 16000,
    profitLossPercent: 8.42
  },
  {
    symbol: "ZOMATO",
    name: "Zomato Ltd",
    price: 185.50,
    changePercent: 4.5,
    changeValue: 7.98,
    quantity: 1000,
    avgBuyPrice: 120.00,
    totalInvested: 120000,
    currentValue: 185500,
    profitLoss: 65500,
    profitLossPercent: 54.58
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Price Alert",
    message: "RELIANCE has hit your target price of ₹2950",
    time: "2 mins ago",
    isRead: false
  },
  {
    id: "2",
    title: "Order Executed",
    message: "Bought 100 shares of ZOMATO at ₹180.20",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: "3",
    title: "Dividend Received",
    message: "₹1,500 dividend credited from TCS",
    time: "1 day ago",
    isRead: true
  }
];
