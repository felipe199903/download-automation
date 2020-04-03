const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.baixarfilmetorrenthd.com/genero/filmes/?orderby=lancamento');
  await page.screenshot({path: 'download.png'});

  const titleMovie = await page.evaluate(() => {
    let movieTitleHeading = document.querySelectorAll(".titulo"); 
    const movieTitleList = [...movieTitleHeading];
    return movieTitleList.map(h => h.innerText);
});

const movie = await page.evaluate(() => {
  let movieHeading = document.querySelectorAll(".item"); 
  const movieList = [...movieHeading];
  return movieList.map(h => h.innerText);
});  
  await page.click(".item");

    const resultLinks = await page.evaluate(() => {
      let links = document.querySelectorAll(".td-mv-dow"); 
      const linksLista = [...links];
      return linksLista.map(h => h.innerHTML);
  });

  const hrefs = await page.$$eval('td-mv-dow', as => as.map(a => a.href));

    console.log("Title Movies:");
    console.log(titleMovie);

    console.log("Movies:");
    console.log(movie);

    console.log("Links_page:");
    console.log(hrefs);

    console.log("Links:");
    console.log(resultLinks);

  await browser.close();
})();