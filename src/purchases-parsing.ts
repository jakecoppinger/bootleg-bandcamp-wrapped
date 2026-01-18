import { Album } from "./interfaces";

/** Parse the HTML of the bandcamp purchases page into a list of albums.*/
export function purchasesHtmlToAlbums({ input }: { input: string }): Album[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const items = doc.querySelectorAll(".purchases-item");

  const albums = Array.from(items).flatMap((item: Element): any => {
    const url = (item.querySelector("a.purchases-item-title") as HTMLAnchorElement)?.href;
    if (!url) return [];
    const titleElement = item.querySelector(
      "a.purchases-item-title strong",
    ) as HTMLElement;
    const title = titleElement.textContent?.trim()
      .replace(/\n/g, "").replace("(ALBUM)", "")
      .replace(/\s+/g, " ")
      .trim() || "";
    const artistElement = item.querySelector("a.purchases-item-title") as HTMLElement;
    const artist = artistElement.textContent?.trim().split(" by")[1]?.trim();

    // The purchases-item-total is in a separate .purchases-item with the same sale_item_id
    const saleItemId = item.getAttribute("sale_item_id");
    const totalItem = saleItemId 
      ? doc.querySelector(`.purchases-item[sale_item_id="${saleItemId}"] .purchases-item-total`)
      : null;
    
    const currencyElement = totalItem?.querySelector("span.small") as HTMLElement;
    const currencyString = currencyElement?.textContent?.trim();
    if(!currencyString) {
      console.warn(`Album ${title} has no currency. Perhaps not all the HTML was copied (if cursor ends at this album)`);
      return [];
    }
    // Get the second strong element (the one with the price, not "Total:")
    const priceStrong = totalItem?.querySelectorAll("strong")[1] as HTMLElement;
    const priceText = priceStrong?.textContent?.replace(currencyString, "").trim() || "";
    // Extract just the numeric value (remove currency symbols like £, $, €, etc.)
    const costString = priceText.replace(/[^\d.]/g, "") || "";
    const artElement = item.querySelector("img.purchases-item-art") as HTMLImageElement;
    const art = artElement.src;
    return {
      url,
      title,
      artist,
      art,
      cost: costString,
      currency: currencyString,
    };
  });
  return albums;
}