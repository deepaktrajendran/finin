import { NextResponse } from 'next/server';
import YahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new YahooFinanceClass();

// Cache the results for a short time to avoid hitting rate limits on every render
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Top Indices symbols in Yahoo Finance
    const symbols = [
      '^BSESN', // Sensex
      '^NSEI',  // Nifty 50
      '^DJI',   // Dow Jones
      '^IXIC',  // NASDAQ
      '^FTSE',  // FTSE 100
      '^HSI'    // Hang Seng
    ];

    // Popular stocks for watchlist/top shares
    const stockSymbols = [
      'RELIANCE.NS',
      'TCS.NS',
      'HDFCBANK.NS',
      'MARUTI.NS',
      'INFY.NS'
    ];

    const quotes = await yahooFinance.quote([...symbols, ...stockSymbols]);

    const formattedData = quotes.map(q => ({
      symbol: q.symbol,
      name: q.shortName || q.longName || q.symbol,
      price: q.regularMarketPrice,
      change: q.regularMarketChange,
      percentChange: q.regularMarketChangePercent,
      isUp: q.regularMarketChange ? q.regularMarketChange >= 0 : true,
    }));

    // Split into indices and stocks
    const indices = formattedData.filter(d => d.symbol.startsWith('^'));
    const stocks = formattedData.filter(d => !d.symbol.startsWith('^'));

    return NextResponse.json({ indices, stocks });
  } catch (error) {
    console.error("Error fetching market data:", error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
