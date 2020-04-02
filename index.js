const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.baixarfilmetorrenthd.com/genero/filmes/?orderby=lancamento');
  await page.screenshot({path: 'download.png'});

  await page.click(".item");

    const result = await page.evaluate(() => {
        let headingFromWeb = document.querySelectorAll(".item-titulo"); 
        const headingList = [...headingFromWeb];
        return headingList.map(h => h.innerText);
    });

    const resultLinks = await page.evaluate(() => {
      let links = document.querySelectorAll(".td-mv-dow"); 
      const linksLista = [...links];
      return linksLista.map(h => h.innerHTML);
  });
    console.log("Titulos:");
    console.log(result);

    console.log("Links:");
    console.log(resultLinks);

  await browser.close();
})();