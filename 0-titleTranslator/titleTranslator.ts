import axios from "axios";
import cheerio from "cheerio";

try {
  const response = await axios.get("https://adventofcode.com");
  const $ = await cheerio.load(response.data);

  const translate = (title: string): string => {
    let binary: string = "";
    for (let char in title) {
      if (title[char] == "@") {
        binary += "0";
      } else if (title[char] == "#") {
        binary += "1";
      }
      if (binary.length % 8 == 0) {
        binary += " ";
      }
    }
    return binary
      .split(" ")
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join("");
  };

  // gets titles each title
  const titles = $("main pre a")
    .map((index, element) => {
      // checks and translates titles characters
      return $(element).text().trim();
    })
    .get();

  /*
  for (title in titles) {
    translations.push(translate(titles[title]));
  }
  */

  let translations: string[] = titles.map((title, index) => {
    return translate(title);
  });

  console.log(titles, "\n", translations);
} catch (error) {
  console.error(error);
}
