const playwright = require("playwright");

module.exports = async function (courier, trackingId) {
  if (courier !== "india-post") {
    throw new Error("Only india-post is supported for now");
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://myspeedpost.com/track", { waitUntil: "domcontentloaded", timeout: 60000 });

    await page.fill("input[name='tracking_number']", trackingId);
    await page.click("button:has-text('Track')");

    await page.waitForSelector("text=Current Status", { timeout: 15000 });

    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : "";
      };

      return {
        consignment: getText("div:has-text('Consignment Number') + div"),
        status: getText("div:has-text('Current Status') + div"),
        lastUpdated: getText("div:has-text('Last Updated') + div"),
        deliveryAt: getText("div:has-text('Delivered At') + div"),
        bookedOn: getText("div:has-text('Booked On') + div"),
        deliveryLocation: getText("div:has-text('Delivery Location') + div"),
        fullHtml: document.querySelector("body").innerHTML
      };
    });

    return data;
  } catch (err) {
    throw new Error("Tracking failed: " + err.message);
  } finally {
    await browser.close();
  }
};
