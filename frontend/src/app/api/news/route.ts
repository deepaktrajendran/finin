import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800; 

export async function GET() {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media'],
          ['description', 'description'],
          ['enclosure', 'enclosure']
        ]
      }
    });
    
    // Using Economic Times and Moneycontrol public RSS feeds
    const feeds = [
      'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms', // ET Markets
      'https://economictimes.indiatimes.com/news/economy/rssfeeds/1373380680.cms', // ET Economy
    ];

    let allNews: any[] = [];

    for (const feedUrl of feeds) {
      const feed = await parser.parseURL(feedUrl);
      const items = feed.items.map(item => {
        // Extract image
        let img = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop";
        if (item.enclosure && item.enclosure.url) {
           img = item.enclosure.url;
        } else if (item.media && item.media['$'] && item.media['$'].url) {
           img = item.media['$'].url;
        } else if (item.content && item.content.match(/<img[^>]+src="([^">]+)"/)) {
           const match = item.content.match(/<img[^>]+src="([^">]+)"/);
           if (match) img = match[1];
        }

        return {
          title: item.title,
          link: item.link,
          time: item.pubDate,
          img: img,
        };
      });
      allNews = [...allNews, ...items];
    }

    // Sort by date descending
    allNews.sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());

    // Split for UI purposes
    const topMarketNews = allNews.slice(0, 5);
    const businessNews = allNews.slice(5, 11);

    return NextResponse.json({ topMarketNews, businessNews });
  } catch (error) {
    console.error("Error fetching news data:", error);
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 });
  }
}
