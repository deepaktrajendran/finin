"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Settings, Info, TrendingUp } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock chart data representing candlesticks roughly via a bar chart 
const chartData = Array.from({ length: 40 }).map((_, i) => {
  const base = 200 + Math.random() * 50;
  const isUp = Math.random() > 0.4;
  return {
    name: `Day ${i}`,
    open: isUp ? base : base + 10,
    close: isUp ? base + 10 : base,
    high: base + 15,
    low: base - 5,
    volume: Math.random() * 100,
    isUp,
  };
});

// A small dataset for the AI insights mini chart
const aiChartData = Array.from({ length: 20 }).map((_, i) => ({
  val: 50 + Math.random() * 50 - (10 - i) * 2,
  isUp: Math.random() > 0.3
}));

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [marketData, setMarketData] = useState<any>({ indices: [], stocks: [] });
  const [newsData, setNewsData] = useState<any>({ topMarketNews: [], businessNews: [] });

  useEffect(() => {
    setMounted(true);
    
    // Fetch Live Data
    fetch('/api/market-data')
      .then(res => res.json())
      .then(data => setMarketData(data))
      .catch(console.error);

    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNewsData(data))
      .catch(console.error);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#333] font-sans overflow-x-hidden pb-12">
      
      {/* --- HEADER --- */}
      <header className="bg-gradient-to-r from-[#B4D6F1] to-[#D0E4F5] border-b border-[#A6C8E6] relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Left Nav */}
            <div className="flex items-center space-x-6 text-sm font-semibold text-[#2C4869]">
              <div className="border-b-4 border-[#1D70B8] py-4 px-1 text-[#1D70B8]">Markets</div>
              <div className="cursor-pointer hover:text-[#1D70B8]">News</div>
              <div className="cursor-pointer hover:text-[#1D70B8]">Portfolio</div>
              <div className="cursor-pointer hover:text-[#1D70B8]">Watchlist</div>
              <div className="cursor-pointer hover:text-[#1D70B8]">Insights</div>
            </div>

            {/* Right Nav */}
            <div className="flex items-center space-x-6 text-sm font-medium text-[#2C4869]">
              <div 
                className="cursor-pointer hover:text-[#1D70B8]"
                onClick={() => router.push("/login")}
              >
                Login
              </div>
              <Search className="w-5 h-5 cursor-pointer text-[#1D70B8]" />
            </div>

          </div>
        </div>
      </header>

      {/* --- TICKER (SCROLLING MARQUEE) --- */}
      <div className="bg-[#F8F9FA] border-b border-[#E0E4E8] text-xs py-2 shadow-sm overflow-hidden relative z-10">
        <div className="whitespace-nowrap flex animate-marquee">
          {(marketData.indices || []).concat(marketData.stocks || []).map((item: any, i: number) => (
            <div key={i} className="inline-flex items-center space-x-2 mx-8">
              <span className="font-semibold text-[#555]">{item.name}</span>
              <span className="font-bold">{item.price?.toFixed(2)}</span>
              <span className={`flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                {item.isUp ? '▲' : '▼'} {item.change?.toFixed(2)} ({item.percentChange?.toFixed(2)}%)
              </span>
            </div>
          ))}
          {/* Duplicate for seamless scrolling */}
          {(marketData.indices || []).concat(marketData.stocks || []).map((item: any, i: number) => (
            <div key={`dup-${i}`} className="inline-flex items-center space-x-2 mx-8">
              <span className="font-semibold text-[#555]">{item.name}</span>
              <span className="font-bold">{item.price?.toFixed(2)}</span>
              <span className={`flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                {item.isUp ? '▲' : '▼'} {item.change?.toFixed(2)} ({item.percentChange?.toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* --- MAIN LAYOUT --- */}
      <main className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-6 flex flex-col">
            
            {/* Top Market News (MOVED TO TOP) */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm order-1">
              <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Top Market News</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {newsData.topMarketNews?.length > 0 ? newsData.topMarketNews.map((news: any, i: number) => (
                  <a key={i} href={news.link} target="_blank" rel="noopener noreferrer" className="flex items-start p-3 hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <img src={news.img} alt="Thumbnail" className="w-14 h-14 object-cover rounded mr-3 flex-shrink-0" />
                    <div className="flex flex-col">
                       <p className="text-xs font-medium text-[#333] leading-snug hover:text-[#1D70B8] line-clamp-3">{news.title}</p>
                       <span className="text-[10px] text-gray-400 mt-1">{new Date(news.time).toLocaleTimeString()}</span>
                    </div>
                  </a>
                )) : (
                  <div className="p-4 text-center text-xs text-gray-400">Loading Live News...</div>
                )}
              </div>
            </div>

            {/* Global Indices */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm overflow-hidden order-2">
              <div className="flex items-center justify-between p-3 bg-[#4A90E2] text-white">
                <h2 className="font-bold text-sm">Global Indices (Live)</h2>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {marketData.indices?.length > 0 ? marketData.indices.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F8F9FA] cursor-pointer text-sm">
                    <span className="text-[#555]">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#333]">{item.price?.toFixed(2)}</span>
                      <span className={`text-xs flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                        {item.isUp ? '▲' : '▼'} {item.change?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 text-center text-xs text-gray-400">Loading Indices...</div>
                )}
              </div>
            </div>

          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="space-y-6 overflow-hidden flex flex-col">
            
            {/* Latest Business News (MOVED TO TOP) */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm order-1">
              <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Latest Business News</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {newsData.businessNews?.length > 0 ? newsData.businessNews.map((news: any, i: number) => (
                  <a key={i} href={news.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer group block">
                    <div className="overflow-hidden rounded mb-2 h-24">
                       <img src={news.img} alt="News" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xs font-bold text-[#2C4869] group-hover:text-[#1D70B8] leading-tight line-clamp-2">{news.title}</h3>
                    <span className="text-[10px] text-gray-400 mt-1 block">{new Date(news.time).toLocaleTimeString()}</span>
                  </a>
                )) : (
                  <div className="col-span-3 p-4 text-center text-xs text-gray-400">Loading Live News...</div>
                )}
              </div>
            </div>

            {/* Chart Card (MOVED TO BOTTOM) */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm order-2">
              
              {/* Card Header (Blue) */}
              <div className="bg-[#1D70B8] text-white p-4 rounded-t flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                    <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
                       <path d="M0,50 Q25,10 50,40 T100,30 T150,20 T200,10" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                 </div>
                 <div className="z-10 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   {marketData.indices?.slice(0,2).map((idx: any, i: number) => (
                     <h2 key={i} className="text-lg font-bold">{idx.name} {idx.price?.toFixed(2)} <span className={`${idx.isUp ? 'text-[#4CD964]' : 'text-[#FF3B30]'} text-sm ml-1`}>{idx.isUp ? '▲' : '▼'} {idx.change?.toFixed(2)} ({idx.percentChange?.toFixed(2)}%)</span></h2>
                   ))}
                 </div>
              </div>

              {/* Company Info */}
              <div className="p-4 flex items-center justify-between border-b border-[#E0E4E8]">
                <h3 className="text-[#1D70B8] font-bold text-lg">Reliance Industries Ltd.</h3>
                <div className="flex space-x-3 text-gray-400">
                  <Info className="w-5 h-5 cursor-pointer hover:text-gray-600" />
                  <Settings className="w-5 h-5 cursor-pointer hover:text-gray-600" />
                </div>
              </div>

              {/* Timeframe Tabs */}
              <div className="px-4 pt-3 flex space-x-2">
                {['1D', '1W', '1M', '3M', '5Y'].map(tab => (
                  <button key={tab} className={`px-3 py-1 text-xs border rounded ${tab === '1D' ? 'bg-[#1D70B8] text-white border-[#1D70B8]' : 'bg-white text-gray-500 border-[#E0E4E8] hover:bg-gray-50'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Chart Area */}
              <div className="px-4 pt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E4E8" />
                    <XAxis dataKey="name" tick={{fontSize: 10, fill: '#888'}} axisLine={false} tickLine={false} />
                    <YAxis orientation="right" domain={['auto', 'auto']} tick={{fontSize: 10, fill: '#888'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#F0F4F8'}} contentStyle={{fontSize: '12px'}} />
                    <Bar dataKey="close" barSize={8}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isUp ? '#28A745' : '#DC3545'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Bars Area */}
              <div className="px-4 pb-4 h-16">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                      <Bar dataKey="volume" barSize={4}>
                         {chartData.map((entry, index) => (
                          <Cell key={`vol-${index}`} fill={entry.isUp ? '#82ca9d' : '#fca5a5'} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-6">
            
            {/* Your Portfolio */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm">
               <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Your Portfolio</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#555]">Total Value:</span>
                  <span className="text-lg font-bold text-[#2C4869]">₹12,75,400</span>
                </div>
                <div className="border-t border-[#E0E4E8] pt-3 flex justify-between items-center text-sm">
                  <span className="text-[#555]">Today's Gain:</span>
                  <span className="font-bold text-[#28A745]">+7,850 <span className="font-normal text-xs">(0.62%)</span></span>
                </div>
              </div>
            </div>

            {/* AI Market Insights */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm overflow-hidden">
              <div className="bg-[#E74C3C] text-white p-3 flex items-center justify-between">
                <h2 className="font-bold text-sm">AI Market Insights</h2>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 bg-white">
                <p className="text-[#2C4869] font-bold text-sm mb-3">Bullish Trend Expected for IT Sector</p>
                <div className="h-24 bg-[#F8F9FA] rounded border border-[#E0E4E8] relative flex items-end">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aiChartData} margin={{top: 10, bottom: 5, left: 5, right: 5}}>
                         <Bar dataKey="val" barSize={6}>
                            {aiChartData.map((d, i) => (
                               <Cell key={`ai-${i}`} fill={d.isUp ? '#1D70B8' : '#F39C12'} />
                            ))}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                   <div className="absolute right-2 top-2">
                     <TrendingUp className="w-6 h-6 text-[#F1C40F]" />
                   </div>
                </div>
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm">
               <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Watchlist (Live)</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {marketData.stocks?.length > 0 ? marketData.stocks.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F8F9FA] cursor-pointer text-sm">
                    <span className="text-[#555]">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#333]">{item.price?.toFixed(2)}</span>
                      <span className={`text-xs flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                        {item.isUp ? '▲' : '▼'} {item.percentChange?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 text-center text-xs text-gray-400">Loading Stocks...</div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
