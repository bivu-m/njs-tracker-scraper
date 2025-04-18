const playwright = require("playwright");

module.exports = async function (courier, trackingId) {
  const url = `https://www.aftership.com/track/${courier}/${trackingId}`;

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
 const page = await context.newPage();
await page.goto(url, { waitUntil: "load", timeout: 60000 });
return page;



  // Sample output since the actual site uses shadow DOM and dynamic rendering
  const content = await page.content();

  await browser.close();

  return [{ detail: "Sample Status", date: "Today", location: "Sample Location" }];
};
