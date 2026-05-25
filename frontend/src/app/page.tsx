"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Settings, Info, TrendingUp } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- Mock Data ---
const tickerData = [
  { name: "Sensex", value: "58,920.35", change: "245.65", percent: "0.42%", isUp: true },
  { name: "Nifty", value: "17,350.25", change: "82.10", percent: "0.48%", isUp: false },
  { name: "Dow Jones", value: "34,200.67", change: "210.59", percent: "0.62%", isUp: true },
  { name: "Nasdaq", value: "14,256.78", change: "150.18", percent: "1.06%", isUp: false },
];

const globalIndices = [
  { name: "Dow Jones", value: "34,200.67", change: "210.59", isUp: true },
  { name: "NASDAQ", value: "14,256.78", change: "150.18", isUp: false },
  { name: "FTSE", value: "7,980.45", change: "45.32", isUp: true },
  { name: "Hang Seng", value: "20,350.40", change: "182.60", isUp: true },
];

const watchlist = [
  { name: "Reliance", value: "2,450.75", percent: "1.2%", isUp: true },
  { name: "TCS", value: "3,450.50", percent: "4.5%", isUp: false },
  { name: "HDFC", value: "2,655.30", percent: "0.8%", isUp: true },
  { name: "Maruti", value: "8,350.40", percent: "0.9%", isUp: true },
];

const topMarketNews = [
  { title: "RBI Policy Update: Key Takeaways from the Latest Meeting", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=100&h=100&fit=crop" },
  { title: "Tech Stocks Rally as Earnings Beat Expectations", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=100&h=100&fit=crop" },
  { title: "Global Markets Mixed Amid Inflation Concerns", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=100&h=100&fit=crop" },
  { title: "Crude Oil Prices Surge on Supply Issues", img: "https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=100&h=100&fit=crop" },
];

const businessNews = [
  { title: "Inflation Fears Rise as Economic Pressures Hit Record High", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=300&h=200&fit=crop" },
  { title: "Electric Vehicle Sales Set To Boom in 2024", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=300&h=200&fit=crop" },
  { title: "India's GDP Growth Forecast Revised Upward", img: "https://images.unsplash.com/photo-1477959858617-67f851d5f3e1?q=80&w=300&h=200&fit=crop" },
];

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#333] font-sans overflow-x-hidden pb-12">
      
      {/* --- HEADER --- */}
      <header className="bg-gradient-to-r from-[#B4D6F1] to-[#D0E4F5] border-b border-[#A6C8E6]">
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

      {/* --- TICKER --- */}
      <div className="bg-[#F8F9FA] border-b border-[#E0E4E8] text-xs py-2 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 flex items-center space-x-6 overflow-x-auto whitespace-nowrap">
          {tickerData.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="font-semibold text-[#555]">{item.name}</span>
              <span className="font-bold">{item.value}</span>
              <span className={`flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                {item.isUp ? '▲' : '▼'} {item.change} ({item.percent})
              </span>
              {i !== tickerData.length - 1 && <span className="text-gray-300 ml-4">|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <main className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-6">
            
            {/* Top Market News */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm">
              <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Top Market News</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {topMarketNews.map((news, i) => (
                  <div key={i} className="flex items-start p-3 hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <img src={news.img} alt="Thumbnail" className="w-14 h-14 object-cover rounded mr-3 flex-shrink-0" />
                    <p className="text-xs font-medium text-[#333] leading-snug hover:text-[#1D70B8]">{news.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Indices */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-[#4A90E2] text-white">
                <h2 className="font-bold text-sm">Global Indices</h2>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {globalIndices.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F8F9FA] cursor-pointer text-sm">
                    <span className="text-[#555]">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#333]">{item.value}</span>
                      <span className={`text-xs flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                        {item.isUp ? '▲' : '▼'} {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="space-y-6 overflow-hidden">
            
            {/* Chart Card */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm">
              
              {/* Card Header (Blue) */}
              <div className="bg-[#1D70B8] text-white p-4 rounded-t flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                    <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
                       <path d="M0,50 Q25,10 50,40 T100,30 T150,20 T200,10" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                 </div>
                 <div className="z-10 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <h2 className="text-lg font-bold">Sensex 58,920.35 <span className="text-[#4CD964] text-sm ml-1">▲ 245.65 (0.42%)</span></h2>
                   <h2 className="text-lg font-bold">Nifty 17,350.25 <span className="text-[#FF3B30] text-sm ml-1">▼ 82.10 (0.48%)</span></h2>
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

            {/* Latest Business News */}
            <div className="bg-white border border-[#E0E4E8] rounded shadow-sm">
              <div className="flex items-center justify-between p-3 border-b border-[#E0E4E8]">
                <h2 className="text-[#1D70B8] font-bold text-sm">Latest Business News</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {businessNews.map((news, i) => (
                  <div key={i} className="cursor-pointer group">
                    <div className="overflow-hidden rounded mb-2 h-24">
                       <img src={news.img} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xs font-bold text-[#2C4869] group-hover:text-[#1D70B8] leading-tight">{news.title}</h3>
                  </div>
                ))}
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
                <h2 className="text-[#1D70B8] font-bold text-sm">Watchlist</h2>
                <ChevronRight className="w-4 h-4 text-[#1D70B8]" />
              </div>
              <div className="divide-y divide-[#F0F2F5]">
                {watchlist.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F8F9FA] cursor-pointer text-sm">
                    <span className="text-[#555]">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#333]">{item.value}</span>
                      <span className={`text-xs flex items-center ${item.isUp ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
                        {item.isUp ? '▲' : '▼'} {item.percent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
