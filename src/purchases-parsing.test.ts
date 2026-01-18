import { purchasesHtmlToAlbums } from './purchases-parsing';
import * as fs from 'fs';
import * as path from 'path';
    const htmlPath = path.join(__dirname, '../example-purchases/example-clipboard-content.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

describe('purchasesHtmlToAlbums', () => {
  it('should return correct number of albums', () => {
    const albums = purchasesHtmlToAlbums({ input: html });
    expect(albums).toHaveLength(4);
  });
  it('should parse example HTML and return first album correctly', () => {
    const albums = purchasesHtmlToAlbums({ input: html });
    expect(albums[0]).toEqual({
      art: "https://f4.bcbits.com/img/a1916697622_2.jpg",
      artist: "SBTRKT",
      title: `THE RAT ROAD`,
      url: "https://sbtrkt.bandcamp.com/album/the-rat-road-album",
      cost: "10.99",
      currency: "GBP"
    });
  });

  it.skip('should parse example HTML and return correct albums', () => {
    
    const albums = purchasesHtmlToAlbums({ input: html });
    
    // Should have 3 albums (first item's HTML structure is different - art/title outside .purchases-item div)
    expect(albums).toHaveLength(4);
    
    expect(albums).toMatchInlineSnapshot(`
[
  {
    "art": "https://f4.bcbits.com/img/a1916697622_2.jpg",
    "artist": "SBTRKT",
    "title": "THE RAT ROAD",
    "url": "https://sbtrkt.bandcamp.com/album/the-rat-road-album",
  },
  {
    "art": "https://f4.bcbits.com/img/a1430666770_2.jpg",
    "artist": "1tbsp",
    "title": "megacity1000",
    "url": "https://1tbsp.bandcamp.com/album/megacity1000",
  },
  {
    "art": "https://f4.bcbits.com/img/a0649909828_2.jpg",
    "artist": "Ninajirachi",
    "title": "I Love My Computer",
    "url": "https://ninajirachi.bandcamp.com/album/i-love-my-computer",
  },
  {
    "art": "https://f4.bcbits.com/img/a2438713044_2.jpg",
    "artist": "Shygirl, Nick León, Six Sex",
    "title": "BAWDY is A LOT [Nick León + Six Sex]",
    "url": "https://0800shygirl.bandcamp.com/track/bawdy-is-a-lot-nick-le-n-six-sex-1",
  },
]
`);
  });
});
