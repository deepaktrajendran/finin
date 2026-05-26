import YahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new YahooFinanceClass();
yahooFinance.quote(['^BSESN']).then(console.log).catch(console.error);
