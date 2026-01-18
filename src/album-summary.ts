import { Album } from "./interfaces";

export function generateAlbumSummarySection(albums: Album[]): HTMLDivElement {
    const div = document.createElement("div");
    
    const h3 = document.createElement("h3");
    h3.textContent = "Purchases";
    div.appendChild(h3);
    
    const list = generateAlbumSummaryList(albums);
    div.appendChild(list);
    
    return div;
}

/** Generates an unordered list of album purchases. */
export function generateAlbumSummaryList(albums: Album[]): HTMLUListElement {
    const ul = document.createElement("ul");
    ul.className = "purchases";
    
    for (const album of albums) {
        const li = document.createElement("li");
        
        const strong = document.createElement("strong");
        const a = document.createElement("a");
        a.href = album.url;
        a.textContent = album.title;
        strong.appendChild(a);
        
        li.appendChild(strong);
        li.appendChild(document.createTextNode(` by ${album.artist}`));
        
        ul.appendChild(li);
    }
    
    return ul;
}