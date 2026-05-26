const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['description', 'description'],
      ['enclosure', 'enclosure'],
      ['image', 'image']
    ]
  }
});

async function run() {
  try {
    const feed = await parser.parseURL('https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms');
    console.log("RSS Feed Item [0]:", JSON.stringify(feed.items[0], null, 2));
  } catch(e) {
    console.error("RSS Error:", e);
  }
}
run();
