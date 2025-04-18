const playwright = require("playwright");

module.exports = async function (courier, trackingId) {
  // Use India Post's tracking URL
  const url = `https://www.indiapost.gov.in/VAS/Pages/tracking.aspx`;

  // Launch the browser
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the India Post tracking page
  await page.goto(url, { waitUntil: "load", timeout: 60000 });

  // Type the consignment number into the tracking input field
  await page.fill('#ctl00_ContentPlaceHolder1_txtConsignment', trackingId);

  // Click the "Track" button
  await page.click('#ctl00_ContentPlaceHolder1_btnTrack');
  
  // Wait for the tracking information to load
  await page.waitForSelector('.tracking_result', { timeout: 60000 });

  // Scrape the relevant tracking information
  const trackingData = await page.evaluate(() => {
    const events = [];
    const eventNodes = document.querySelectorAll('.event-details'); // Adjust this selector to match the actual event container
    eventNodes.forEach((node) => {
      events.push({
        date: node.querySelector('.event-date') ? node.querySelector('.event-date').textContent : 'N/A',
        status: node.querySelector('.event-status') ? node.querySelector('.event-status').textContent : 'N/A',
        location: node.querySelector('.event-location') ? node.querySelector('.event-location').textContent : 'N/A'
      });
    });
    return events;
  });

  await browser.close();

  // Return the scraped data
  return trackingData;
};
