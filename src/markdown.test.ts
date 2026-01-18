import { albumsToMarkdownOutput } from './markdown';
import { purchasesHtmlToAlbums } from './purchases-parsing';
import { exampleClipboardContent } from './example-clipboard-content';

describe('albumsToMarkdownOutput', () => {
  it('should convert albums from example HTML to markdown format', () => {
    const albums = purchasesHtmlToAlbums({ input: exampleClipboardContent });
    const markdown = albumsToMarkdownOutput(albums);

    // Should have 4 albums based on the example HTML
    expect(albums).toHaveLength(4);

    // Check that markdown contains expected entries
    expect(markdown).toContain('[**THE RAT ROAD** by SBTRKT](https://sbtrkt.bandcamp.com/album/the-rat-road-album)');
    expect(markdown).toContain('[**megacity1000** by 1tbsp](https://1tbsp.bandcamp.com/album/megacity1000)');
    expect(markdown).toContain('[**I Love My Computer** by Ninajirachi](https://ninajirachi.bandcamp.com/album/i-love-my-computer)');
    expect(markdown).toContain('[**BAWDY is A LOT \\[Nick León + Six Sex\\]** by Shygirl, Nick León, Six Sex](https://0800shygirl.bandcamp.com/track/bawdy-is-a-lot-nick-le-n-six-sex-1)');

    // Check that each line starts with "- "
    const lines = markdown.split('\n');
    expect(lines).toHaveLength(4);
    lines.forEach(line => {
      expect(line).toMatch(/^\- \[/);
    });
  });

  it('should escape special markdown characters in titles and artists', () => {
    const albums = [
      {
        url: 'https://example.com/album',
        title: 'Album *with* #special /chars',
        artist: 'Artist (with) [brackets]',
        art: 'https://example.com/art.jpg',
        cost: '10.00',
        currency: 'USD'
      }
    ];

    const markdown = albumsToMarkdownOutput(albums);
    
    // Check that special characters are escaped
    expect(markdown).toContain('\\*with\\*');
    expect(markdown).toContain('\\#special');
    expect(markdown).toContain('\\/chars');
    expect(markdown).toContain('\\(with\\)');
    expect(markdown).toContain('\\[brackets\\]');
  });

  it('should handle empty albums array', () => {
    const markdown = albumsToMarkdownOutput([]);
    expect(markdown).toBe('');
  });
});
