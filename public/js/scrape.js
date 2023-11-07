const puppeteer = require("puppeteer");

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  console.log("launch");
  const page = await browser.newPage();
  console.log("new page created");

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );
  console.log("user agent set");
  // Navigate to the Baseball-Reference page
  await page.goto(
    "https://www.baseball-reference.com/leaders/WAR_career.shtml"
  );
  console.log("Reached Website");
  // Wait for the table to be visible
  await page.waitForSelector("#leader_standard_WAR");

  // Extract data from the table
  const data = await page.evaluate(() => {
    const table = document.getElementById("leader_standard_WAR");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    // Slice the array to collect only the first ten rows
    const slicedRows = rows.slice(585, 586);

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
