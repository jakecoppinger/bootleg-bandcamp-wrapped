import { generateAlbumSummarySection } from "./album-summary";
import { Album, CurrencyConversion } from "./interfaces";
import { albumsToMarkdownOutput } from "./markdown";
import { purchasesHtmlToAlbums } from "./purchases-parsing";
import { generateSpendingText } from "./spending";

import { exampleClipboardContent } from "./example-clipboard-content";


const droptarget = document.querySelector("#droptarget") as HTMLElement | null;
if (!droptarget) {
  throw new Error("Could not find #droptarget element");
}

const loadExampleClipboardContentButton = document
  .getElementById('load-example-clipboard-content') as HTMLButtonElement | null;
if (!loadExampleClipboardContentButton) {
  throw new Error("Could not find #load-example-clipboard-content element");
}
loadExampleClipboardContentButton.addEventListener('click', () => {
  generateAlbumsStats({htmlInput: exampleClipboardContent});
});

droptarget.addEventListener("paste", (event: ClipboardEvent) => {
  event.preventDefault();
  const paste = event.clipboardData?.getData("text/html");
  if (!paste) {
    alert(
      "Couldn't find any HTML in that paste event, are you sure you're copying directly from the Bandcamp website?",
    );
    return;
  }
  generateAlbumsStats({htmlInput: paste});
});


/** Essentially the main function */
function generateAlbumsStats({htmlInput}: {htmlInput: string}) {

  const targetCurrencyEle= document.querySelector("#currency-select") as HTMLSelectElement;
  if (!targetCurrencyEle) {
    throw new Error("Could not find #currency-select element");
  }
  const targetCurrency = targetCurrencyEle.value;
  if(targetCurrency !== "AUD" && targetCurrency !== "USD") {
    console.error("Only AUD & USD are supported currently");
    return;
  }

  const albums = purchasesHtmlToAlbums({ input: htmlInput });

  const markdownOutput = document.querySelector("#markdown-output") as HTMLTextAreaElement;
  if (markdownOutput) {
    markdownOutput.removeAttribute("hidden");
    markdownOutput.value = albumsToMarkdownOutput(albums);
  }

  const htmlPreview = document.querySelector("#html-preview");
  if (!htmlPreview) return;
  const h = htmlPreview.appendChild(
    c("div", "display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;"),
  ) as HTMLElement;

  function c(tag: string, style?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (style) (elem as any).style = style;
    return elem;
  }

  for (let album of albums) {
    const div = h.appendChild(c("div"));
    const aimg = div.appendChild(c("a")) as HTMLAnchorElement;
    aimg.href = album.url;
    const img = aimg.appendChild(c("img")) as HTMLImageElement;
    img.src = album.art;
    img.alt = "";
    const atitle = div.appendChild(c("a")) as HTMLAnchorElement;
    atitle.href = album.url;
    const strong = atitle.appendChild(c("strong"));
    strong.textContent = album.title;
    const span = atitle.appendChild(c("span"));
    span.textContent = " by " + album.artist;
  }

  const htmlOutput = document.querySelector("#html-output") as HTMLTextAreaElement;
  if (htmlOutput) {
    htmlOutput.removeAttribute("hidden");
    htmlOutput.value = h.outerHTML;
  }

  const htmlSpending = document.querySelector("#html-spending");
  if (htmlSpending) {
    htmlSpending.innerHTML = "";
    htmlSpending.removeAttribute("hidden");
    const spendingSection = document.createElement("h3");
    spendingSection.textContent = generateSpendingText({albums, targetCurrency, targetYear: 2025});
    htmlSpending.appendChild(spendingSection);
  }

  const albumSummary = document.querySelector("#album-summary");
  if (albumSummary) {
    albumSummary.innerHTML = "";
    albumSummary.removeAttribute("hidden");
    const albumSummarySection = generateAlbumSummarySection(albums);
    albumSummary.appendChild(albumSummarySection);
  }
  const showAfterInput = document.querySelector(".show-after-input");
  if (showAfterInput) {
    showAfterInput.removeAttribute("hidden");
  }
}