# Scope
[https://2csv.net](https://2csv.net) is a receipt to CSV / Xero exporting tool using AWS Textract.

Advantages over commercial tools:
1. Significantly quicker (seconds vs minutes)
2. Simple intuitive interface
3. Multi receipt parsing
4. Inline editing

# Motivation

I was playing around with using puppeteer to screenshot webpages and then extract the text using an
Azure OCR service. I'd pass this text to GPT4 functions in an attempt to create a very simple web scraper. Turns
out there's alot of context missing from the text that makes it difficult to use. 

I then came across AWS textract which is tuned for receipts and created this tool. 