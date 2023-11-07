const puppeteer = require("puppeteer");

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Baseball-Reference page
  await page.goto(
    "https://www.baseball-reference.com/leaders/WAR_career.shtml"
  );

  // Wait for the table to be visible
  await page.waitForSelector("#leader_standard_WAR");

  // Extract data from the table
  const data = await page.evaluate(() => {
    const table = document.getElementById("leader_standard_WAR");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    // Slice the array to collect only the first ten rows
    const slicedRows = rows.slice(0, 10);

    return slicedRows.map((row) => {
      const columns = Array.from(row.querySelectorAll("td"));
      return columns.map((column) => column.textContent.trim());
    });
  });

  // Print the scraped data
  console.log(data);

  // Close the browser
  await browser.close();
})();
